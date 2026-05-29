import {
    BadRequestException,
    Injectable,
} from '@nestjs/common';

import { randomUUID } from 'crypto';

import { IssueCardDto } from '../dto/issue-card.dto';
import { CardsRepository } from '../repositories/cards.repository';

import { KafkaService } from '../../../commons/kafka/kafka.service';
import { KAFKA_TOPICS }
    from '../../../commons/kafka/topics';

import { CloudEvent }
    from '../../../commons/kafka/cloud-event.interface';

@Injectable()
export class CardsService {

    constructor(
        private readonly repository: CardsRepository,
        private readonly kafkaService: KafkaService,
    ) { }

    async issueCard(payload: IssueCardDto) {

        const exists =
        await this.repository.exists(
            payload.documentNumber,
        );

    if (exists) {

        throw new BadRequestException(
            'Customer already has a card',
        );
    }

    const requestId = randomUUID();

    const response = {
        requestId,
        status: 'PENDING',
    };

    await this.repository.save({

        requestId,

        documentNumber:
            payload.documentNumber,

        documentType:
            payload.documentType,

        email:
            payload.email,

        age:
            payload.age,

        type:
            payload.type,

        currency:
            payload.currency,

        status: 'PENDING',
    });

    const event: CloudEvent<IssueCardDto> = {

        id: Date.now(),

        source: requestId,

        specversion: '1.0',

        type: KAFKA_TOPICS.CARD_REQUESTED,

        time: new Date().toISOString(),

        datacontenttype:
            'application/json',

        data: payload,
    };

    await this.kafkaService.publish(
        KAFKA_TOPICS.CARD_REQUESTED,
        event,
    );

    return response;
    }
}