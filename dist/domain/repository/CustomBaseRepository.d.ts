import { DeepPartial, EntityManager, FindOneOptions, FindOptionsOrder, FindOptionsRelations, FindOptionsSelect, FindOptionsWhere, InsertResult, Repository } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { PaginationResult } from '../interfaces/pagination.result.interface';
import { BaseRecord } from '../entities/base-tables';
export declare class CustomRepository<Entity extends BaseRecord> {
    private repository;
    constructor(repository: Repository<Entity>);
    DoTransaction<T>(fn: (entityManager: EntityManager) => Promise<T>): Promise<T>;
    findPagination(index: number, length: number, order: FindOptionsOrder<Entity>, where?: FindOptionsWhere<Entity> | FindOptionsWhere<Entity>[], select?: FindOptionsSelect<Entity>, relations?: FindOptionsRelations<Entity>): Promise<PaginationResult>;
    find(order?: FindOptionsOrder<Entity>, where?: FindOptionsWhere<Entity> | FindOptionsWhere<Entity>[], select?: FindOptionsSelect<Entity>, relations?: FindOptionsRelations<Entity>): Promise<Entity[]>;
    findOne(options: FindOneOptions<Entity>): Promise<Entity>;
    findOneBy(where?: FindOptionsWhere<Entity> | FindOptionsWhere<Entity>[], select?: FindOptionsSelect<Entity>): Promise<Entity>;
    insert(entity: QueryDeepPartialEntity<Entity> | QueryDeepPartialEntity<Entity>[]): Promise<InsertResult>;
    insertOrUpdateMany(entities: DeepPartial<Entity>[]): Promise<DeepPartial<Entity>[]>;
    archive(idOrIds: number | string[] | FindOptionsWhere<Entity>): Promise<import("typeorm").UpdateResult>;
    delete(idOrIds: number | string[] | FindOptionsWhere<Entity>): Promise<import("typeorm").DeleteResult>;
    restore(idOrIds: string | string[] | FindOptionsWhere<Entity>): Promise<import("typeorm").UpdateResult>;
    update(idOrIds: string | string[] | FindOptionsWhere<Entity>, partialEntity: QueryDeepPartialEntity<Entity>): Promise<import("typeorm").UpdateResult>;
    countBy(where?: FindOptionsWhere<Entity> | FindOptionsWhere<Entity>[]): Promise<number>;
    save(entity: DeepPartial<Entity>): Promise<DeepPartial<Entity> & Entity>;
    merge(mergeIntoEntity: Entity, ...entityLikes: DeepPartial<Entity>[]): Promise<Entity>;
}
