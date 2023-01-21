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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const enums_1 = require("../../domain/entities/enums");
const custom_exception_1 = require("../../domain/exceptions/custom.exception");
const repositories_1 = require("../../infrastructure/repositories");
let UserService = class UserService {
    constructor(repo) {
        this.repo = repo;
    }
    async createUser(dto) {
        var _a;
        try {
            return await this.repo.Register(dto);
        }
        catch (error) {
            throw new custom_exception_1.CustomException(error, (_a = error === null || error === void 0 ? void 0 : error.driverError) === null || _a === void 0 ? void 0 : _a.details);
        }
    }
    async updateUser(id, data) {
        var _a;
        try {
            return await this.repo.update(id, data);
        }
        catch (error) {
            throw new custom_exception_1.CustomException(error, (_a = error === null || error === void 0 ? void 0 : error.driverError) === null || _a === void 0 ? void 0 : _a.details);
        }
    }
    async deleteUser(id) {
        var _a;
        try {
            return await this.repo.delete(id);
        }
        catch (error) {
            throw new custom_exception_1.CustomException(error, (_a = error === null || error === void 0 ? void 0 : error.driverError) === null || _a === void 0 ? void 0 : _a.details);
        }
    }
    async getAll(params) {
        const pageIndex = Number(params.index);
        let limit = Number(params.size);
        if (limit < 1 || pageIndex < 1)
            throw new common_1.BadRequestException('Enter valid data');
        return await this.repo.findPagination(pageIndex, limit, { id: 'DESC' }, { userRole: { name: enums_1.UsersRoles.User } }, {
            id: true,
            email: true,
            userRole: { id: true, name: true }
        }, { userRole: true });
    }
    async getUserById(id) {
        const user = await this.repo.findOneBy({ id });
        if (user)
            return user;
        throw new common_1.NotFoundException('User Not found');
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [repositories_1.UserRepository])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map