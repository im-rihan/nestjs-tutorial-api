import { Injectable } from '@nestjs/common';
import { CreateCostomerDto } from './dto/create-costomer.dto';
import { Costomer } from './types/costomer.model';

@Injectable()
export class CostomersService {
  private costomers: Costomer[] = [
    {
      id: 1,
      name: 'Rihan Mohammed',
      email: 'somet@gmail.com',
    },
    {
      id: 2,
      name: 'Rihan Mohammed',
      email: 'somet@gmail.com',
    },
    {
      id: 3,
      name: 'Rihan Mohammed',
      email: 'somet@gmail.com',
    },
    {
      id: 4,
      name: 'Rihan Mohammed',
      email: 'somet@gmail.com',
    },
  ];

  getAllCostomers() {
    return this.costomers;
  }

  getCostomerById(id: number) {
    return this.costomers.find((cust) => cust.id === id);
  }

  searchCostomerById(id: number) {
    return this.getCostomerById(id);
  }

  createCostomer(createCostomerDto: CreateCostomerDto) {
    return this.costomers.push(createCostomerDto);
  }
}
