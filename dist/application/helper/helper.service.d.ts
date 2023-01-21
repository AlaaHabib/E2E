import { DataSource } from 'typeorm';
import { EnterType, PlateType } from 'src/domain/entities/plate';
export declare class HelperService {
    private _dataSource;
    constructor(dataSource: DataSource);
    getPlateType(): Promise<PlateType[]>;
    getEnterType(): Promise<EnterType[]>;
}
