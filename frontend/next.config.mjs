import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { dev }) => {
        config.resolve.alias['@'] = path.resolve(__dirname);
        // On machines with very little free disk (this preview box often has ~0 MB
        // left), next dev's on-disk webpack cache in .next can fill the drive and
        // crash the server. Keep it in memory only for dev; production builds keep
        // persistent caching.
        if (dev) {
            config.cache = false;
        }
        return config;
    },
};

export default nextConfig;
