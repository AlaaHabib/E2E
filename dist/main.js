"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const helmet_1 = require("helmet");
const helpers_1 = require("./domain/helpers");
const nest_winston_1 = require("nest-winston");
const exception_handlers_1 = require("./application/exception.handlers");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableVersioning({
        type: common_1.VersioningType.URI,
    });
    const logger = app.get(nest_winston_1.WINSTON_MODULE_PROVIDER);
    app.useGlobalFilters(new exception_handlers_1.HttpExceptionFilter(logger));
    app.useGlobalFilters(new exception_handlers_1.TypeOrmExceptionFilter(logger));
    app.use((0, helmet_1.default)());
    if (process.env.NEST_ENV != 'production') {
        const config = new swagger_1.DocumentBuilder()
            .setTitle('Test App')
            .setDescription('The Test API description')
            .setVersion('1.0')
            .addTag('Test')
            .addBearerAuth({
            type: 'http',
            in: 'header',
            scheme: 'bearer',
            description: 'add user token to be authenticated',
            bearerFormat: 'JWT',
        }, 'JWT-auth')
            .setExternalDoc('swagger document', `http://[::1]:3000/api-json.json`)
            .build();
        const document = swagger_1.SwaggerModule.createDocument(app, config);
        swagger_1.SwaggerModule.setup('swagger', app, document);
        app.enableCors({
            origin: '*',
            allowedHeaders: '*',
            methods: '*',
        });
    }
    else {
        app.enableCors({
            origin: process.env.ORIGINS,
            allowedHeaders: '*',
            methods: '*',
        });
    }
    app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true }));
    await app.listen(+process.env.lISTEN_PORT | 3000);
    (0, helpers_1.CustomLogger)('NEST Environment Is:', `${process.env.NEST_ENV}`);
    console.info(`${await app.getUrl()}/swagger`);
}
bootstrap();
//# sourceMappingURL=main.js.map