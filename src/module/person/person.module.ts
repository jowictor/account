import { Module } from '@nestjs/common';
import { PersonService } from './person.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Person } from './person.model'

@Module({
  imports: [SequelizeModule.forFeature([Person])],
  providers: [PersonService],
  controllers: [],
})
export class PersonModule {}
