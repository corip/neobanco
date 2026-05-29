import {
  Injectable,
  OnModuleInit,
} from '@nestjs/common';

import {
  Kafka,
  Producer,
  Partitioners,
} from 'kafkajs';

@Injectable()
export class KafkaService
implements OnModuleInit {

  private kafka: Kafka;

  private producer: Producer;

  constructor() {

    console.log('Initializing Kafka...',);

    this.kafka = new Kafka({
      clientId: 'card-issuer',
      brokers: ['localhost:9092'],
    });

    this.producer =
      this.kafka.producer({
        createPartitioner:
          Partitioners.LegacyPartitioner,
      });
  }

  async onModuleInit() {

    console.log('Connecting producer...',);

    await this.producer.connect();

    console.log('Producer connected',);
  }

  async publish(topic: string,message: unknown,) {

    console.log(`Publishing event to ${topic}`,);

    await this.producer.send({
      topic,
      messages: [
        {
          value: JSON.stringify(message),
        },
      ],
    });

    console.log('Event published successfully',);
  }
}