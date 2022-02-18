const util = require('util');
import { Logger } from '@nestjs/common';

import * as dotenv from 'dotenv';
import { HttpResponse as ApiHttpResponse } from './rest/HttpResponse';
//

export namespace ApiBase {

    export type HttpResponse = ApiHttpResponse;

    /**
     * Default response http status code.
     *
     * @example
     * `return ApiBase.Status.SUCCESS`
     * 
     * Return
     * @returns status HTTP.
     */
    export const enum Status {
        FAILED = 0,
        EXCEPTION,
        ERROR_NULL_PARAMETER,
        ERROR_NULL_VALUE,
        ERROR_INVALID_PARAMETER,
        ERROR_NOT_FOUND,
        ERROR_DUPLICATED_DATA,
        ERROR_TRUNCATED_DATA,
        ERROR_REPOSITORY_BEGIN,
        ERROR_REPOSITORY_END,
        ERROR_MAX_ATTEMPTS,
        ERROR_CONFLICT,
        ERROR_UNKOWN_EVENT,
        ERROR_PROMISIFY_FAILED,
        REQUEST_CANCELED_BY_CLIENT,
        SERVER_OPERATION_TIMEOUT,
        SERVER_OPERATION_CANCELED,
        ERROR_INVALID_REQUEST,
        ERROR_JOB_EXECUTION_FAILED,
        PROMISE_TIMEOUT,
        ERROR_ALREADY_REGISTERED,
        CONTINUE = 100,
        SWITCHING_PROTOCOLS = 101,
        PROCESSING = 102,
        EARLYHINTS = 103,
        SUCCESS = 200,
        CREATED = 201,
        ACCEPTED = 202,
        NON_AUTHORITATIVE_INFORMATION = 203,
        NO_CONTENT = 204,
        RESET_CONTENT = 205,
        PARTIAL_CONTENT = 206,
        AMBIGUOUS = 300,
        MOVED_PERMANENTLY = 301,
        FOUND = 302,
        SEE_OTHER = 303,
        NOT_MODIFIED = 304,
        TEMPORARY_REDIRECT = 307,
        PERMANENT_REDIRECT = 308,
        BAD_REQUEST = 400,
        UNAUTHORIZED = 401,
        PAYMENT_REQUIRED = 402,
        FORBIDDEN = 403,
        METHOD_NOT_ALLOWED = 405,
        NOT_ACCEPTABLE = 406,
        PROXY_AUTHENTICATION_REQUIRED = 407,
        REQUEST_TIMEOUT = 408,
        GONE = 410,
        LENGTH_REQUIRED = 411,
        PRECONDITION_FAILED = 412,
        PAYLOAD_TOO_LARGE = 413,
        URI_TOO_LONG = 414,
        UNSUPPORTED_MEDIA_TYPE = 415,
        REQUESTED_RANGE_NOT_SATISFIABLE = 416,
        EXPECTATION_FAILED = 417,
        I_AM_A_TEAPOT = 418,
        MISDIRECTED = 421,
        UNPROCESSABLE_ENTITY = 422,
        FAILED_DEPENDENCY = 424,
        PRECONDITION_REQUIRED = 428,
        TOO_MANY_REQUESTS = 429,
        INTERNAL_SERVER_ERROR = 500,
        NOT_IMPLEMENTED = 501,
        BAD_GATEWAY = 502,
        SERVICE_UNAVAILABLE = 503,
        GATEWAY_TIMEOUT = 504,
        HTTP_VERSION_NOT_SUPPORTED = 505
    }

    export function handleHttpResponse(apiResponse: ApiBase.ApiResponse): ApiHttpResponse {
        try {
            const response = new ApiHttpResponse();
            switch (apiResponse.$status) {
                case Status.SUCCESS:
                    response.$message = 'Success';
                    response.$status = 200;
                    response.$reason = null;
                    response.$data = apiResponse.$data;
                    break;
                case Status.FAILED:
                    response.$message = 'Internal Server Error';
                    response.$status = 500;
                    response.$reason = 'Failed';
                    response.$data = apiResponse.$data;
                    break;
                case Status.EXCEPTION:
                    response.$message = 'Internal Server Error';
                    response.$status = 500;
                    response.$reason = 'Exception';
                    response.$data = apiResponse.$data;
                    break;
                case Status.ERROR_NULL_PARAMETER:
                    response.$message = 'Bad Request';
                    response.$status = 400;
                    response.$reason = 'Null parameters';
                    response.$data = apiResponse.$data;
                    break;
                case Status.ERROR_NULL_VALUE:
                    response.$message = 'Bad Request';
                    response.$status = 400;
                    response.$reason = 'Null value';
                    response.$data = apiResponse.$data;
                    break;
                case Status.ERROR_NOT_FOUND:
                case Status.NO_CONTENT:
                    response.$message = 'Not Found';
                    response.$status = 404;
                    response.$reason = 'Resource not found';
                    response.$data = apiResponse.$data;
                    break;
                case Status.ERROR_CONFLICT:
                    response.$message = 'Conflict';
                    response.$status = 409;
                    response.$reason = 'Unable to process request due to existing data';
                    response.$data = apiResponse.$data;
                    break;
                case Status.ERROR_INVALID_PARAMETER:
                    response.$message = 'Bad Request';
                    response.$status = 400;
                    response.$reason = 'Invalid Parameters';
                    response.$data = apiResponse.$data;
                    break;
                case Status.SERVER_OPERATION_TIMEOUT:
                case Status.REQUEST_TIMEOUT:
                case Status.PROMISE_TIMEOUT:
                    response.$message = 'Internal Server Error';
                    response.$status = 500;
                    response.$reason = 'Server operation timeout reached';
                    response.$data = apiResponse.$data;
                    break;
                case Status.ERROR_DUPLICATED_DATA:
                    response.$message = 'Internal Server Error';
                    response.$status = 500;
                    response.$reason = 'Data is already registered';
                case Status.ERROR_INVALID_REQUEST:
                    response.$message = 'Atenção';
                    response.$status = 400;
                    response.$reason = 'Requisição inválida';
                    response.$data = apiResponse.$data;
                    break;
                default:
                    response.$message = 'Internal Server Error';
                    response.$status = apiResponse.$status;
                    response.$reason = 'Internal error not handled';
                    response.$data = apiResponse.$data;
                    break;
            }
            return response;
        } catch (ex) {
            throw ex;
        }
    }

    /**
     * Default response scope for API.
     *
     * @example
     * `return Promise<ApiResponse>`
     * 
     * Return
     * @returns data object.
     * @returns status HTTP response status code.
     * @returns hasError indicator.
     */
    export class ApiResponse {
        private status: Status;
        private data: any;
        private hasError: boolean;

        constructor() {
            this.status = null;
            this.data = null;
            this.hasError = false;
        }

        public get $status(): Status {
            return this.status;
        }

        public set $status(value: Status) {
            this.status = value;
        }

        public get $data(): any {
            return this.data;
        }

        public set $data(value: any) {
            this.data = value;
        }

        public get $hasError(): boolean {
            return this.hasError;
        }

        public set $hasError(value: boolean) {
            this.hasError = value;
        }
    }

    /**
     * API success.
     *
     * @example
     * `return ApiBase.sucess(body)`
     *
     * @param data string or object.
     * 
     * Return
     * @returns data object.
     * @returns status HTTP response status code.
     * 
     */
    export function success(data: any): ApiResponse {

        if (data instanceof ApiResponse) return data;

        const apiResult = new ApiResponse();
        apiResult.$data = data;
        apiResult.$status = Status.SUCCESS;
        apiResult.$hasError = false;

        return apiResult;
    }

    /**
     * API error.
     *
     * @example
     * `return ApiBase.error(data, statusCode)`
     *
     * @param data string or object.
     * @param statusCode HttpStatus.
     * 
     * Return
     * @returns data object.
     * @returns status HTTP response status code.
     * 
     */
    export function error(data: any, statusCode: Status): ApiResponse {
        const apiResult = new ApiResponse();
        apiResult.$data = (typeof data == 'object') ? ApiBase.objectSerialize(data) : data;
        apiResult.$status = statusCode;
        apiResult.$hasError = true;

        if (statusCode !== Status.ERROR_NOT_FOUND) {
            const logger = new Logger
            logger.error(`${data}`, `API ERROR - ${statusCode}`);
        }

        return apiResult;
    }

    /**
     * API exception.
     *
     * @example
     * `return ApiBase.exception(error)`
     *
     * @param data string or object.
     * 
     * Return
     * @returns data object.
     * @returns status HTTP response status code.
     * 
     */
    export function exception(dataError: any): ApiResponse {
        try {
            const apiException = new Error();
            const apiError = new ApiResponse();

            // Error by Http request (ex: axios)
            if (dataError && dataError.hasOwnProperty('response')) {
                apiException.name = dataError['response']['statusText'];
                apiException.message = dataError['message'];
                apiException.stack = dataError['stack'];
                if (dataError['response']['data'] && dataError['response']['data']['errors'] && dataError['response']['data']['errors'].length > 0) {
                    apiException.message = dataError['response']['data']['errors'].join(" - ")
                } else if (dataError['response']['data'] && dataError['response']['data']['error'] && dataError['response']['data']['error'].length > 0){
                    apiException.message = dataError['response']['data']['error'].join(" - ")
                } else if (dataError['response']['data']) {
                    apiException.message = dataError['response']['data'];
                }

                apiError.$data = apiException;
                apiError.$status = dataError['response']['status'];
                apiError.$hasError = true;

                ApiBase.registerError(apiException.message, apiException.stack);

                return apiError;
            }

            // Internal Error
            if (dataError instanceof TypeError || dataError.hasOwnProperty("message") ) {
                apiException.message = dataError['message'];
                apiException.name = dataError['name'];
                apiException.stack = dataError['stack'];

                apiError.$data = apiException;
                apiError.$status = Status.INTERNAL_SERVER_ERROR;
                apiError.$hasError = true;

                ApiBase.registerError(apiException.message, apiException.stack);

                return apiError;
            }

            return dataError;
        } catch (ex) {
            return ex;
        }
    }

    /**
     * API log.
     *
     * @example
     * `return ApiBase.log(msg)`
     *
     * @param data string or object.
     * 
     * Return
     * @returns void.
     */
    export function log(msg: object | string, title?: string): void {
        try {
            if (!msg) {
                ApiBase.registerError(new Error('msg is NULL'));
                return;
            }

            const data = (typeof (msg) === 'object') ? ApiBase.objectSerialize(msg) : msg;

            const logger = new Logger
            logger.log(data, (title) ? title : 'Debug');

        } catch (ex) {
            ApiBase.logException(`Exception on function log(): ${ex}`);
        }
    }

    /**
     * API log error
     *
     * @example
     * `return ApiBase.registerError(msg)`
     *
     * @param data string or object.
     * 
     * Return
     * @returns void.
     */

    export function registerError(msg: object | string, errorData?: any): void {
        try {
            if (!msg) return;

            const logger = new Logger
            let msgData = null;
            if (typeof (msg) === 'object') {
                if (msg instanceof Error) {
                    msgData = msg.stack;
                } else {
                    msgData = new Error(ApiBase.objectSerialize(msg)).stack;
                }
            } else {
                msgData = msg;
            }
            const logData = {
                msg: msgData,
                errorData: (errorData && errorData instanceof Error) ? { name: errorData.name, message: errorData.message, stack: errorData.stack } : errorData
            }

            logger.error(logData, 'API ERROR');
        } catch (ex) {
            ApiBase.logException(`Exception on function registerError(): ${ex}`);
        }
    }

    /**
     * API log error
     *
     * @example
     * `return ApiBase.logException(msg)`
     *
     * @param data string.
     * 
     * Return
     * @returns void.
     */
    export function logException(msg: string): void {
        if (!msg) return;

        const logger = new Logger
        logger.error(msg, 'Exception');
    }

    /**
     * API object serialize
     *
     * @example
     * `return ApiBase.objectSerialize(data)`
     *
     * @param data string.
     * @param data Function.
     * 
     * Return
     * @returns string.
     */
    export function objectSerialize(data: object | Function): string {
        return util.inspect(data, { showHidden: true, depth: null });
    }

    /**
     * API environment
     *
     * @example
     * `return ApiBase.getApiEnv()`
     *
     * Return
     * @returns string.
     */
    export function getApiEnv(): string {
        dotenv.config();
        const env = process.env.NODE_ENV ? process.env.NODE_ENV.toLowerCase() : null
        return env;
    }
}