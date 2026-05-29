import {
    Injectable,
    Logger,
    OnModuleInit,
} from '@nestjs/common';

import { CardsRepository } from '../repositories/cards.repository';

import { Kafka } from 'kafkajs';
import { CardProcessorService } from '../services/card-processor.service';
import { KafkaService } from '../../../commons/kafka/kafka.service'
import { KAFKA_TOPICS } from '../../../commons/kafka/topics';

@Injectable()
export class CardRequestedConsumer implements OnModuleInit {

    constructor(

        private readonly cardProcessorService: CardProcessorService,

        private readonly cardsRepository: CardsRepository,
        private readonly kafkaService: KafkaService,

    ) { }

    private readonly logger =
        new Logger(
            CardRequestedConsumer.name,
        );

    private kafka = new Kafka({

        clientId: 'card-processor',

        brokers: ['localhost:9092'],
    });

    async onModuleInit() {

        const consumer =
            this.kafka.consumer({

                groupId:
                    'card-processor-group',
            });

        await consumer.connect();

        await consumer.subscribe({

            topic:
                'io.card.requested.v1',

            fromBeginning: true,
        });

        this.logger.log('Consumer connected',);

        await consumer.run({

            eachMessage: async ({
                message,
            }) => {

                const value =
                    message.value?.toString();

                if (!value) {
                    return;
                }

                const event =
                    JSON.parse(value);

                let success = false;

                let retries = 0;

                while (
                    !success &&
                    retries < 3
                ) {

                    try {

                        retries++;

                        this.logger.log(
                            `Processing attempt ${retries} for ${event.source}`,
                        );

                        const cardData =
                            await this.cardProcessorService
                                .processCard(event);

                        await this.cardsRepository
                            .issueCard(
                                event.source,
                                cardData,
                            );

                        await this.kafkaService.publish(

                            KAFKA_TOPICS.CARD_ISSUED,

                            {

                                id: Date.now(),

                                source: event.source,

                                specversion: '1.0',

                                type:
                                    KAFKA_TOPICS.CARD_ISSUED,

                                time:
                                    new Date().toISOString(),

                                datacontenttype:
                                    'application/json',

                                data: {

                                    requestId:
                                        event.source,

                                    status:
                                        'ISSUED',

                                    card: cardData,
                                },
                            },
                        );
                        this.logger.log(
                            `Card issued successfully for ${event.source}`,
                        );

                        success = true;

                    } catch (error) {

                        this.logger.error(
                            `Attempt ${retries} failed: ${error}`,
                        );

                        if (retries < 3) {

                            await this.retryDelay(
                                retries,
                            );
                        }
                    }
                }



                if (!success) {

                    this.logger.error(
                        `Retries exhausted for ${event.source}`,
                    );

                    await this.cardsRepository
                        .updateStatus(
                            event.source,
                            'FAILED',
                            3,
                            'Retries exhausted',
                        );

                    await this.kafkaService.publish(

                        KAFKA_TOPICS.CARD_REQUESTED_DLQ,

                        {

                            id: Date.now(),

                            source: event.source,

                            specversion: '1.0',

                            type: KAFKA_TOPICS.CARD_REQUESTED_DLQ,

                            time: new Date().toISOString(),

                            datacontenttype: 'application/json',

                            data: {

                                originalEvent: event,

                                retries: 3,

                                reason:
                                    'Retries exhausted',

                                failedAt:
                                    new Date().toISOString(),
                            },
                        },
                    );
                }

            },
        });


    }

    private async retryDelay(retry: number,) {

        const delays = [
            1000,
            2000,
            4000,
        ];

        const delay = delays[retry - 1];

        return new Promise(
            (resolve) =>
                setTimeout(resolve, delay),
        );
    }
}