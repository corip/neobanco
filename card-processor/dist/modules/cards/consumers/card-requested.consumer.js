"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var CardRequestedConsumer_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardRequestedConsumer = void 0;
const common_1 = require("@nestjs/common");
const cards_repository_1 = require("../repositories/cards.repository");
const kafkajs_1 = require("kafkajs");
const card_processor_service_1 = require("../services/card-processor.service");
const kafka_service_1 = require("../../../commons/kafka/kafka.service");
const topics_1 = require("../../../commons/kafka/topics");
let CardRequestedConsumer = CardRequestedConsumer_1 = class CardRequestedConsumer {
    cardProcessorService;
    cardsRepository;
    kafkaService;
    constructor(cardProcessorService, cardsRepository, kafkaService) {
        this.cardProcessorService = cardProcessorService;
        this.cardsRepository = cardsRepository;
        this.kafkaService = kafkaService;
    }
    logger = new common_1.Logger(CardRequestedConsumer_1.name);
    kafka = new kafkajs_1.Kafka({
        clientId: 'card-processor',
        brokers: ['localhost:9092'],
    });
    async onModuleInit() {
        const consumer = this.kafka.consumer({
            groupId: 'card-processor-group',
        });
        await consumer.connect();
        await consumer.subscribe({
            topic: 'io.card.requested.v1',
            fromBeginning: true,
        });
        this.logger.log('Consumer connected');
        await consumer.run({
            eachMessage: async ({ message, }) => {
                const value = message.value?.toString();
                if (!value) {
                    return;
                }
                const event = JSON.parse(value);
                let success = false;
                let retries = 0;
                while (!success &&
                    retries < 3) {
                    try {
                        retries++;
                        this.logger.log(`Processing attempt ${retries} for ${event.source}`);
                        const cardData = await this.cardProcessorService
                            .processCard(event);
                        await this.cardsRepository
                            .issueCard(event.source, cardData);
                        this.logger.log(`Card issued successfully for ${event.source}`);
                        success = true;
                    }
                    catch (error) {
                        this.logger.error(`Attempt ${retries} failed: ${error}`);
                        if (retries < 3) {
                            await this.retryDelay(retries);
                        }
                    }
                }
                if (!success) {
                    this.logger.error(`Retries exhausted for ${event.source}`);
                    await this.cardsRepository
                        .updateStatus(event.source, 'FAILED', 3, 'Retries exhausted');
                    await this.kafkaService.publish(topics_1.KAFKA_TOPICS.CARD_REQUESTED_DLQ, {
                        id: Date.now(),
                        source: event.source,
                        specversion: '1.0',
                        type: topics_1.KAFKA_TOPICS.CARD_REQUESTED_DLQ,
                        time: new Date().toISOString(),
                        datacontenttype: 'application/json',
                        data: {
                            originalEvent: event,
                            retries: 3,
                            reason: 'Retries exhausted',
                            failedAt: new Date().toISOString(),
                        },
                    });
                }
            },
        });
    }
    async retryDelay(retry) {
        const delays = [
            1000,
            2000,
            4000,
        ];
        const delay = delays[retry - 1];
        return new Promise((resolve) => setTimeout(resolve, delay));
    }
};
exports.CardRequestedConsumer = CardRequestedConsumer;
exports.CardRequestedConsumer = CardRequestedConsumer = CardRequestedConsumer_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [card_processor_service_1.CardProcessorService,
        cards_repository_1.CardsRepository,
        kafka_service_1.KafkaService])
], CardRequestedConsumer);
//# sourceMappingURL=card-requested.consumer.js.map