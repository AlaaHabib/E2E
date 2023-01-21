import { DataSource } from 'typeorm';
export declare class ProductionSeeder {
    private readonly dataSource;
    private userRepo;
    constructor(dataSource: DataSource);
    seed(): Promise<void>;
    private createRoles;
    private createRoot;
}
