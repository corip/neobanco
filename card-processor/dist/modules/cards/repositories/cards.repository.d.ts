import { Repository } from 'typeorm';
import { CardRequestEntity } from '../entities/card-request.entity';
export declare class CardsRepository {
    private readonly repository;
    constructor(repository: Repository<CardRequestEntity>);
    findByRequestId(requestId: string): Promise<CardRequestEntity | null>;
    updateStatus(requestId: string, status: string, retries: number, errorReason?: string): Promise<void>;
    issueCard(requestId: string, cardData: any): Promise<void>;
}
