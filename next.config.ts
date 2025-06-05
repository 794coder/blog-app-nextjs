import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  //   experimental: {
  //   serverComponentsExternalPackages: ['pg', 'pg-cloudflare'],
  //   // Enable Node.js runtime for middleware
  //   serverMinification: false,
  // },
  // // Webpack configuration to handle the cloudflare:sockets issue
  // webpack: (config, { isServer, nextRuntime }) => {
  //   if (isServer && nextRuntime === 'nodejs') {
  //     // Handle the cloudflare:sockets import issue
  //     config.externals.push({
  //       'cloudflare:sockets': 'commonjs cloudflare:sockets',
  //     });
  //   }
  //   return config;
  // },

     eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
