import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
export declare class SeedRunner {
    static run(dataSource: DataSource, configService: ConfigService): Promise<void>;
}
