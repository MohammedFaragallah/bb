import { Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';

@Injectable()
export class DatabaseConnectionService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'p@ssw0rd',
      database: 'nest',
      synchronize: true,
      // dropSchema: true,
      logging: false,
      entities: [
        __dirname + '/../entities/**{.ts,.js}',
        __dirname + '/../**/*.entity{.ts,.js}',
      ],
      migrations: ['src/migration/**/*.ts'],
      subscribers: ['src/subscriber/**/*.ts'],
      cli: {
        migrationsDir: 'src/migration',
        subscribersDir: 'src/subscriber',
      },
    };
  }
}
