import 'reflect-metadata';
import { config } from 'dotenv';
import { DataSource } from 'typeorm';
import { entities } from './entities.js';

config({ path: ['.env', '../../.env'] });

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST ?? 'localhost',
  port: Number(process.env.DB_PORT ?? 5432),
  username: process.env.DB_USER ?? 'magazine_user',
  password: process.env.DB_PASSWORD ?? 'magazine_pass',
  database: process.env.DB_NAME ?? 'thematic_magazine',
  entities,
  migrations: ['dist/database/migrations/*.js'],
  synchronize: false,
});
