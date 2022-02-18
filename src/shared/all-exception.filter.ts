import 'dotenv/config';
import { ArgumentsHost, Catch, ExceptionFilter, Logger } from '@nestjs/common';
import { ApiBase } from '../utils/ApiBase';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger : Logger 
  constructor(){
    this.logger = new Logger 
  }
  catch(exception: ApiBase.ApiResponse, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();

    const errorResponse = Object.assign({},exception );
    const statusCode = (exception && exception.$status && exception.$status >= 100) ? exception.$status : ApiBase.Status.INTERNAL_SERVER_ERROR;
    if (exception && exception.$status && exception.$status < 100) ApiBase.error(`ATTENTION AllExceptionsFilter: Exception status code (${exception.$status}) is not supported, changed to INTERNAL_SERVER_ERROR`, ApiBase.Status.INTERNAL_SERVER_ERROR)
    if (process.env.NODE_ENV == 'prod' &&  errorResponse['data'] &&  errorResponse['data'].hasOwnProperty('stack')) delete errorResponse['data']['stack'];

    const stackError = (errorResponse['data'] && errorResponse['data'].hasOwnProperty('stack')) ? exception['data']['stack'] : null;
    if (stackError) {
      this.logger.error(`Exception - request method: ${request.method} request url${request.url}`, stackError, JSON.stringify(exception));
    } else {
      this.logger.error(`Exception - request method: ${request.method} request url${request.url}`,JSON.stringify(exception));
    }
    return response.status(statusCode).json(errorResponse);
  }
}