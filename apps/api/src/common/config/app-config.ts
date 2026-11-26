import { config as loadDotEnv } from 'dotenv';

export interface PostgresConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}

/**
 * Singleton (GoF): one process-wide, lazily-created config instance built
 * directly from environment variables — deliberately not a Nest DI provider,
 * so it stays usable from non-Nest entry points (migrations CLI, seed script).
 */
export class AppConfig {
  private static instance: AppConfig | null = null;

  readonly nodeEnv: string;
  readonly port: number;
  readonly postgres: PostgresConfig;
  readonly jwtSecret: string;
  readonly jwtExpiresInSeconds: number;

  private constructor() {
    loadDotEnv({ path: ['.env', '../../.env'] });

    this.nodeEnv = process.env.NODE_ENV ?? 'development';
    this.port = Number(process.env.PORT ?? 3000);

    this.postgres = {
      host: process.env.DB_HOST ?? 'localhost',
      port: Number(process.env.DB_PORT ?? 5432),
      username: process.env.DB_USER ?? 'magazine_user',
      password: process.env.DB_PASSWORD ?? 'magazine_pass',
      database: process.env.DB_NAME ?? 'thematic_magazine',
    };

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error('JWT_SECRET environment variable is required');
    }
    this.jwtSecret = jwtSecret;
    this.jwtExpiresInSeconds = Number(process.env.JWT_EXPIRES_IN_SECONDS ?? 86400);
  }

  static getInstance(): AppConfig {
    if (!AppConfig.instance) {
      AppConfig.instance = new AppConfig();
    }
    return AppConfig.instance;
  }
}
