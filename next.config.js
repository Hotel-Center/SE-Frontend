const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
  openAnalyzer: false,
});
module.exports = withBundleAnalyzer({
  webpack: (config, { isServer }) => {
    // Exclude test files from the Next.js build
    if (!isServer) {
      config.module.rules.push({
        test: /index\.test\.js$/,
        use: "null-loader",
      });
    }

    return config;
  },
});
