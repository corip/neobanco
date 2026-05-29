import { OnModuleInit } from '@nestjs/common';
import { CardsRepository } from '../repositories/cards.repository';
import { CardProcessorService } from '../services/card-processor.service';
import { KafkaService } from '../../../commons/kafka/kafka.service';
export declare class CardRequestedConsumer implements OnModuleInit {
    private readonly cardProcessorService;
    private readonly cardsRepository;
    private readonly kafkaService;
    constructor(cardProcessorService: CardProcessorService, cardsRepository: CardsRepository, kafkaService: KafkaService);
    private readonly logger;
    private kafka;
    onModuleInit(): Promise<void>;
    private retryDelay;
}
