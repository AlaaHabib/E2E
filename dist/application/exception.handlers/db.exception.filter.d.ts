import { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { EntityNotFoundError, QueryFailedError, TypeORMError } from 'typeorm';
import { Logger } from 'winston';
export declare class TypeOrmExceptionFilter implements ExceptionFilter {
    private readonly logger;
    constructor(logger: Logger);
    catch(exception: TypeORMError | QueryFailedError | EntityNotFoundError, host: ArgumentsHost): void;
}
