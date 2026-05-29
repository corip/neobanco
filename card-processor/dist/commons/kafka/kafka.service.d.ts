import { OnModuleInit } from '@nestjs/common';
export declare class KafkaService implements OnModuleInit {
    private kafka;
    private producer;
    constructor();
    onModuleInit(): Promise<void>;
    publish(topic: string, message: unknown): Promise<void>;
}
