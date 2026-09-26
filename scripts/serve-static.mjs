import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, resolve, sep } from "node:path";

const root = resolve("out");
const port = Number(process.env.PORT ?? 3100);
const prefix = process.env.GITHUB_PAGES === "true" ? "/EventManagement" : "";
const types = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".json": "application/json", ".txt": "text/plain", ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".ico": "image/x-icon", ".woff2": "font/woff2" };

createServer(async (request, response) => {
  if (request.method !== "GET" && request.method !== "HEAD") { response.writeHead(405).end(); return; }
  try {
    const url = new URL(request.url ?? "/", "http://localhost");
    const pathname = decodeURIComponent(url.pathname);
    if (prefix && (pathname === "/" || pathname === prefix)) {
      response.writeHead(302, { Location: `${prefix}/${url.search}` }).end(); return;
    }
    if (prefix && !pathname.startsWith(`${prefix}/`)) { response.writeHead(404).end("Not found"); return; }
    let file = resolve(root, `.${pathname.slice(prefix.length)}`);
    if (file !== root && !file.startsWith(root + sep)) { response.writeHead(403).end(); return; }
    if ((await stat(file)).isDirectory()) {
      if (!pathname.endsWith("/")) { response.writeHead(301, { Location: `${url.pathname}/${url.search}` }).end(); return; }
      file = resolve(file, "index.html");
    }
    const content = await readFile(file);
    response.writeHead(200, { "Content-Type": types[extname(file)] ?? "application/octet-stream" });
    response.end(request.method === "HEAD" ? undefined : content);
  } catch { response.writeHead(404).end("Not found"); }
}).listen(port, "127.0.0.1", () => console.log(`Static preview: http://localhost:${port}${prefix}/`));
