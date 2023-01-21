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
var Plate_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Plate = void 0;
const typeorm_1 = require("typeorm");
const base_record_1 = require("../base-tables/base-record");
const plate_type_entity_1 = require("./plate-type.entity");
const enter_type_entity_1 = require("./enter-type.entity");
let Plate = Plate_1 = class Plate extends base_record_1.BaseRecord {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment', { type: 'bigint' }),
    __metadata("design:type", Number)
], Plate.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", String)
], Plate.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Plate.prototype, "number", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Plate.prototype, "from", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Plate.prototype, "receiver_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Plate.prototype, "exchange", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    __metadata("design:type", String)
], Plate.prototype, "exchange_date", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Plate.prototype, "exchange_to", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Plate.prototype, "execution_committee", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 1 }),
    __metadata("design:type", Number)
], Plate.prototype, "version", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => plate_type_entity_1.PlateType, (plateType) => plateType.plates),
    __metadata("design:type", plate_type_entity_1.PlateType)
], Plate.prototype, "plateType", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => enter_type_entity_1.EnterType, (enterType) => enterType.plates),
    __metadata("design:type", enter_type_entity_1.EnterType)
], Plate.prototype, "enterType", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Plate_1, (plate) => plate.id, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'parentId' }),
    __metadata("design:type", Plate)
], Plate.prototype, "parent", void 0);
Plate = Plate_1 = __decorate([
    (0, typeorm_1.Entity)('plates'),
    (0, typeorm_1.Unique)('number_plateType_version', ['number', 'plateType', 'version'])
], Plate);
exports.Plate = Plate;
//# sourceMappingURL=plate.entity.js.map