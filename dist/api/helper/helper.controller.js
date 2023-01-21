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
exports.HelperController = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const guards_1 = require("../../application/auth/guards");
const helper_service_1 = require("../../application/helper/helper.service");
const routBase = 'helper';
let HelperController = class HelperController {
    constructor(service) {
        this.service = service;
    }
    async getPlateType() {
        return await this.service.getPlateType();
    }
    async getEnterType() {
        return await this.service.getEnterType();
    }
};
__decorate([
    (0, common_2.Get)('plate-type'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HelperController.prototype, "getPlateType", null);
__decorate([
    (0, common_2.Get)('enter-type'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HelperController.prototype, "getEnterType", null);
HelperController = __decorate([
    (0, swagger_1.ApiTags)(routBase),
    (0, common_2.Controller)(routBase),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.UseGuards)(guards_1.AccessTokenGuard),
    __metadata("design:paramtypes", [helper_service_1.HelperService])
], HelperController);
exports.HelperController = HelperController;
//# sourceMappingURL=helper.controller.js.map