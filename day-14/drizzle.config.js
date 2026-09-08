import dotenv from 'dotenv'
dotenv.config();

import { defineConfig } from 'drizzle-kit';

const config = defineConfig({
    out: './drizzle',
    schema: './models/index.model.js',
    dialect: 'postgresql',
    dbCredentials: {
        url: process.env.DATABASE_URL,
    },
})

export default config;