import { Body, Controller, Post } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { DtoData } from './dto/data.dto';

@Controller('bookings')
export class BookingsController {
  constructor(private bookingsService: BookingsService) {}

  @Post('reserve')
  async postReserve(@Body() body: DtoData) {
    return this.bookingsService.bookingEvents(body);
  }
}
