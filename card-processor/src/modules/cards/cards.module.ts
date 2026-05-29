import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardRequestEntity } from './entities/card-request.entity';
import { CardsRepository } from './repositories/cards.repository';
import { CardRequestedConsumer } from './consumers/card-requested.consumer';
import { CardProcessorService } from './services/card-processor.service';
import { KafkaModule } from 'src/commons/kafka/kafka.module';

@Module({
    imports: [

        KafkaModule,

        TypeOrmModule.forFeature([
            CardRequestEntity,
        ]),
    ],

    providers: [
        CardsRepository,
        CardRequestedConsumer,
        CardProcessorService,
    ],
})
export class CardsModule { }