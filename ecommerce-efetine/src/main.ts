import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { LoggerGlobal } from './middlewares/middlewares.global.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      exceptionFactory: (errors) => {
        const cleanErrors = errors.map((error) => {
          if (error.children && error.children.length) {
            return {
              property: error.property,
              children: error.children.map((child) => {
                if (child.children && child.children.length) {
                  return {
                    property: child.property,
                    children: child.children.map((grandchild) => ({
                      property: grandchild.property,
                      constraints: grandchild.constraints,
                    })),
                  };
                }
                return {
                  property: child.property,
                  constraints: child.constraints,
                };
              }),
            };
          }
          return { property: error.property, constraints: error.constraints };
        });

        return new BadRequestException({
          alert: 'Se han detectado los siguientes errores en la petición:',
          errors: cleanErrors,
        });
      },
    }),
  );
  const config = new DocumentBuilder()
    .setTitle('e-Commerce project')
    .setDescription('e-Commerce API documentation')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // app.useGlobalInterceptors(new DateAdderInterceptor());
  app.use(LoggerGlobal);
  await app.listen(3000);
}
bootstrap();
