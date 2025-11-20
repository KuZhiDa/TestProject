import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { DtoData } from './dto/data.dto';
import { selectDto } from './dto/select.dto';

@Controller('bookings')
export class BookingsController {
  constructor(private bookingsService: BookingsService) {}

  @Post('reserve')
  async postReserve(@Body() body: DtoData) {
    return this.bookingsService.bookingEvents(body);
  }

  @Get('reserve')
  @UsePipes(new ValidationPipe())
  async getReserve(@Query() dto: selectDto) {
    console.log(dto);
    return await this.bookingsService.getRangBooking(dto);
  }
}
