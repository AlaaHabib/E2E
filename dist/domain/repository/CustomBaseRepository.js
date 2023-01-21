"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomRepository = void 0;
class CustomRepository {
    constructor(repository) {
        this.repository = repository;
    }
    async DoTransaction(fn) {
        return await this.repository.manager.transaction(fn);
    }
    async findPagination(index, length, order, where, select, relations) {
        const result = await this.repository.findAndCount({
            relations,
            where,
            order,
            select,
            take: length,
            skip: (index - 1) * length,
        });
        return { count: result[1], data: result[0] };
    }
    async find(order, where, select, relations) {
        return await this.repository.find({
            relations,
            where,
            order,
            select,
        });
    }
    async findOne(options) {
        return await this.repository.findOne(options);
    }
    async findOneBy(where, select) {
        const res = await this.repository.find({
            where,
            select,
            take: 1,
        });
        return res[0];
    }
    async insert(entity) {
        return await this.repository.insert(entity);
    }
    async insertOrUpdateMany(entities, options) {
        return await this.repository.save(entities, options);
    }
    async archive(idOrIds) {
        return await this.repository.softDelete(idOrIds);
    }
    async delete(idOrIds) {
        return await this.repository.delete(idOrIds);
    }
    async restore(idOrIds) {
        return await this.repository.restore(idOrIds);
    }
    async update(idOrIds, partialEntity) {
        return await this.repository.update(idOrIds, partialEntity);
    }
    async countBy(where) {
        return await this.repository.countBy(where);
    }
    async save(entity) {
        return await this.repository.save(entity);
    }
    async merge(mergeIntoEntity, ...entityLikes) {
        return await this.repository.merge(mergeIntoEntity, ...entityLikes);
    }
}
exports.CustomRepository = CustomRepository;
//# sourceMappingURL=CustomBaseRepository.js.map