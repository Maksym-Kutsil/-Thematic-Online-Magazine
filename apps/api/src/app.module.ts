import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { AppConfig } from './common/config/app-config.js';
import { entities } from './database/entities.js';
import { AuthModule } from './modules/auth/auth.module.js';
import { UsersModule } from './modules/users/users.module.js';

const config = AppConfig.getInstance();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      ...config.postgres,
      entities,
      synchronize: false,
    }),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
