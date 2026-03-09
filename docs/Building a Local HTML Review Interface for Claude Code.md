# Building a local HTML review interface for Claude Code

**A lightweight, standalone review page that Claude Code generates after making changes is entirely feasible — and the best architecture pairs a tiny Node.js HTTP server (~15 lines) with Playwright screenshots and Astro's dev-only route injection.** This approach gives a developer visual before/after diffs, structured approve/reject controls, and a JSON feedback file that Claude Code reads to iterate. The workflow pattern already exists in tools like BackstopJS and Chromatic, and Claude Code's hooks system plus the Agent SDK provide the orchestration primitives needed to make this production-grade.

The core challenge is bridging browser and filesystem: a standalone HTML page opened via `file://` cannot write to disk. But several reliable workarounds exist, and the ecosystem of AI coding assistant review tooling has matured significantly through 2025-2026.

## Saving data from the browser to the filesystem

The critical technical question — how does a local HTML review page save feedback JSON — has three practical solutions, ranked by developer friction.

**The local HTTP server approach is the clear winner.** A zero-dependency Node.js server of ~15 lines accepts a `POST` to `localhost`, writes `feedback.json`, and shuts itself down. Since Claude Code already runs as a Node.js process, spinning up this server adds negligible complexity. The HTML page uses a standard `fetch()` call, and CORS works from `file://` origins when the server sets `Access-Control-Allow-Origin: *`. The developer clicks one button — no save dialogs, no file pickers, no clipboard commands.

```javascript
// review-server.js — 15-line feedback receiver
const http = require('http');
const fs = require('fs');
const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') { res.writeHead(204); return res.end(); }
  if (req.method === 'POST' && req.url === '/feedback') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      fs.writeFileSync('.review/feedback.json', body);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ status: 'saved' }));
      server.close();
    });
  }
});
server.listen(0, () => console.log(JSON.stringify({ port: server.address().port })));
```

**The fallback is download-as-JSON** using `Blob` + `<a download>`, which works universally from `file://` in every modern browser. The file lands in the Downloads folder, so Claude Code needs to know where to find it — a minor friction point. The **clipboard API** (`navigator.clipboard.writeText`) works from `file://` in Chrome (which treats it as a secure context) and serves as a good secondary option: the developer clicks "Copy Feedback" and Claude Code reads it via `pbpaste > feedback.json`.

Two approaches that **do not work**: the File System Access API (`showSaveFilePicker`) throws a `SecurityError` from `file://` due to opaque origins, and `localStorage` has undefined behavior across `file://` URLs with no way for external programs to read browser storage. The `browser-fs-access` library from Google Chrome Labs elegantly wraps the File System Access API with an automatic `<a download>` fallback — worth using if you want both paths with a single API call.

## Automated screenshots and visual diff for before/after comparison

**Playwright is the definitive tool for this use case.** It offers a native CLI for one-liner screenshots, a Node.js API for scripted captures, built-in visual comparison using pixelmatch, and multi-browser/multi-viewport support. The `@anthropic-ai/playwright-cli` package is specifically optimized for AI coding agents like Claude Code — it's token-efficient and supports headless-first operation.

## Three ways to serve the review page in Astro.js

For an Astro.js project, **the simplest path is creating a standalone `.review/index.html`** file that Claude Code generates. It reads inline JSON data, displays change cards with approve/reject buttons, and POSTs feedback to a local Node.js server.

## Recommended JSON schema for structured feedback

```json
{
  "timestamp": "2026-03-09T14:30:00Z",
  "overallDecision": "request_changes",
  "overallComment": "SEO meta tags look good, but the hero section layout broke on mobile",
  "changes": [
    {
      "id": "meta-tags",
      "decision": "approved",
      "comment": "Title and description are well-optimized"
    },
    {
      "id": "hero-section",
      "decision": "request_changes",
      "severity": "major",
      "comment": "Image overflows viewport on iPhone SE",
      "suggestedFix": "Add max-width: 100% to the hero image container"
    }
  ],
  "actionItems": [
    { "action": "Fix hero image responsive layout", "priority": "must" },
    { "action": "Add alt text to new images", "priority": "should" }
  ]
}
```

## Conclusion

The complete architecture for a2reklam.com is: **Claude Code makes changes** → **runs build + dev server** → **generates a review HTML page with change descriptions and preview links** → **a 15-line Node.js server handles feedback submission** → **Claude Code reads `feedback.json` and iterates**. The review page should combine BackstopJS's comparison layout with GitHub's approve/request-changes binary decision pattern.
