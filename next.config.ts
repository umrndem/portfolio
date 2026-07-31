import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
};

export default nextConfig;

// Lets `next dev` resolve the Cloudflare runtime context (bindings, env) the
// same way the deployed Worker does. No-op outside development.
initOpenNextCloudflareForDev();
