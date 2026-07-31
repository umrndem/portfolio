import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

// Every route is prerendered at build time (the only dynamic route is the stub
// contact endpoint), so the read-only Workers Static Assets incremental cache
// serves the prerendered /work/<slug> pages without any R2/KV/DO
// infrastructure. Revisit https://opennext.js.org/cloudflare/caching before
// adding ISR/revalidation features — those need a writable cache and a queue.
export default defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
  enableCacheInterception: true,
});
