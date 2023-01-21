"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const helpers_1 = require("../../domain/helpers");
let AllExceptionFilter = class AllExceptionFilter {
    catch(exception, host) {
        (0, helpers_1.CustomLogger)('AllExceptionFilter');
        const response = host.switchToHttp().getResponse();
        const message = exception.massage, status = 500, type = 'Internal Server Error';
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
                log: { exception },
                timestamp: new Date().toUTCString(),
            };
        }
        response.status(customResponse.status).json(customResponse);
    }
};
AllExceptionFilter = __decorate([
    (0, common_1.Catch)()
], AllExceptionFilter);
exports.AllExceptionFilter = AllExceptionFilter;
//# sourceMappingURL=all.exception.filter.js.map