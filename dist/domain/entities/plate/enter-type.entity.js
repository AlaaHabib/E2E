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
exports.EnterType = void 0;
const plate_entity_1 = require("./plate.entity");
const typeorm_1 = require("typeorm");
const base_record_1 = require("../base-tables/base-record");
let EnterType = class EnterType extends base_record_1.BaseRecord {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment', { type: 'bigint' }),
    __metadata("design:type", Number)
], EnterType.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], EnterType.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => plate_entity_1.Plate, (plate) => plate.enterType, { onDelete: 'NO ACTION' }),
    __metadata("design:type", Array)
], EnterType.prototype, "plates", void 0);
EnterType = __decorate([
    (0, typeorm_1.Entity)('enter_types')
], EnterType);
exports.EnterType = EnterType;
//# sourceMappingURL=enter-type.entity.js.map