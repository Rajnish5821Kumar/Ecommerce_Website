const visitorKey = 'rajnish_visitor_id';

function getVisitorId() {
  try {
    let id = localStorage.getItem(visitorKey);
    if (!id) {
      id = crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
      localStorage.setItem(visitorKey, id);
    }
    return id;
  } catch {
    return 'storage-unavailable';
  }
}

export function trackEvent(type, payload = {}) {
  const body = JSON.stringify({
    type,
    path: window.location.hash || window.location.pathname,
    pageTitle: document.title,
    visitorId: getVisitorId(),
    ...payload
  });

  try {
    const blob = new Blob([body], { type: 'application/json' });
    if (navigator.sendBeacon && navigator.sendBeacon('/api/analytics/event', blob)) {
      return;
    }
  } catch {
    // Fall back to fetch below.
  }

  fetch('/api/analytics/event', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body,
    keepalive: true
  }).catch(() => {
    // The static Vite dev server has no analytics API. Failing silently keeps browsing smooth.
  });
}

export async function unlockAnalyticsDashboard(code) {
  const response = await fetch('/api/analytics/dashboard', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code })
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.error || 'Unable to open analytics dashboard');
  }
  return data;
}

export async function downloadAnalyticsWorkbook(code) {
  const response = await fetch('/api/analytics/export', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code })
  });

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.error || 'Unable to download analytics workbook');
  }

  const blob = await response.blob();
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = 'rajnish-store-analytics.xlsx';
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}
