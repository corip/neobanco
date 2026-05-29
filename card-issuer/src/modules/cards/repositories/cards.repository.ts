import { Injectable } from '@nestjs/common';

import { InjectRepository }
from '@nestjs/typeorm';

import { Repository }
from 'typeorm';

import { CardRequestEntity }
from '../entities/card-request.entity';

@Injectable()
export class CardsRepository {

  constructor(
    @InjectRepository(CardRequestEntity)
    private readonly repository:
      Repository<CardRequestEntity>,
  ) {}

  async exists(
    documentNumber: string,
  ): Promise<boolean> {

    const cardRequest =
      await this.repository.findOne({
        where: {
          documentNumber,
        },
      });

    return !!cardRequest;
  }

  async save(
    payload: Partial<CardRequestEntity>,
  ) {

    return this.repository.save(payload);
  }

  async findAll() {

    return this.repository.find();
  }
}