import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Bookings } from './model/bookings.model';
import { Events } from './model/events.model';
import { ConfigModule } from '@nestjs/config';
import { EventModule } from './event/event.module';
import { BookingsModule } from './bookings/bookings.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [Events, Bookings],
      autoLoadModels: true,
    }),
    BookingsModule,
    EventModule,
  ],
})
export class AppModule {}
