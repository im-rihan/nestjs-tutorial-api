import { NestMiddleware, Injectable } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class ValidateCostomersMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(`i ' m inside in validate costomer`);
    const { authorization } = req.headers;
    if (!authorization)
      return res.status(403).send({ Error: 'NO  Authorization Token' });

    if (authorization === '123') return next();
    else return res.status(403).send({ Error: 'Authorization Invalid' });
  }
}
