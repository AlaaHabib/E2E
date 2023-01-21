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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const user_1 = require("../../domain/entities/user");
const typeorm_1 = require("typeorm");
const argon = require("argon2");
let AuthService = class AuthService {
    constructor(dataSource, configService, jwtService) {
        this.dataSource = dataSource;
        this.configService = configService;
        this.jwtService = jwtService;
    }
    async login(dto, refresh = false, userId) {
        const user = await this.dataSource.manager.findOne(user_1.User, {
            where: refresh ? { id: userId } : { email: dto.email },
            select: {
                id: true,
                email: true,
                passwordHash: true,
                isActive: true,
                salt: true,
                userRole: { id: true, name: true },
            },
            relations: { userRole: true },
        });
        if (!user) {
            throw new common_1.ForbiddenException('Access Denied');
        }
        if (!user.isActive)
            throw new common_1.ForbiddenException('Access Denied, Your account is not active');
        if (!refresh) {
            const passwordMatches = await argon.verify(user.passwordHash, `${dto.password}.${user.salt}`);
            if (!passwordMatches)
                throw new common_1.ForbiddenException('Credentials incorrect');
        }
        const payload = { email: user.email, sub: user.id, role: user.userRole.name };
        const tokens = await this.generateTokens(payload);
        return { token: tokens, role: user.userRole.name };
    }
    async generateTokens(payload) {
        const [token, refreshToken] = await Promise.all([
            await this.jwtService.sign(payload, {
                secret: this.configService.getOrThrow('ACCESS_TOKEN_KEY'),
                expiresIn: this.configService.getOrThrow('TOKEN_EXPIRE'),
            }),
            await this.jwtService.sign(payload, {
                secret: this.configService.getOrThrow('REFRESH_TOKEN_KEY'),
                expiresIn: this.configService.getOrThrow('REFRESH_TOKEN_EXPIRE'),
            }),
        ]);
        return {
            access_token: token,
            refresh_token: refreshToken,
        };
    }
    async refreshToken(refreshToken) {
        const decoded = this.jwtService.decode(refreshToken);
        return await this.login(null, true, decoded.sub);
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource,
        config_1.ConfigService,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map