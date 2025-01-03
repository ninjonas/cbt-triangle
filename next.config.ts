import type { NextConfig } from "next";

//used to deploy to github pages
const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: isProd ? "standalone" : "export",
  assetPrefix: isProd ? "/cbt-triangle/" : "",
  basePath: isProd ? "/cbt-triangle" : "",
  /* config options here */
};

export default nextConfig;
