import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
@Injectable()
export class ValidateCostomersAccountMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Validate Costomers Account');

    const { valid } = req.headers;

    if (valid) return next();
    else return res.status(403).send({ error: 'Account is Invalid' });
  }
}
