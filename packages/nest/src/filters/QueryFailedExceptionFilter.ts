import { QueryFailedError } from 'typeorm';
import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(QueryFailedError)
export class QueryFailedExceptionFilter
  implements ExceptionFilter<QueryFailedError> {
  catch(exception: any, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const { severity, code, detail, hint, name, message } = exception;

    const errorResponse = { severity, code, detail, hint, name, message };

    response.status(HttpStatus.BAD_REQUEST).json(errorResponse);
  }
}
