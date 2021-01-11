import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as chalk from 'chalk';
import * as config from 'config';
import * as helmet from 'helmet';

import { AppModule } from 'app.module';

const bootstrap = async () => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const logger = new Logger('bootstrap');
  const { appName, host, port, protocol } = config.get('server');
  const PORT = process.env.PORT || port;

  app.use(helmet());
  if (process.env.NODE_ENV === 'development') {
    app.enableCors();
  }

  const options = new DocumentBuilder()
    .setTitle(appName)
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  await app.listen(PORT);
  logger.log(
    `${chalk.bgBlue.white(appName)} app started on ${
      process.env.NODE_ENV || 'development'
    } ${protocol}://${host}:${PORT}`,
  );
};

bootstrap();
