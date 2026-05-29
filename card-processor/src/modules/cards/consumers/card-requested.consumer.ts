import {
  Injectable,
  Logger,
  OnModuleInit,
} from '@nestjs/common';

import { Kafka }
from 'kafkajs';

@Injectable()
export class CardRequestedConsumer
implements OnModuleInit {

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

        this.logger.log(`EVENT RECEIVED: ${value}`,);
      },
    });
  }
}