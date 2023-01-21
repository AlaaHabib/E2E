"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeOrmExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const nest_winston_1 = require("nest-winston");
const winston_1 = require("winston");
const custom_exception_1 = require("../../domain/exceptions/custom.exception");
const helpers_1 = require("../../domain/helpers");
let TypeOrmExceptionFilter = class TypeOrmExceptionFilter {
    constructor(logger) {
        this.logger = logger;
    }
    catch(exception, host) {
        (0, helpers_1.CustomLogger)('TypeOrmExceptionFilter', { exception });
        const response = host.switchToHttp().getResponse();
        const { status, friendlyMsg, error, typeError } = exception;
        let message = friendlyMsg !== null && friendlyMsg !== void 0 ? friendlyMsg : 'something went wrong';
        let type = typeError !== null && typeError !== void 0 ? typeError : 'Bad Request';
        let customResponse;
        if (process.env.NEST_ENV == 'production') {
            customResponse = {
                status: status !== null && status !== void 0 ? status : 400,
                message,
                timestamp: new Date().toUTCString(),
            };
        }
        else {
            customResponse = {
                status: status !== null && status !== void 0 ? status : 400,
                message,
                type,
                log: [{ status: status !== null && status !== void 0 ? status : 400, message, type, error }],
                timestamp: new Date().toUTCString(),
            };
        }
        this.logger.error([{ status: status !== null && status !== void 0 ? status : 400, message, type, error }]);
        response.status(customResponse.status).json(customResponse);
    }
};
TypeOrmExceptionFilter = __decorate([
    (0, common_1.Catch)(typeorm_1.TypeORMError, typeorm_1.QueryFailedError, typeorm_1.EntityNotFoundError, custom_exception_1.CustomException),
    __param(0, (0, common_1.Inject)(nest_winston_1.WINSTON_MODULE_PROVIDER)),
    __metadata("design:paramtypes", [winston_1.Logger])
], TypeOrmExceptionFilter);
exports.TypeOrmExceptionFilter = TypeOrmExceptionFilter;
//# sourceMappingURL=db.exception.filter.js.map