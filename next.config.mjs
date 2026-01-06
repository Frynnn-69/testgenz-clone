/** @type {import('next').NextConfig} */
const nextConfig = {
    // Fix workspace root detection warning in Vercel
    outputFileTracingRoot: process.cwd(),
    
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
};

export default nextConfig;