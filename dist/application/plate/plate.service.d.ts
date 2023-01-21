import { UpdatePlateDto } from './../../domain/dtos/plate/update-plate.dto';
import { CreatePlateDto } from './../../domain/dtos/plate/create-plate.dto';
import { Plate } from './../../domain/entities/plate/plate.entity';
import { PlateRepository } from 'src/infrastructure/repositories/plate.repository';
import { ExchangePlateDto } from 'src/domain/dtos/plate';
export declare class PlateService {
    private repo;
    constructor(repo: PlateRepository);
    getAll(params: any, today?: boolean, query?: any): Promise<import("../../domain/interfaces").PaginationResult>;
    createPlate(dto: CreatePlateDto): Promise<{
        id: number;
        number: string;
        from: string;
        date: string;
        enterType: string;
        plateType: string;
        exchange: boolean;
        exchange_date: string;
        exchange_to: string;
        execution_committee: boolean;
    }>;
    flat(plate: Plate[]): Promise<{
        id: number;
        number: string;
        from: string;
        date: string;
        enterType: string;
        plateType: string;
        exchange: boolean;
        exchange_date: string;
        exchange_to: string;
        execution_committee: boolean;
    }[]>;
    updatePlate(id: any, data: UpdatePlateDto, role: any): Promise<void>;
    exchangePlateService(id: any, data: ExchangePlateDto): Promise<void>;
    unExchangePlateService(id: any, role: any): Promise<void>;
    deletePlate(id: any, role: any): Promise<import("typeorm").DeleteResult | import("typeorm").UpdateResult>;
    getPlateById(id: any): Promise<Plate>;
    getPlateNumbersByType(plateId: any): Promise<Plate[]>;
    private formatDate;
}
