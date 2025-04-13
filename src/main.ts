import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { isProdEnv } from './shared/config/utils';

async function bootstrap() {

  const app = await NestFactory.create(AppModule, {
    ...(isProdEnv ? { logger: ['error', 'warn', 'fatal', "log"] } : {})
  });

  // Enable CORS
  app.enableCors({
    origin: ['http://localhost:3000', 'https://gpr-bid-alert-client.fly.dev', 'https://gprbidalert.com', 'https://www.gprbidalert.com', 'https://gymdesk.cv'],
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const description = `A web scraper API that lists the schedules of known Cape Verdean pharmacies, including on-duty information.`;

  const swaggerDocOptions = new DocumentBuilder()
    .setTitle('Cape Verde Pharmacy Schedule API')
    .setDescription(description)
    .setContact('Stefan Vitoria', 'https://scrapingninja.pro/', 'stefan.vitoria.business@gmail.com')
    .addApiKey(
      {
        type: 'apiKey',
        name: 'x-api-key',
        in: 'header'
      },
      'API Key' // Security name reference
    )
    .setVersion('0.0.1')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerDocOptions);
  SwaggerModule.setup('api', app, document);

  await app.listen(5000);
}
bootstrap();
