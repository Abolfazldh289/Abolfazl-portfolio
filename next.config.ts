import type { NextConfig } from 'next';

// GitHub Pages serves project sites from /<repository-name>.
// The workflow sets NEXT_PUBLIC_BASE_PATH to this repository's path.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath,
  images: { unoptimized: true },
};

export default nextConfig;
