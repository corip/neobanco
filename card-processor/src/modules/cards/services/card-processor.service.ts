import {Injectable,Logger,} from '@nestjs/common';
import { CardsRepository } from '../repositories/cards.repository';

@Injectable()
export class CardProcessorService {

    

    private readonly logger =
        new Logger(
            CardProcessorService.name,
        );

    async processCard(
        payload: any,
    ) {

        this.logger.log(`Processing request ${payload.source}`,);

        await this.simulateDelay();

        if (payload.data.forceError) {

            throw new Error(
                'Forced processing error',
            );
        }

        const success =
            Math.random() > 0.5;
        
        console.log("error:"+success)

        if (!success) {

            throw new Error(
                'Random processing error',
            );
        }

        return {

            cardId:
                crypto.randomUUID(),

            cardNumber:
                this.generateCardNumber(),

            expirationDate:
                '12/30',

            cvv:
                this.generateCvv(),
        };
    }

    private async simulateDelay() {

        const delay =Math.floor(Math.random() * 300,) + 200;

        return new Promise(
            (resolve) =>
                setTimeout(resolve, delay),
        );
    }

    private generateCardNumber() {

        return `411111111111${Math.floor(
            1000 + Math.random() * 9000,
        )}`;
    }

    private generateCvv() {

        return Math.floor(
            100 + Math.random() * 900,
        ).toString();
    }
}