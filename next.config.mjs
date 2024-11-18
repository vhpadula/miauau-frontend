/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        formats: ['image/avif', 'image/webp'],
        remotePatterns: [
            {
                protocol: 'http',
                hostname: '127.0.0.1',
                port: '10000',
                pathname: '/devstoreaccount1/animals/**'
            },
            {
                protocol: 'https',
                hostname: 'chipmunk-worthy-multiply.ngrok-free.app',
                pathname: '/api/v1/animals/blob/**'
            },
        ],
    }
};

export default nextConfig;
