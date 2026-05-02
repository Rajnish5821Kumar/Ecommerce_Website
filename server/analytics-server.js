import express from 'express';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const dataDir = path.join(rootDir, 'data');
const eventsFile = path.join(dataDir, 'analytics-events.json');
const cacheFile = path.join(dataDir, 'ip-location-cache.json');
const port = Number(process.env.PORT || 8080);
const dashboardCode = process.env.ANALYTICS_CODE || 'XYZQ';
const maxEvents = Number(process.env.ANALYTICS_MAX_EVENTS || 10000);

const app = express();
app.set('trust proxy', true);
app.use(express.json({ limit: '64kb' }));

async function ensureDataFiles() {
  await fs.mkdir(dataDir, { recursive: true });
  await Promise.all([
    ensureJsonFile(eventsFile, []),
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

  const events = await readJson(eventsFile, []);
  events.push(event);
  const trimmed = events.slice(-maxEvents);
  await writeJson(eventsFile, trimmed);
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
    lastUpdated: new Date().toISOString()
  };
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
  if (req.body?.code !== dashboardCode) {
    res.status(401).json({ ok: false, error: 'Invalid analytics code' });
    return;
  }

  const events = await readJson(eventsFile, []);
  res.json({
    ok: true,
    summary: summarizeEvents(events),
    events: events.slice().reverse().slice(0, 500)
  });
});

app.get('/api/analytics/health', (_req, res) => {
  res.json({ ok: true, storage: path.relative(rootDir, eventsFile) });
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

app.listen(port, () => {
  console.log(`Rajnish Store analytics server running at http://127.0.0.1:${port}/#/`);
  console.log(`Analytics events are stored in ${path.relative(rootDir, eventsFile)}`);
});
