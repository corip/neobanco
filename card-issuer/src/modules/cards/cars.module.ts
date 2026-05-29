import { Module } from '@nestjs/common';

import { TypeOrmModule }
from '@nestjs/typeorm';

import { CardsController }
from './controllers/cards.controller';

import { CardsService }
from './services/cards.service';

import { CardsRepository }
from './repositories/cards.repository';

import { CardRequestEntity }
from './entities/card-request.entity';

import { KafkaModule }
from '../../commons/kafka/kafka.module';

@Module({
  imports: [

    KafkaModule,

    TypeOrmModule.forFeature([
      CardRequestEntity,
    ]),
  ],

  controllers: [
    CardsController,
  ],

  providers: [
    CardsService,
    CardsRepository,
  ],
})
export class CardsModule {}