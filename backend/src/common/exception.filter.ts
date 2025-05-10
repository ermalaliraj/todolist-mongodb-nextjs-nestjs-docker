import { ExceptionFilter, Catch, ArgumentsHost, BadRequestException, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import logger from 'src/utils/logger';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()

    let status = 500
    let errorMessage = 'Internal Server Error'

    if (exception instanceof BadRequestException) {
      const validationErrors = this.extractValidationErrors(exception)
      if (validationErrors) {
        status = 400
        errorMessage = validationErrors.join(', ')
      } else {
        status = exception.getStatus()
        errorMessage = exception.message
      }
    } else if (exception instanceof HttpException) {
      status = exception.getStatus()
      errorMessage = exception.message
    }

    logger.error(exception.stack)

    response.status(status).json({
      statusCode: status,
      path: request.url,
      message: errorMessage,
    })
  }

  private extractValidationErrors(exception: BadRequestException): string[] | null {
    const errors = exception.getResponse()
    //console.log('Validation Errors:', errors);
  
    if (typeof errors === 'string') {
      return [errors]
    } else if (errors && typeof errors === 'object' && 'message' in errors && Array.isArray(errors.message)) {
      return errors.message
    }

    return null
  }
}