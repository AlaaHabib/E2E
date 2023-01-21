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
exports.PlateService = void 0;
const common_1 = require("@nestjs/common");
const plate_repository_1 = require("../../infrastructure/repositories/plate.repository");
const typeorm_1 = require("typeorm");
const moment = require("moment");
const custom_exception_1 = require("../../domain/exceptions/custom.exception");
const enums_1 = require("../../domain/entities/enums");
const customLogger_1 = require("../../domain/helpers/customLogger");
let PlateService = class PlateService {
    constructor(repo) {
        this.repo = repo;
    }
    async getAll(params, today = false, query) {
        const pageIndex = Number(params.index);
        let limit = Number(params.size);
        if (limit < 1 || pageIndex < 1)
            throw new common_1.BadRequestException('Enter valid data');
        let filter;
        const todayDate = moment(new Date()).format('YYYY-MM-DD');
        if (today)
            filter = {
                date: todayDate,
                parent: (0, typeorm_1.IsNull)(),
            };
        else {
            const likeParam = ['number', 'from', 'receiver'];
            const relationParam = ['plateType', 'enterType'];
            for (const [key, value] of Object.entries(query)) {
                if (likeParam.includes(key))
                    query[key] = (0, typeorm_1.Like)(`%${value}%`);
                if (relationParam.includes(key))
                    query[key] = JSON.parse(`{ "id": "${value}" }`);
            }
            query['parent'] = (0, typeorm_1.IsNull)();
            if (!query['date_from'] && query['date_to']) {
                query['date_from'] = query['date_to'];
            }
            if (query['date_from'] && !query['date_to']) {
                query['date_to'] = query['date_from'];
            }
            if (query['date_from'] && query['date_to']) {
                query['date_from'] = await this.formatDate(query['date_from']);
                query['date_to'] = await this.formatDate(query['date_to']);
                if (moment(query['date_from']).isAfter(query['date_to']))
                    throw new custom_exception_1.CustomException(new Error(), 'يرجى ادخال الفترة صحيحة');
                query['date'] = (0, typeorm_1.Between)(query['date_from'], query['date_to']);
                delete query['date_from'];
                delete query['date_to'];
            }
            filter = query;
        }
        (0, customLogger_1.CustomLogger)('query', Object.assign({}, query));
        let plates = await this.repo.findPagination(pageIndex, limit, { id: 'DESC' }, filter, {
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
        plates.data = await this.flat(plates.data);
        return plates;
    }
    async createPlate(dto) {
        var _a, _b;
        let data;
        try {
            data = await this.repo.Register(dto);
        }
        catch (error) {
            if (((_a = error === null || error === void 0 ? void 0 : error.driverError) === null || _a === void 0 ? void 0 : _a.errno) == '1062') {
                throw new custom_exception_1.CustomException(error, 'This plate already exists');
            }
            else {
                throw new common_1.BadRequestException((_b = error === null || error === void 0 ? void 0 : error.driverError) === null || _b === void 0 ? void 0 : _b.sqlMessage);
            }
        }
        const flat = await this.flat([data]);
        return flat[0];
    }
    async flat(plate) {
        const data = plate === null || plate === void 0 ? void 0 : plate.map(({ id, number, from, date, enterType, plateType, exchange, exchange_date, exchange_to, execution_committee, }) => ({
            id,
            number,
            from,
            date: moment(date).format('DD-MM-YYYY'),
            enterType: enterType.name,
            plateType: plateType.name,
            exchange,
            exchange_date: exchange_date && moment(exchange_date).format('DD-MM-YYYY'),
            exchange_to,
            execution_committee,
        }));
        return data;
    }
    async updatePlate(id, data, role) {
        const plate = await this.repo.customFindPlate(id);
        if (role == enums_1.UsersRoles.User) {
            if (plate[0].exchange) {
                if (plate[0].exchange_date != moment(new Date()).format('YYYY-MM-DD'))
                    throw new custom_exception_1.CustomException(new Error(), 'ليس لديك الصالحية للتعديل');
            }
            else {
                if (plate[0].date != moment(new Date()).format('YYYY-MM-DD'))
                    throw new custom_exception_1.CustomException(new Error(), 'ليس لديك الصالحية للتعديل');
            }
        }
        if (plate[0].exchange && ((data === null || data === void 0 ? void 0 : data.number) || (data === null || data === void 0 ? void 0 : data.plateTypeId)))
            throw new custom_exception_1.CustomException(new Error(), 'لا يمكن تعديل رقم اللوحة او نوع الترخيص على لوجة تم صرفها');
        return await this.repo.cloneAndUpdate(plate, data);
    }
    async exchangePlateService(id, data) {
        return await this.repo.exchangePlate(id, {
            exchange: true,
            exchange_date: data.exchange_date,
            exchange_to: data.exchange_to,
            execution_committee: data === null || data === void 0 ? void 0 : data.execution_committee,
        });
    }
    async unExchangePlateService(id, role) {
        return await this.repo.exchangePlate(id, {
            exchange: false,
            exchange_date: null,
        }, role);
    }
    async deletePlate(id, role) {
        const plate = await this.repo.customFindPlate(id);
        if (plate[0].exchange)
            throw new custom_exception_1.CustomException(new Error(), 'لا يمكنك حذف لوحة مصروفة');
        if (role == enums_1.UsersRoles.User) {
            if (plate[0].date != moment(new Date()).format('YYYY-MM-DD'))
                throw new custom_exception_1.CustomException(new Error(), 'ليس لديك الصالحية للتعديل');
        }
        if (plate[0].date == moment(new Date()).format('YYYY-MM-DD')) {
            return await this.repo.delete(plate[0].id);
        }
        else {
            return await this.repo.archive(plate[0].id);
        }
    }
    async getPlateById(id) {
        const plate = await this.repo.findOneBy({ id });
        if (plate)
            return plate;
        throw new common_1.NotFoundException('Plate Not found');
    }
    async getPlateNumbersByType(plateId) {
        return await this.repo.find({}, { plateType: { id: plateId }, parent: (0, typeorm_1.IsNull)(), exchange: false }, { number: true }, {});
    }
    async formatDate(date) {
        let newdate = new Date(date);
        if (!(newdate instanceof Date && !isNaN(newdate))) {
            newdate = date.split('-').reverse().join('-');
            return newdate;
        }
        return date;
    }
};
PlateService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [plate_repository_1.PlateRepository])
], PlateService);
exports.PlateService = PlateService;
//# sourceMappingURL=plate.service.js.map