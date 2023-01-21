"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeedRunner = void 0;
const helpers_1 = require("../../domain/helpers");
const production_seed_1 = require("./production.seed");
class SeedRunner {
    static async run(dataSource, configService) {
        (0, helpers_1.CustomLogger)('start seeding');
        await dataSource.initialize();
        let count = 0;
        const data = await dataSource.query('select Count(*) as count from users');
        (0, helpers_1.CustomLogger)({ data });
        count = data[0].count;
        (0, helpers_1.CustomLogger)({ count });
        if (count == 0) {
            const productionSeeder = new production_seed_1.ProductionSeeder(dataSource);
            (0, helpers_1.CustomLogger)('Production Seed');
            await productionSeeder.seed();
            if (process.env.NEST_ENV != 'production') {
            }
            dataSource.destroy();
        }
    }
}
exports.SeedRunner = SeedRunner;
//# sourceMappingURL=seed-runner.seed.js.map