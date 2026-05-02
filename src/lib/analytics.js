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
