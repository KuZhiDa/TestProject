import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Bookings } from 'src/model/bookings.model';
import { Events } from 'src/model/events.model';

@Module({
  providers: [BookingsService],
  controllers: [BookingsController],
  imports: [SequelizeModule.forFeature([Bookings, Events])],
})
export class BookingsModule {}
