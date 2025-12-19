/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: ['@erp/ui', '@erp/shared'],
    output: 'standalone',
};

module.exports = nextConfig;
