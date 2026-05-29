import { Module } from '@nestjs/common';

import { TypeOrmModule }
from '@nestjs/typeorm';

import { CardRequestEntity }
from './entities/card-request.entity';

import { CardsRepository }
from './repositories/cards.repository';

import { CardRequestedConsumer }
from './consumers/card-requested.consumer';

@Module({
  imports: [

    TypeOrmModule.forFeature([
      CardRequestEntity,
    ]),
  ],

  providers: [
    CardsRepository,
    CardRequestedConsumer,
  ],
})
export class CardsModule {}