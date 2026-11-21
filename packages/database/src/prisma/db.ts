import 'dotenv/config';
import mongo from '@prisma/orm-mongo/runtime';
import { contractFromJson } from '@prisma/orm-mongo/static';
import type { Contract } from './contract.d.js';
import contractJson from './contract.json' with { type: 'json' };

export const contract = contractFromJson<Contract>(contractJson);

const databaseUrl = process.env.DATABASE_URL!;
const dbName = new URL(databaseUrl).pathname.replace(/^\//, '');

export const db = mongo({
  contract,
  binding: { kind: 'url', url: databaseUrl, dbName },
});
