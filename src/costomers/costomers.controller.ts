import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Req,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CostomersService } from './costomers.service';
import { CreateCostomerDto } from './dto/create-costomer.dto';

@Controller('costomers')
export class CostomersController {
  constructor(private costomersService: CostomersService) {}

  @Get('')
  getAllCostomers() {
    return this.costomersService.getAllCostomers();
  }

  @Get(':id')
  getCostomerById(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const costomer = this.costomersService.getCostomerById(id);
    if (costomer) {
      res.send(costomer);
    } else {
      res.status(400).send({ message: 'Costomer Not Found' });
    }
  }

  @Get('/search/:id')
  searchCostomerById(@Param('id', ParseIntPipe) id: number) {
    const costomer = this.costomersService.searchCostomerById(id);
    if (costomer) return costomer;
    else throw new NotFoundException();
  }

  @Post('create')
  @UsePipes(ValidationPipe)
  createCostomer(@Body() createCostomerDto: CreateCostomerDto) {
    return this.costomersService.createCostomer(createCostomerDto);
  }
}
