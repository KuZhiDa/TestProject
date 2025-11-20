import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Bookings } from 'src/model/bookings.model';
import { Events } from 'src/model/events.model';
import { DtoData } from './dto/data.dto';
import { selectDto } from './dto/select.dto';
import { col, fn, literal, Sequelize } from 'sequelize';

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

  async getRangBooking(dto: selectDto) {
    const where: any = {};
    if (dto.day) {
      where.createdAt = Sequelize.where(
        fn('TO_CHAR', col('createdAt'), 'YYYY-MM-DD'),
        dto.day,
      );
    } else if (dto.month) {
      where.createdAt = Sequelize.where(
        fn('TO_CHAR', col('createdAt'), 'YYYY-MM'),
        dto.month,
      );
    } else if (dto.year) {
      where.createdAt = Sequelize.where(
        fn('TO_CHAR', col('createdAt'), 'YYYY'),
        dto.year,
      );
    }
    const result = await this.bookingsModel.findAll({
      attributes: [
        'user_id',
        [literal(`RANK() OVER (ORDER BY COUNT(user_id) DESC)`), 'place'],
        [fn('COUNT', col('user_id')), 'bookings_count'],
      ],
      where,
      group: ['user_id'],
      order: [['bookings_count', 'DESC']],
      limit: 10,
      raw: true,
    });
    return result;
  }
}
