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
exports.PlateController = void 0;
const common_1 = require("@nestjs/common");
const plate_service_1 = require("./../../application/plate/plate.service");
const common_2 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const plate_1 = require("../../domain/dtos/plate");
const decorators_1 = require("@nestjs/common/decorators");
const decorators_2 = require("@nestjs/common/decorators");
const request_user_decorator_1 = require("../../domain/decorators/request-user.decorator");
const guards_1 = require("../../application/auth/guards");
const routBase = 'plate';
let PlateController = class PlateController {
    constructor(service) {
        this.service = service;
    }
    async create(dto) {
        return await this.service.createPlate(dto);
    }
    async update({ id }, dto, response, user) {
        await this.service.updatePlate(id, dto, user === null || user === void 0 ? void 0 : user.role);
        response.send({
            statusCode: common_1.HttpStatus.OK,
            message: 'Plate updated successfully',
        });
    }
    async exchange({ id }, dto, response) {
        await this.service.exchangePlateService(id, dto);
        response.send({
            statusCode: common_1.HttpStatus.OK,
            message: 'exchange plate successfully',
        });
    }
    async unExchange({ id }, response, user) {
        await this.service.unExchangePlateService(id, user === null || user === void 0 ? void 0 : user.role);
        response.send({
            statusCode: common_1.HttpStatus.OK,
            message: 'Un Exchange plate successfully',
        });
    }
    async destroy(response, { id }, user) {
        await this.service.deletePlate(id, user === null || user === void 0 ? void 0 : user.role);
        response.send({
            statusCode: common_1.HttpStatus.OK,
            message: 'Plate deleted successfully',
        });
    }
    async getPlateNumbersByType({ PlateTypeId }) {
        return await this.service.getPlateNumbersByType(PlateTypeId);
    }
    async getPlatesToday(params) {
        return await this.service.getAll(params, true);
    }
    async getAll(params, query) {
        return await this.service.getAll(params, false, query);
    }
};
__decorate([
    (0, common_2.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create new plate' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.FORBIDDEN, description: 'Forbidden.' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        description: 'The record has been successfully created.',
    }),
    __param(0, (0, common_2.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [plate_1.CreatePlateDto]),
    __metadata("design:returntype", Promise)
], PlateController.prototype, "create", null);
__decorate([
    (0, decorators_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'update plate' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.NOT_FOUND, description: 'Not Found.' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'The plate has been successfully updated.',
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'plate id' }),
    __param(0, (0, common_2.Param)()),
    __param(1, (0, common_2.Body)()),
    __param(2, (0, decorators_2.Res)()),
    __param(3, (0, request_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, plate_1.UpdatePlateDto, Object, Object]),
    __metadata("design:returntype", Promise)
], PlateController.prototype, "update", null);
__decorate([
    (0, decorators_1.Patch)('exchange/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'exchange plate' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.NOT_FOUND, description: 'Not Found.' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'The plate has been successfully exchanged.',
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'plate id' }),
    __param(0, (0, common_2.Param)()),
    __param(1, (0, common_2.Body)()),
    __param(2, (0, decorators_2.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, plate_1.ExchangePlateDto, Object]),
    __metadata("design:returntype", Promise)
], PlateController.prototype, "exchange", null);
__decorate([
    (0, common_2.Get)('un-exchange/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'un exchange plate' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.NOT_FOUND, description: 'Not Found.' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'The plate has been successfully un exchange.',
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'plate id' }),
    __param(0, (0, common_2.Param)()),
    __param(1, (0, decorators_2.Res)()),
    __param(2, (0, request_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], PlateController.prototype, "unExchange", null);
__decorate([
    (0, common_2.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete specific plate' }),
    (0, swagger_1.ApiNotFoundResponse)({ status: 404, description: 'Not Found.' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'The product has been successfully deleted..',
    }),
    __param(0, (0, decorators_2.Res)()),
    __param(1, (0, common_2.Param)()),
    __param(2, (0, request_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], PlateController.prototype, "destroy", null);
__decorate([
    (0, common_2.Get)('type/:PlateTypeId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all plate numbers  in specific type' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.FORBIDDEN, description: 'Forbidden.' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'plate.' }),
    (0, swagger_1.ApiParam)({ name: 'PlateTypeId', description: 'plate type id' }),
    __param(0, (0, common_2.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PlateController.prototype, "getPlateNumbersByType", null);
__decorate([
    (0, common_2.Get)('/:index/:size'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all products created today with pagination ' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.FORBIDDEN, description: 'Forbidden.' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Products.' }),
    (0, swagger_1.ApiParam)({ name: 'size', description: "the count of results per page'" }),
    __param(0, (0, common_2.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PlateController.prototype, "getPlatesToday", null);
__decorate([
    (0, common_2.Get)('search/:index/:size'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all products with pagination in seach' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.FORBIDDEN, description: 'Forbidden.' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Products.' }),
    (0, swagger_1.ApiQuery)({
        name: 'number',
        required: false,
        type: String,
    }),
    (0, swagger_1.ApiQuery)({
        name: 'plateTypeId',
        required: false,
        type: Number,
    }),
    (0, swagger_1.ApiQuery)({
        name: 'enterTypeId',
        required: false,
        type: Number,
    }),
    (0, swagger_1.ApiQuery)({
        name: 'from',
        required: false,
        type: String,
    }),
    (0, swagger_1.ApiQuery)({
        name: 'receiver_name',
        required: false,
        type: String,
    }),
    (0, swagger_1.ApiQuery)({
        name: 'date_from',
        required: false,
        type: Date,
    }),
    (0, swagger_1.ApiQuery)({
        name: 'date_to',
        required: false,
        type: Date,
    }),
    (0, swagger_1.ApiQuery)({
        name: 'exchange',
        required: false,
        type: Boolean,
    }),
    (0, swagger_1.ApiParam)({
        name: 'index',
        description: "the index of next page 'started from 1'",
    }),
    (0, swagger_1.ApiParam)({ name: 'size', description: "the count of results per page'" }),
    __param(0, (0, common_2.Param)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PlateController.prototype, "getAll", null);
PlateController = __decorate([
    (0, swagger_1.ApiTags)(routBase),
    (0, common_2.Controller)(routBase),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.UseGuards)(guards_1.AccessTokenGuard),
    __metadata("design:paramtypes", [plate_service_1.PlateService])
], PlateController);
exports.PlateController = PlateController;
//# sourceMappingURL=plate.controller.js.map