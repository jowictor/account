import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Transaction } from './transaction.model'

@Module({
  imports: [SequelizeModule.forFeature([Transaction])],
  providers: [TransactionService],
  controllers: [],
})
export class TransactionModule {}
