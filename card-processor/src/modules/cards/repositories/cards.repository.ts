import { Injectable } from '@nestjs/common';

import { InjectRepository }
    from '@nestjs/typeorm';

import { Repository }
    from 'typeorm';

import { CardRequestEntity }
    from '../entities/card-request.entity';

@Injectable()
export class CardsRepository {

    constructor(
        @InjectRepository(CardRequestEntity)
        private readonly repository: Repository<CardRequestEntity>,
    ) { }

    async findByRequestId(requestId: string,) {

        return this.repository.findOne({
            where: { requestId, },
        });
    }

    async updateStatus(requestId: string,status: string,retries: number,errorReason?: string,) {

        console.log('Update base de datos',);
        await this.repository.update(
            {
                requestId,
            },
            {
                status,
                retries,
                errorReason,
            },
        );
    }
}