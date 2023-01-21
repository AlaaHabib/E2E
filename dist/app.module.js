"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const app_service_1 = require("./app.service");
const common_1 = require("@nestjs/common");
const winston = require("winston");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const typeorm_extension_1 = require("typeorm-extension");
const entities_1 = require("./domain/entities");
const helpers_1 = require("./domain/helpers");
const seed_runner_seed_1 = require("./infrastructure/database/seed-runner.seed");
const auth_module_1 = require("./api/auth/auth.module");
const request_context_middleware_1 = require("./domain/middlewares/request-context.middleware");
const nest_winston_1 = require("nest-winston");
const user_module_1 = require("./api/user/user.module");
let AppModule = class AppModule {
    configure(consumer) {
        consumer
            .apply(request_context_middleware_1.RequestContextMiddleware)
            .exclude({ path: 'auth', method: common_1.RequestMethod.ALL })
            .forRoutes('*');
    }
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            typeorm_2.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: async (configService) => {
                    const dataSourceBasicOptions = {
                        type: 'mysql',
                        host: configService.get('DATA_BASE_HOST'),
                        port: +configService.get('DATA_BASE_PORT'),
                        username: configService.get('DATA_BASE_USER_NAME'),
                        password: configService.get('DATA_BASE_PASSWORD'),
                        database: configService.get('DATA_BASE_NAME'),
                        entities: entities_1.entities,
                        logging: configService.get('NEST_ENV') != 'production' ? true : false,
                    };
                    (0, helpers_1.CustomLogger)('start database creation');
                    await (0, typeorm_extension_1.createDatabase)({
                        ifNotExist: true,
                        options: dataSourceBasicOptions,
                        synchronize: true,
                        initialDatabase: 'mysql',
                    });
                    (0, helpers_1.CustomLogger)('end database creation');
                    await seed_runner_seed_1.SeedRunner.run(new typeorm_1.DataSource(dataSourceBasicOptions), configService);
                    return Object.assign(Object.assign({}, dataSourceBasicOptions), { synchronize: true });
                },
            }),
            nest_winston_1.WinstonModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => {
                    const fileLogErrors = new winston.transports.File({
                        level: 'error',
                        filename: configService.get('File_Log_Errors_File_Name') || 'app.error.log',
                        dirname: configService.get('File_Log_Path') || './log',
                    });
                    const fileLogInfo = new winston.transports.File({
                        level: 'verbose',
                        filename: configService.get('File_Log_Info_File_Name') || 'app.log',
                        dirname: configService.get('File_Log_Path') || './log',
                    });
                    const consoleLog = new winston.transports.Console({
                        format: winston.format.simple(),
                    });
                    const transports = [fileLogErrors, fileLogInfo];
                    if (configService.get('NEST_ENV') != 'production')
                        transports.push(consoleLog);
                    return {
                        levels: winston.config.cli.levels,
                        exitOnError: false,
                        format: winston.format.combine(winston.format.timestamp(), winston.format.ms(), winston.format.json({ space: 2 })),
                        transports,
                    };
                },
            }),
            auth_module_1.AuthModule,
            user_module_1.UserModule,
        ],
        controllers: [],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map