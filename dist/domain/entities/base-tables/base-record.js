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
exports.BaseRecord = exports.BaseUpdate = exports.BaseInsert = void 0;
const typeorm_1 = require("typeorm");
const request_scope_data_model_1 = require("../../models/request-scope-data.model");
const helpers_1 = require("../../helpers");
class BaseInsert {
    addUser() {
        const context = request_scope_data_model_1.RequestScopeData.currentContext;
        (0, helpers_1.CustomLogger)({ context });
        if (context && context.id) {
            this.createdBy = request_scope_data_model_1.RequestScopeData.currentContext.id;
        }
    }
}
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], BaseInsert.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], BaseInsert.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BaseInsert.prototype, "addUser", null);
exports.BaseInsert = BaseInsert;
class BaseUpdate extends BaseInsert {
    UpdateUser() {
        const context = request_scope_data_model_1.RequestScopeData.currentContext;
        (0, helpers_1.CustomLogger)({ context });
        if (context && context.id) {
            this.updatedBy = request_scope_data_model_1.RequestScopeData.currentContext.id;
        }
    }
}
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], BaseUpdate.prototype, "updatedBy", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], BaseUpdate.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BaseUpdate.prototype, "UpdateUser", null);
exports.BaseUpdate = BaseUpdate;
class BaseRecord extends BaseUpdate {
}
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], BaseRecord.prototype, "deletedAt", void 0);
exports.BaseRecord = BaseRecord;
//# sourceMappingURL=base-record.js.map