// lib/db.ts
import { Pool } from 'pg';

const pool = new Pool({
  host: process.env.NEXT_PUBLIC_POSTGRES_HOST || 'localhost',
  user: process.env.NEXT_PUBLIC_POSTGRES_USERNAME || 'postgres',
  database: process.env.NEXT_PUBLIC_POSTGRES_DATABASE || 'postgres',
  password: process.env.NEXT_PUBLIC_POSTGRES_PASSWORD || '2175',
  port: parseInt(process.env.NEXT_PUBLIC_POSTGRES_PORT || '5432'),
  ssl: {
    rejectUnauthorized: false,
  },
});

export default pool;
