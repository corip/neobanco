import { OnModuleInit } from '@nestjs/common';
export declare class CardRequestedConsumer implements OnModuleInit {
    private readonly logger;
    private kafka;
    onModuleInit(): Promise<void>;
}
