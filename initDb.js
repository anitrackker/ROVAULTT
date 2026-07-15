import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const { Client } = pg;

const client = new Client({
  connectionString: process.env.DATABASE_URL
});

async function initDb() {
  try {
    await client.connect();
    console.log('Connected to Supabase PostgreSQL');

    const schema = `
      CREATE TABLE IF NOT EXISTS users (
        username TEXT PRIMARY KEY,
        balance NUMERIC DEFAULT 0,
        "totalWagered" NUMERIC DEFAULT 0,
        "weeklyWagered" NUMERIC DEFAULT 0,
        "avatarUrl" TEXT,
        "signupBonusMet" BOOLEAN DEFAULT false,
        banned BOOLEAN DEFAULT false,
        "banReason" TEXT,
        "bannedAt" BIGINT,
        "lastAdminAction" JSONB,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS wallets (
        username TEXT PRIMARY KEY REFERENCES users(username) ON DELETE CASCADE,
        btc TEXT,
        eth TEXT,
        sol TEXT,
        ltc TEXT,
        credited JSONB DEFAULT '{"btc": 0, "eth": 0, "sol": 0, "ltc": 0}'::jsonb
      );
    `;

    await client.query(schema);
    console.log('Schema created successfully.');

    // Run migrations to ensure columns exist in existing table
    const migrations = `
      ALTER TABLE users ADD COLUMN IF NOT EXISTS "weeklyWagered" NUMERIC DEFAULT 0;
      ALTER TABLE users ADD COLUMN IF NOT EXISTS "avatarUrl" TEXT;
    `;
    await client.query(migrations);
    console.log('Migrations executed successfully.');

  } catch (err) {
    console.error('Error executing schema:', err);
  } finally {
    await client.end();
  }
}

initDb();
