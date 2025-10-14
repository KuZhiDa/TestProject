import {
  Column,
  DataType,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Bookings } from './bookings.model';

interface EventsInterface {
  name: string;
  total_seats: number;
}

@Table({
  tableName: 'events',
  createdAt: false,
  updatedAt: false,
  timestamps: false,
})
export class Events extends Model<Events, EventsInterface> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @Column({ type: DataType.STRING(100) })
  declare name: string;

  @Column({ type: DataType.INTEGER, validate: { min: 0 } })
  declare total_seats: number;

  @HasMany(() => Bookings)
  bookings: Bookings[];
}
