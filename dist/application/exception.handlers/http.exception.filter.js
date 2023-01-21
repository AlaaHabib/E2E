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
exports.HttpExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const nest_winston_1 = require("nest-winston");
const winston_1 = require("winston");
const helpers_1 = require("../../domain/helpers");
let HttpExceptionFilter = class HttpExceptionFilter {
    constructor(logger) {
        this.logger = logger;
    }
    catch(exception, host) {
        var _a;
        (0, helpers_1.CustomLogger)('HttpExceptionFilter', { exception });
        const response = host.switchToHttp().getResponse();
        const { code, detail } = exception;
        let message = exception['response'] && exception['response']['message'], status = (_a = exception['status']) !== null && _a !== void 0 ? _a : '400', type = exception['error'];
        if (!message)
            message = 'something went wrong';
        let customResponse;
        if (process.env.NEST_ENV == 'production') {
            customResponse = {
                status,
                message,
                timestamp: new Date().toUTCString(),
            };
        }
        else {
            customResponse = {
                status,
                message,
                type,
                log: [{ code: code, detail, exception }],
                timestamp: new Date().toUTCString(),
            };
        }
        this.logger.error([{ code: code, message: message, detail, exception }]);
        response.status(customResponse.status).json(customResponse);
    }
};
HttpExceptionFilter = __decorate([
    (0, common_1.Catch)(common_1.HttpException, Error),
    __param(0, (0, common_1.Inject)(nest_winston_1.WINSTON_MODULE_PROVIDER)),
    __metadata("design:paramtypes", [winston_1.Logger])
], HttpExceptionFilter);
exports.HttpExceptionFilter = HttpExceptionFilter;
//# sourceMappingURL=http.exception.filter.js.map