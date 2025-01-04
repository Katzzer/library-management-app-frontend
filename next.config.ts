import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    webpack: (config, { dev, isServer }) => {
        if (dev && isServer) {
            config.devtool = "source-map"; // Enable proper source map emission for server-side code
        }
        return config;
    },
};

export default nextConfig;