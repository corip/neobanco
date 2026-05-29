"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var CardProcessorService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardProcessorService = void 0;
const common_1 = require("@nestjs/common");
let CardProcessorService = CardProcessorService_1 = class CardProcessorService {
    logger = new common_1.Logger(CardProcessorService_1.name);
    async processCard(payload) {
        this.logger.log(`Processing request ${payload.source}`);
        await this.simulateDelay();
        if (payload.data.forceError) {
            throw new Error('Forced processing error');
        }
        const success = Math.random() > 0.5;
        console.log("error:" + success);
        if (!success) {
            throw new Error('Random processing error');
        }
        return {
            cardId: crypto.randomUUID(),
            cardNumber: this.generateCardNumber(),
            expirationDate: '12/30',
            cvv: this.generateCvv(),
        };
    }
    async simulateDelay() {
        const delay = Math.floor(Math.random() * 300) + 200;
        return new Promise((resolve) => setTimeout(resolve, delay));
    }
    generateCardNumber() {
        return `411111111111${Math.floor(1000 + Math.random() * 9000)}`;
    }
    generateCvv() {
        return Math.floor(100 + Math.random() * 900).toString();
    }
};
exports.CardProcessorService = CardProcessorService;
exports.CardProcessorService = CardProcessorService = CardProcessorService_1 = __decorate([
    (0, common_1.Injectable)()
], CardProcessorService);
//# sourceMappingURL=card-processor.service.js.map