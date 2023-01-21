"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductionSeeder = void 0;
const user_role_entity_1 = require("./../../domain/entities/user/user-role.entity");
const users_role_enum_1 = require("../../domain/entities/enums/users-role.enum");
const repositories_1 = require("../repositories");
class ProductionSeeder {
    constructor(dataSource) {
        this.dataSource = dataSource;
        this.userRepo = new repositories_1.UserRepository(dataSource);
    }
    async seed() {
        console.log('start seed for production');
        await this.createRoles();
        await this.createRoot();
        console.log('production data seeded');
    }
    async createRoles() {
        const userRole = [
            { name: users_role_enum_1.UsersRoles.Root },
            { name: users_role_enum_1.UsersRoles.User },
        ];
        await this.dataSource.manager.insert(user_role_entity_1.UserRole, userRole);
    }
    async createRoot() {
        const adminRole = await this.dataSource.manager.findOne(user_role_entity_1.UserRole, { where: { name: users_role_enum_1.UsersRoles.Root } });
        const data = {
            email: 'admin@admin.com',
            password: '123456',
            userRoleId: adminRole.id,
            isRoot: true
        };
        return await this.userRepo.Register(data);
    }
}
exports.ProductionSeeder = ProductionSeeder;
//# sourceMappingURL=production.seed.js.map