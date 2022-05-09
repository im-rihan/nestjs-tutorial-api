import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import { TypeormStore } from 'connect-typeorm/out';
import { getConnection } from 'typeorm';
import { SessionEntity } from './typeorm/session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const sessionRepository = getConnection().getRepository(SessionEntity);
  app.setGlobalPrefix('api');
  app.use(
    session({
      name: 'NESTJS_SESSION',
      secret: 'fddfdfddfdffdffjfdknfj',
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 60000,
      },
      store: new TypeormStore().connect(sessionRepository),
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(3000);
}
bootstrap();
