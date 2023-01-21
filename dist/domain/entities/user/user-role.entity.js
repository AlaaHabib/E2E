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
exports.UserRole = void 0;
const typeorm_1 = require("typeorm");
const base_record_1 = require("../base-tables/base-record");
const user_entity_1 = require("./user.entity");
const users_role_enum_1 = require("../enums/users-role.enum");
let UserRole = class UserRole extends base_record_1.BaseRecord {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment', { type: 'bigint' }),
    __metadata("design:type", Number)
], UserRole.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'simple-enum',
        enum: users_role_enum_1.UsersRoles,
    }),
    __metadata("design:type", String)
], UserRole.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => user_entity_1.User, (user) => user.userRole, { onDelete: 'NO ACTION' }),
    __metadata("design:type", Array)
], UserRole.prototype, "users", void 0);
UserRole = __decorate([
    (0, typeorm_1.Entity)('user_roles')
], UserRole);
exports.UserRole = UserRole;
//# sourceMappingURL=user-role.entity.js.map