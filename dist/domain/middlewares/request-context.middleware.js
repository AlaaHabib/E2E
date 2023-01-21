"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestContextMiddleware = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const request_scope_data_model_1 = require("../models/request-scope-data.model");
const jsonwebtoken_1 = require("jsonwebtoken");
let RequestContextMiddleware = class RequestContextMiddleware {
    use(req, res, next) {
        const isRefresh = req.originalUrl.includes('refresh');
        const Bearer = req.headers.authorization;
        const token = Bearer === null || Bearer === void 0 ? void 0 : Bearer.replace('Bearer', '').trim();
        console.log({ token });
        const { ip, method, path: url } = req;
        const userAgent = req.get('user-agent') || '';
        res.on('finish', () => {
            const { statusCode } = res;
            const contentLength = res.get('content-length');
        });
        let user;
        if (token) {
            try {
                user = this.validateToken(token, isRefresh ? 'refresh' : 'access');
            }
            catch (error) {
                throw new common_1.UnauthorizedException();
            }
            req['user'] = {
                id: user.sub,
                email: user['email'],
                role: user['role'],
            };
        }
        if (req.originalUrl.includes('/auth')) {
            next();
        }
        else {
            request_scope_data_model_1.RequestScopeData.cls.run(new request_scope_data_model_1.RequestScopeData(user === null || user === void 0 ? void 0 : user.sub, user === null || user === void 0 ? void 0 : user.email, user === null || user === void 0 ? void 0 : user.role), next);
        }
    }
    validateToken(token, type) {
        const decoded = (0, jsonwebtoken_1.verify)(token, type === 'access'
            ? process.env.ACCESS_TOKEN_KEY
            : process.env.REFRESH_TOKEN_KEY);
        return decoded;
    }
};
RequestContextMiddleware = __decorate([
    (0, common_2.Injectable)()
], RequestContextMiddleware);
exports.RequestContextMiddleware = RequestContextMiddleware;
//# sourceMappingURL=request-context.middleware.js.map