import { Plate } from './../../domain/entities/plate/plate.entity';
import { DataSource } from 'typeorm';
import { CustomRepository } from 'src/domain/repository/CustomBaseRepository';
import { CreatePlateDto } from 'src/domain/dtos/plate';
export declare class PlateRepository extends CustomRepository<Plate> {
    private _dataSource;
    constructor(dataSource: DataSource);
    Register(dto: CreatePlateDto): Promise<Plate>;
    exchangePlate(id: any, data: any, role?: any): Promise<void>;
    cloneAndUpdate(plate: any, data: any): Promise<void>;
    customFindPlate(id: any): Promise<Plate[]>;
}
