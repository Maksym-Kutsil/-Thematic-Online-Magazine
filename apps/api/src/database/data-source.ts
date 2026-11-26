import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { AppConfig } from '../common/config/app-config.js';
import { entities } from './entities.js';

const config = AppConfig.getInstance();

export const AppDataSource = new DataSource({
  type: 'postgres',
  ...config.postgres,
  entities,
  migrations: ['dist/database/migrations/*.js'],
  synchronize: false,
});
