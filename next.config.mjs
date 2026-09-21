/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',                // Static HTML export → outputs to /out
  trailingSlash: true,             // Required for GitHub Pages routing
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei'],
  reactStrictMode: true,
  images: {
    unoptimized: true,             // Required for static export (no Image Optimization API)
  },
}

export default nextConfig
