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
exports.UserRepository = void 0;
const user_role_entity_1 = require("./../../domain/entities/user/user-role.entity");
const typeorm_1 = require("typeorm");
const uuid_1 = require("uuid");
const argon = require("argon2");
const common_1 = require("@nestjs/common");
const user_entity_1 = require("../../domain/entities/user/user.entity");
const CustomBaseRepository_1 = require("../../domain/repository/CustomBaseRepository");
let UserRepository = class UserRepository extends CustomBaseRepository_1.CustomRepository {
    constructor(dataSource) {
        super(dataSource.getRepository(user_entity_1.User));
        this._dataSource = dataSource;
    }
    async Register(dto) {
        const { email, password, userRoleId } = dto;
        const salt = (0, uuid_1.v4)();
        const passwordHash = await argon.hash(`${password}.${salt}`);
        const userRole = await this._dataSource
            .getRepository(user_role_entity_1.UserRole)
            .findOneBy({ id: userRoleId });
        const user = new user_entity_1.User();
        await this._dataSource.transaction(async (em) => {
            Object.assign(user, {
                salt: salt,
                createdAt: new Date(),
                passwordHash,
                email,
                userRole,
            });
            return await em.save(user_entity_1.User, user);
        });
        return user;
    }
};
UserRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], UserRepository);
exports.UserRepository = UserRepository;
//# sourceMappingURL=user.repository.js.map