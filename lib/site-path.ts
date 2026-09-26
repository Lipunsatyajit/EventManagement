// Next Link/router add basePath automatically. Native URLs and public assets do not.
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
export function sitePath(path: string) {
  return `${basePath}${path.startsWith("/") ? path : `/${path}`}`;
}
