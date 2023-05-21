/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [`${process.env.DOMAINS}`],
    },
    env: {
        SERVER: process.env.SERVER,
    },
};

module.exports = nextConfig;
