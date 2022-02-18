import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Account } from './account.model'

@Module({
  imports: [SequelizeModule.forFeature([Account])],
  providers: [AccountService],
  controllers: [AccountController],
})
export class AccountModule {}
