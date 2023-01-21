"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomLogger = void 0;
function CustomLogger(...args) {
    const isDevelopment = `${process.env.NEST_ENV}` === 'development';
    if (isDevelopment) {
        console.log('--------------------- [ Development Logger ] -------------------------');
        console.log(...args);
        console.log('----------------------------------------------------------------------');
    }
}
exports.CustomLogger = CustomLogger;
//# sourceMappingURL=customLogger.js.map