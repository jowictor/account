// General import
import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './shared/all-exception.filter';
import { SequelizeModule } from '@nestjs/sequelize';
// Module import
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { LoggerModule } from 'nestjs-pino';
import { ScheduleModule } from '@nestjs/schedule';
import { AccountModule } from './module/account/account.module';
import { CompanyModule } from './module/company/company.module';
import { PersonModule } from './module/person/person.module';
import { TransactionModule } from './module/transaction/transaction.module';

@Module({
	imports: [
		AccountModule,
		CompanyModule,
		PersonModule,
		TransactionModule,
		LoggerModule.forRoot(),
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		ThrottlerModule.forRoot({
			ttl: 60,
			limit: 10,
		}),
		ScheduleModule.forRoot(),
		SequelizeModule.forRoot({
			dialect: 'postgres',
			host: 'localhost',
			port: 5432,
			username: 'postgres',
			password: 'postgres',
			database: 'postgres',
			autoLoadModels: true,
			synchronize: true,
		  })],
	controllers: [],
	providers: [
		{
			provide: APP_FILTER,
			useClass: AllExceptionsFilter,
		},
	],
})
export class AppModule {}
