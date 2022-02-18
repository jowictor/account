import * as cookieParser from 'cookie-parser';
import * as helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { OptionsInterceptor } from './shared/middleware/options.middleware';
import { ApiBase } from './utils/ApiBase';

declare const module: any;

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.use(helmet());
	app.use(cookieParser());
	app.use(OptionsInterceptor);
	app.setGlobalPrefix('api/v1/');
	app.useGlobalPipes(new ValidationPipe());
	//app.useGlobalInterceptors(new NewrelicInterceptor());
	app.enableCors();

	await app.listen(process.env.API_PORT);
	if (module.hot) {
		module.hot.accept();
		module.hot.dispose(() => app.close());
	}
	ApiBase.log(`API started on ${process.env.API_PORT}`, 'API');
}
bootstrap();
