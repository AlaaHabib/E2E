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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const decorators_1 = require("@nestjs/common/decorators");
const decorators_2 = require("@nestjs/common/decorators");
const guards_1 = require("../../application/auth/guards");
const user_1 = require("../../domain/dtos/user");
const user_service_1 = require("../../application/user/user.service");
const routBase = 'user';
let UserController = class UserController {
    constructor(service) {
        this.service = service;
    }
    async create(dto) {
        return await this.service.createUser(dto);
    }
    async getById({ id }) {
        return await this.service.getUserById(id);
    }
    async update({ id }, dto, response) {
        await this.service.updateUser(id, dto);
        response.send({
            statusCode: common_1.HttpStatus.OK,
            message: 'User updated successfully',
        });
    }
    async destroy(response, { id }) {
        await this.service.deleteUser(id);
        response.send({
            statusCode: common_1.HttpStatus.OK,
            message: 'User deleted successfully',
        });
    }
    async getUsers(params) {
        return await this.service.getAll(params);
    }
};
__decorate([
    (0, common_2.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create new user' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.FORBIDDEN, description: 'Forbidden.' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        description: 'The record has been successfully created.',
    }),
    __param(0, (0, common_2.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "create", null);
__decorate([
    (0, common_2.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'get user by id ' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.NOT_FOUND, description: 'Not Found.' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'user .',
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'user id' }),
    __param(0, (0, common_2.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getById", null);
__decorate([
    (0, decorators_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'update user' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.NOT_FOUND, description: 'Not Found.' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'The user has been successfully updated.',
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'user id' }),
    __param(0, (0, common_2.Param)()),
    __param(1, (0, common_2.Body)()),
    __param(2, (0, decorators_2.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_1.UpdateUserDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "update", null);
__decorate([
    (0, common_2.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete specific user' }),
    (0, swagger_1.ApiNotFoundResponse)({ status: common_1.HttpStatus.NOT_FOUND, description: 'Not Found.' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'The user has been successfully deleted..',
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: "user id'" }),
    __param(0, (0, decorators_2.Res)()),
    __param(1, (0, common_2.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "destroy", null);
__decorate([
    (0, common_2.Get)('/:index/:size'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all users created  with pagination ' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.FORBIDDEN, description: 'Forbidden.' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Users.' }),
    (0, swagger_1.ApiParam)({ name: 'size', description: "the count of results per page'" }),
    (0, swagger_1.ApiParam)({
        name: 'index',
        description: "the index of next page 'started from 1'",
    }),
    __param(0, (0, common_2.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUsers", null);
UserController = __decorate([
    (0, swagger_1.ApiTags)(routBase),
    (0, common_2.Controller)(routBase),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.UseGuards)(guards_1.AccessTokenGuard),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map