import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './../../dto/createPayments.dto';

@Injectable()
export class PaymentsService {
  user = [
    {
      email: 'some1@gmail.com',
    },
    {
      email: 'some2@gmail.com',
    },
    {
      email: 'some3@gmail.com',
    },
    {
      email: 'some4@gmail.com',
    },
  ];

  createPayment(creaPaymentDto: CreatePaymentDto) {
    const { email } = creaPaymentDto;
    const user = this.user.find((user) => user.email === email);
    if (user) return { status: 'success' };
    else throw new BadRequestException();
  }
}
