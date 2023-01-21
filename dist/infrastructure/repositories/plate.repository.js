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
exports.PlateRepository = void 0;
const helpers_1 = require("../../domain/helpers");
const plate_type_entity_1 = require("./../../domain/entities/plate/plate-type.entity");
const plate_entity_1 = require("./../../domain/entities/plate/plate.entity");
const typeorm_1 = require("typeorm");
const common_1 = require("@nestjs/common");
const CustomBaseRepository_1 = require("../../domain/repository/CustomBaseRepository");
const plate_1 = require("../../domain/entities/plate");
const exceptions_1 = require("@nestjs/common/exceptions");
const custom_exception_1 = require("../../domain/exceptions/custom.exception");
const enums_1 = require("../../domain/entities/enums");
const moment = require("moment");
let PlateRepository = class PlateRepository extends CustomBaseRepository_1.CustomRepository {
    constructor(dataSource) {
        super(dataSource.getRepository(plate_entity_1.Plate));
        this._dataSource = dataSource;
    }
    async Register(dto) {
        const { date, number, enterTypeId, from, plateTypeId, receiver_name } = dto;
        const plateType = await this._dataSource
            .getRepository(plate_type_entity_1.PlateType)
            .findOneBy({ id: plateTypeId });
        const enterType = await this._dataSource
            .getRepository(plate_1.EnterType)
            .findOneBy({ id: enterTypeId });
        if (!plateType || !enterType)
            throw new custom_exception_1.CustomException(new Error(), 'In valid Id for type or enter');
        const plate = new plate_entity_1.Plate();
        await this._dataSource.transaction(async (em) => {
            Object.assign(plate, {
                createdAt: new Date(),
                date,
                number,
                from,
                receiver_name,
                plateType,
                enterType,
            });
            return await em.save(plate_entity_1.Plate, plate);
        });
        return plate;
    }
    async exchangePlate(id, data, role) {
        const plate = await this.customFindPlate(id);
        if (!data.exchange) {
            if (role == enums_1.UsersRoles.User) {
                if (plate[0].exchange_date != moment(new Date()).format('YYYY-MM-DD'))
                    throw new custom_exception_1.CustomException(new Error(), 'ليس لديك الصالحية للتعديل');
            }
        }
        return await this.cloneAndUpdate(plate, data);
    }
    async cloneAndUpdate(plate, data) {
        this._dataSource.transaction(async (em) => {
            var _a, _b, _c, _d;
            const clonePlate = new plate_entity_1.Plate();
            Object.assign(clonePlate, {
                date: plate[0].date,
                number: plate[0].number,
                from: plate[0].from,
                receiver_name: plate[0].receiver_name,
                plateType: plate[0].plateType,
                enterType: plate[0].enterType,
                version: plate[0].version,
                parent: { id: plate[0].id },
                exchange: (_a = plate[0]) === null || _a === void 0 ? void 0 : _a.exchange,
                exchange_date: (_b = plate[0]) === null || _b === void 0 ? void 0 : _b.exchange_date,
                exchange_to: (_c = plate[0]) === null || _c === void 0 ? void 0 : _c.exchange_to,
                execution_committee: (_d = plate[0]) === null || _d === void 0 ? void 0 : _d.execution_committee,
            });
            Object.assign(plate[0], Object.assign(Object.assign({}, data), { version: plate[0].version + 1 }));
            await em.save(plate_entity_1.Plate, plate[0]);
            (0, helpers_1.CustomLogger)({ plate });
            (0, helpers_1.CustomLogger)({ clonePlate });
            return await em.save(plate_entity_1.Plate, clonePlate);
        });
    }
    async customFindPlate(id) {
        const plate = await this.find(null, { id, parent: (0, typeorm_1.IsNull)() }, {
            id: true,
            number: true,
            from: true,
            receiver_name: true,
            plateType: { id: true, name: true },
            enterType: { id: true, name: true },
            version: true,
            date: true,
            exchange: true,
            exchange_date: true,
            exchange_to: true,
            execution_committee: true,
        }, { enterType: true, plateType: true });
        if (plate.length == 0)
            throw new exceptions_1.NotFoundException('Not Found Plate');
        return plate;
    }
};
PlateRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], PlateRepository);
exports.PlateRepository = PlateRepository;
//# sourceMappingURL=plate.repository.js.map