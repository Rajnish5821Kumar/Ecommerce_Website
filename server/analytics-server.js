import ExcelJS from 'exceljs';
import express from 'express';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const dataDir = process.env.ANALYTICS_DATA_DIR
  ? path.resolve(process.env.ANALYTICS_DATA_DIR)
  : path.join(rootDir, 'data');
const eventsWorkbookFile = path.join(dataDir, 'analytics-events.xlsx');
const legacyEventsFile = path.join(dataDir, 'analytics-events.json');
const cacheFile = path.join(dataDir, 'ip-location-cache.json');
const port = Number(process.env.PORT || 8080);
const host = process.env.HOST || '0.0.0.0';
const dashboardCode = process.env.ANALYTICS_CODE || 'XYZQ';
const maxEvents = Number(process.env.ANALYTICS_MAX_EVENTS || 10000);

const eventColumns = [
  { header: 'ID', key: 'id', width: 24 },
  { header: 'Received At', key: 'receivedAt', width: 25 },
  { header: 'Type', key: 'type', width: 24 },
  { header: 'IP', key: 'ip', width: 18 },
  { header: 'Location Status', key: 'locationStatus', width: 18 },
  { header: 'Location IP', key: 'locationIp', width: 18 },
  { header: 'City', key: 'city', width: 20 },
  { header: 'Region', key: 'region', width: 22 },
  { header: 'Country', key: 'country', width: 20 },
  { header: 'Timezone', key: 'timezone', width: 24 },
  { header: 'ISP', key: 'isp', width: 32 },
  { header: 'Latitude', key: 'latitude', width: 14 },
  { header: 'Longitude', key: 'longitude', width: 14 },
  { header: 'Page Route', key: 'path', width: 24 },
  { header: 'Label', key: 'label', width: 32 },
  { header: 'Href', key: 'href', width: 50 },
  { header: 'Category', key: 'category', width: 18 },
  { header: 'Product ID', key: 'productId', width: 20 },
  { header: 'Visitor ID', key: 'visitorId', width: 42 },
  { header: 'Page Title', key: 'pageTitle', width: 36 },
  { header: 'Referer', key: 'referer', width: 50 },
  { header: 'User Agent', key: 'userAgent', width: 70 },
  { header: 'Meta JSON', key: 'metaJson', width: 40 }
];

const app = express();
let eventWriteQueue = Promise.resolve();

app.set('trust proxy', true);
app.use(express.json({ limit: '64kb' }));

async function ensureDataFiles() {
  await fs.mkdir(dataDir, { recursive: true });
  await Promise.all([
    ensureEventsWorkbook(),
    ensureJsonFile(cacheFile, {})
  ]);
}

async function ensureJsonFile(filePath, fallback) {
  try {
    await fs.access(filePath);
  } catch {
    await fs.writeFile(filePath, JSON.stringify(fallback, null, 2));
  }
}

async function ensureEventsWorkbook() {
  try {
    await fs.access(eventsWorkbookFile);
  } catch {
    const legacyEvents = await readJson(legacyEventsFile, []);
    await writeEventsWorkbook(Array.isArray(legacyEvents) ? legacyEvents : []);
  }
}

async function readJson(filePath, fallback) {
  try {
    return JSON.parse(await fs.readFile(filePath, 'utf8'));
  } catch {
    return fallback;
  }
}

async function writeJson(filePath, data) {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
}

function getClientIp(req) {
  const forwarded = req.headers['x-forwarded-for'];
  const headerIp = Array.isArray(forwarded) ? forwarded[0] : forwarded?.split(',')[0];
  const raw = headerIp || req.headers['cf-connecting-ip'] || req.headers['x-real-ip'] || req.socket.remoteAddress || req.ip || 'unknown';
  return String(raw).trim().replace(/^::ffff:/, '');
}

function isPrivateIp(ip) {
  if (!ip || ip === 'unknown') return true;
  const value = ip.toLowerCase();
  if (value === '::1' || value === '127.0.0.1' || value === 'localhost') return true;
  if (value.startsWith('10.') || value.startsWith('192.168.') || value.startsWith('169.254.')) return true;
  if (/^172\.(1[6-9]|2\d|3[0-1])\./.test(value)) return true;
  if (value.startsWith('fc') || value.startsWith('fd') || value.startsWith('fe80:')) return true;
  return false;
}

async function getLocationForIp(ip) {
  const cache = await readJson(cacheFile, {});
  if (cache[ip]) return cache[ip];

  let location;
  if (isPrivateIp(ip)) {
    location = {
      status: 'local',
      ip,
      city: 'Local network',
      region: '',
      country: '',
      timezone: '',
      isp: '',
      latitude: null,
      longitude: null
    };
  } else {
    try {
      const response = await fetch(`http://ip-api.com/json/${encodeURIComponent(ip)}?fields=status,message,country,regionName,city,lat,lon,timezone,isp,query`);
      const data = await response.json();
      location = data.status === 'success'
        ? {
            status: 'success',
            ip: data.query || ip,
            city: data.city || '',
            region: data.regionName || '',
            country: data.country || '',
            timezone: data.timezone || '',
            isp: data.isp || '',
            latitude: data.lat ?? null,
            longitude: data.lon ?? null
          }
        : {
            status: 'unknown',
            ip,
            city: '',
            region: '',
            country: '',
            timezone: '',
            isp: '',
            latitude: null,
            longitude: null,
            error: data.message || 'Location lookup failed'
          };
    } catch (error) {
      location = {
        status: 'error',
        ip,
        city: '',
        region: '',
        country: '',
        timezone: '',
        isp: '',
        latitude: null,
        longitude: null,
        error: error.message
      };
    }
  }

  cache[ip] = { ...location, cachedAt: new Date().toISOString() };
  await writeJson(cacheFile, cache);
  return cache[ip];
}

function sanitizeEventBody(body = {}) {
  const allowString = (value, max = 500) => String(value ?? '').slice(0, max);
  return {
    type: allowString(body.type || 'event', 80),
    path: allowString(body.path, 300),
    label: allowString(body.label, 180),
    href: allowString(body.href, 800),
    category: allowString(body.category, 120),
    productId: allowString(body.productId, 80),
    visitorId: allowString(body.visitorId, 120),
    pageTitle: allowString(body.pageTitle, 180),
    meta: sanitizeMeta(body.meta)
  };
}

function sanitizeMeta(value, depth = 0) {
  if (depth > 4) return '[truncated]';
  if (value == null) return value;

  if (Array.isArray(value)) {
    return value.slice(0, 25).map((item) => sanitizeMeta(item, depth + 1));
  }

  if (typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value)
        .slice(0, 40)
        .map(([key, item]) => [String(key).slice(0, 80), sanitizeMeta(item, depth + 1)])
    );
  }

  if (typeof value === 'string') return value.slice(0, 300);
  if (typeof value === 'number' || typeof value === 'boolean') return value;
  return String(value).slice(0, 120);
}

function stringifyJson(value) {
  try {
    return JSON.stringify(value ?? {});
  } catch {
    return '{}';
  }
}

function parseJson(value, fallback) {
  try {
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function parseNumber(value) {
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

function cellText(value) {
  if (value == null) return '';
  if (value instanceof Date) return value.toISOString();
  if (typeof value === 'object') {
    if ('text' in value) return String(value.text ?? '');
    if ('result' in value) return String(value.result ?? '');
    if (Array.isArray(value.richText)) {
      return value.richText.map((part) => part.text || '').join('');
    }
    return stringifyJson(value);
  }
  return String(value);
}

function eventToRow(event) {
  const location = event.location || {};
  return {
    id: event.id,
    receivedAt: event.receivedAt,
    type: event.type,
    ip: event.ip,
    locationStatus: location.status || '',
    locationIp: location.ip || event.ip || '',
    city: location.city || '',
    region: location.region || '',
    country: location.country || '',
    timezone: location.timezone || '',
    isp: location.isp || '',
    latitude: location.latitude ?? '',
    longitude: location.longitude ?? '',
    path: event.path,
    label: event.label,
    href: event.href,
    category: event.category,
    productId: event.productId,
    visitorId: event.visitorId,
    pageTitle: event.pageTitle,
    referer: event.referer,
    userAgent: event.userAgent,
    metaJson: stringifyJson(event.meta)
  };
}

function rowToEvent(row) {
  return {
    id: row.id,
    receivedAt: row.receivedAt,
    ip: row.ip,
    location: {
      status: row.locationStatus,
      ip: row.locationIp || row.ip,
      city: row.city,
      region: row.region,
      country: row.country,
      timezone: row.timezone,
      isp: row.isp,
      latitude: parseNumber(row.latitude),
      longitude: parseNumber(row.longitude)
    },
    userAgent: row.userAgent,
    referer: row.referer,
    type: row.type,
    path: row.path,
    label: row.label,
    href: row.href,
    category: row.category,
    productId: row.productId,
    visitorId: row.visitorId,
    pageTitle: row.pageTitle,
    meta: parseJson(row.metaJson, {})
  };
}

async function readEventsFromWorkbook() {
  await ensureEventsWorkbook();

  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(eventsWorkbookFile);
  const worksheet = workbook.getWorksheet('Events');
  if (!worksheet) return [];

  const events = [];
  worksheet.eachRow({ includeEmpty: false }, (excelRow, rowNumber) => {
    if (rowNumber === 1) return;

    const row = {};
    eventColumns.forEach((column, index) => {
      row[column.key] = cellText(excelRow.getCell(index + 1).value);
    });

    if (row.id && row.receivedAt) {
      events.push(rowToEvent(row));
    }
  });

  return events;
}

async function writeEventsWorkbook(events) {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = 'Rajnish Store';
  workbook.created = new Date();
  workbook.modified = new Date();

  const worksheet = workbook.addWorksheet('Events', {
    views: [{ state: 'frozen', ySplit: 1 }]
  });

  worksheet.columns = eventColumns;
  worksheet.addRows(events.map(eventToRow));
  worksheet.getRow(1).font = { bold: true, color: { argb: 'FF1F2937' } };
  worksheet.getRow(1).fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FFF7F2E7' }
  };
  worksheet.autoFilter = {
    from: { row: 1, column: 1 },
    to: { row: 1, column: eventColumns.length }
  };

  await workbook.xlsx.writeFile(eventsWorkbookFile);
}

async function appendEvent(event) {
  const writeJob = eventWriteQueue.then(async () => {
    const events = await readEventsFromWorkbook();
    events.push(event);
    await writeEventsWorkbook(events.slice(-maxEvents));
  });

  eventWriteQueue = writeJob.catch(() => {});
  await writeJob;
}

async function getStoredEvents() {
  await eventWriteQueue.catch(() => {});
  return readEventsFromWorkbook();
}

async function recordEvent(req, body) {
  const ip = getClientIp(req);
  const location = await getLocationForIp(ip);
  const event = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`,
    receivedAt: new Date().toISOString(),
    ip,
    location,
    userAgent: req.headers['user-agent'] || '',
    referer: req.headers.referer || '',
    ...sanitizeEventBody(body)
  };

  await appendEvent(event);
  return event;
}

function summarizeEvents(events) {
  const clicks = events.filter((event) => event.type.includes('click'));
  const pageViews = events.filter((event) => event.type === 'page_view');
  const uniqueIps = new Set(events.map((event) => event.ip)).size;
  const uniqueVisitors = new Set(events.map((event) => event.visitorId).filter(Boolean)).size;
  const topLinks = Object.values(
    clicks.reduce((acc, event) => {
      const key = event.href || event.label || 'Unknown link';
      acc[key] ||= { href: event.href, label: event.label || key, clicks: 0 };
      acc[key].clicks += 1;
      return acc;
    }, {})
  ).sort((a, b) => b.clicks - a.clicks);

  return {
    totalEvents: events.length,
    pageViews: pageViews.length,
    clicks: clicks.length,
    uniqueIps,
    uniqueVisitors,
    topLinks: topLinks.slice(0, 12),
    workbook: path.basename(eventsWorkbookFile),
    lastUpdated: new Date().toISOString()
  };
}

function hasValidCode(req) {
  return req.body?.code === dashboardCode;
}

app.post('/api/analytics/event', async (req, res) => {
  try {
    const event = await recordEvent(req, req.body);
    res.json({ ok: true, id: event.id });
  } catch (error) {
    console.error('analytics event failed', error);
    res.status(500).json({ ok: false, error: 'Unable to record analytics event' });
  }
});

app.post('/api/analytics/dashboard', async (req, res) => {
  if (!hasValidCode(req)) {
    res.status(401).json({ ok: false, error: 'Invalid analytics code' });
    return;
  }

  const events = await getStoredEvents();
  res.json({
    ok: true,
    summary: summarizeEvents(events),
    events: events.slice().reverse().slice(0, 500)
  });
});

app.post('/api/analytics/export', async (req, res) => {
  if (!hasValidCode(req)) {
    res.status(401).json({ ok: false, error: 'Invalid analytics code' });
    return;
  }

  await eventWriteQueue.catch(() => {});
  await ensureEventsWorkbook();

  res.setHeader('Cache-Control', 'no-store');
  res.download(eventsWorkbookFile, 'rajnish-store-analytics.xlsx');
});

app.get('/api/analytics/health', (_req, res) => {
  res.json({
    ok: true,
    storage: path.relative(rootDir, eventsWorkbookFile),
    dataDir,
    format: 'xlsx'
  });
});

app.use(express.static(distDir));

app.use((req, res, next) => {
  if (req.method !== 'GET' || req.path.startsWith('/api/')) {
    next();
    return;
  }

  res.sendFile(path.join(distDir, 'index.html'));
});

await ensureDataFiles();

app.listen(port, host, () => {
  console.log(`Rajnish Store analytics server running at http://127.0.0.1:${port}/#/`);
  console.log(`Analytics workbook is stored at ${eventsWorkbookFile}`);
});
