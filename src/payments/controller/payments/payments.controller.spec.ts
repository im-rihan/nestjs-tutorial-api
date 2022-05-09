import { Test, TestingModule } from '@nestjs/testing';
import { PaymentsController } from './payments.controller';
import { Request, Response } from 'express';
import { PaymentsService } from './../../service/payments/payments.service';
import { BadRequestException } from '@nestjs/common';

describe('PaymentsController', () => {
  let controller: PaymentsController;
  let service: PaymentsService;

  const statusResponseMock = { send: jest.fn((x) => x) };
  const requestMock = { query: {} } as unknown as Request;
  const responseMock = {
    status: jest.fn((x) => statusResponseMock),
    send: jest.fn((x) => x),
  } as unknown as Response;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentsController],
      providers: [
        {
          provide: 'PAYMENTS_SERVICE',
          useValue: {
            createPayment: jest.fn((x) => x),
          },
        },
      ],
    }).compile();

    controller = module.get<PaymentsController>(PaymentsController);
    service = module.get<PaymentsService>('PAYMENTS_SERVICE');
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('Payments Service should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('getPayments', () => {
    it('should return a status of 400', () => {
      controller.getPayments(requestMock, responseMock);
      expect(responseMock.status).toHaveBeenCalledWith(400);
      expect(statusResponseMock.send).toHaveBeenCalledWith('Missing page');
    });
    it('should return a status of 200 while query params are present', () => {
      requestMock.query = {
        count: '10',
        page: '1',
      };
      controller.getPayments(requestMock, responseMock);
      expect(responseMock.send).toHaveBeenCalledWith(200);
    });
    it('should return a successfull response', async () => {
      jest.spyOn(service, 'createPayment').mockImplementationOnce(() => {
        throw new BadRequestException();
      });
      try {
        await controller.createPayment({
          email: 'some@gmail.com',
          price: 100,
        });
      } catch (error) {
        error;
      }
    });
  });
});
