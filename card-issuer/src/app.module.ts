import { Module } from '@nestjs/common';

import { TypeOrmModule }
from '@nestjs/typeorm';
import { CardsModule } from './modules/cards/cars.module';
import { KafkaService } from './commons/kafka/kafka.service';
import { KafkaModule } from './commons/kafka/kafka.module';


@Module({
  imports: [

    TypeOrmModule.forRoot({
      type: 'postgres',

      host: 'localhost',

      port: 5433,

      username: 'admin',

      password: 'admin',

      database: 'cardsdb',

      autoLoadEntities: true,

      synchronize: true,
    }),

    KafkaModule,

    CardsModule,
  ],
})
export class AppModule {}