# Deployment

This app should be deployed as one Node web service so the React site and analytics API share the same domain.

## Render

The included `render.yaml` creates a Node web service that:

- runs `npm ci && npm run build`
- starts with `npm run serve`
- checks health at `/api/analytics/health`
- automatically deploys on each Git commit pushed to the connected branch
- mounts a persistent disk at `/opt/render/project/src/data`
- stores analytics events in `/opt/render/project/src/data/analytics-events.xlsx`

Set `ANALYTICS_CODE` in Render as a secret environment variable. Use `XYZQ` if you want to keep the current owner code.

Persistent storage matters: without a disk, deploy platforms can erase local files during restarts and redeploys.

## Automatic Render Deploy

1. Push this project to GitHub.
2. Open Render Dashboard.
3. Choose **New > Blueprint**.
4. Connect the GitHub repo that contains this project.
5. Render will read `render.yaml` from the repo root.
6. Set the secret environment variable:

```text
ANALYTICS_CODE=XYZQ
```

7. Confirm the Blueprint. Render will build and start the service.
8. After that, every new commit pushed to the connected branch deploys automatically.

The deployed website and analytics API run together on the same Render URL. Use:

```text
https://your-render-service.onrender.com/#/
```

The owner dashboard stays the same: go to Contact, right-click **Rajnish Shops** 4 times, enter the analytics code, then use **Download XLSX** to export the Excel database.

## Local Production Run

```bash
npm install
npm run build
npm run serve
```

Then open:

```text
http://127.0.0.1:8080/#/
```

Analytics files are written to `data/` locally. They are ignored by Git.
