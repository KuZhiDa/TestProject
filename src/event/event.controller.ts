import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { EventService } from './event.service';
import { DtoData } from './dto/data.dto';

@Controller('event')
export class EventController {
  constructor(private eventService: EventService) {}

  @Post('')
  async postCreate(
    @Body(new ValidationPipe({ transform: true })) body: DtoData,
  ) {
    return this.eventService.createEvent(body);
  }
}
