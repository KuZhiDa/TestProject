import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Bookings } from 'src/model/bookings.model';
import { Events } from 'src/model/events.model';
import { DtoData } from './dto/data.dto';

@Injectable()
export class BookingsService {
  constructor(
    @InjectModel(Bookings) private bookingsModel: typeof Bookings,
    @InjectModel(Events) private eventsModel: typeof Events,
  ) {}

  async bookingEvents(req: DtoData): Promise<{ message: string }> {
    const event = await this.eventsModel.findOne({
      where: { id: req.event_id },
      raw: true,
    });
    if (!event) {
      throw new BadRequestException('Такого мероприятия нет.');
    }
    const bookings = await this.bookingsModel.findAll({
      where: { event_id: req.event_id },
      raw: true,
    });
    if (event.total_seats <= bookings.length) {
      throw new BadRequestException('Нет мест на данное мероприятие.');
    }
    bookings.forEach((booking) => {
      if (booking.user_id === req.user_id) {
        throw new BadRequestException('Вы уже забронировали место.');
      }
    });
    await this.bookingsModel.create(req);
    return { message: 'Бронь прошла успешно.' };
  }
}
