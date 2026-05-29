"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var CardRequestedConsumer_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardRequestedConsumer = void 0;
const common_1 = require("@nestjs/common");
const kafkajs_1 = require("kafkajs");
let CardRequestedConsumer = CardRequestedConsumer_1 = class CardRequestedConsumer {
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
                this.logger.log(`EVENT RECEIVED: ${value}`);
            },
        });
    }
};
exports.CardRequestedConsumer = CardRequestedConsumer;
exports.CardRequestedConsumer = CardRequestedConsumer = CardRequestedConsumer_1 = __decorate([
    (0, common_1.Injectable)()
], CardRequestedConsumer);
//# sourceMappingURL=card-requested.consumer.js.map