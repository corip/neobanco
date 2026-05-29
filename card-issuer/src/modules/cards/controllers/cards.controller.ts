import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';

import { IssueCardDto } from '../dto/issue-card.dto';
import { CardsService } from '../services/cards.service';

@ApiTags('cards')
@Controller('cards')
export class CardsController {

  constructor(
    private readonly cardsService: CardsService,
  ) {}

  @Post('issue')
  async issueCard(
    @Body() payload: IssueCardDto,
  ) {
    return this.cardsService.issueCard(payload);
  }
}