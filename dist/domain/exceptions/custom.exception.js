"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomException = void 0;
class CustomException extends Error {
    constructor(error, friendlyMsg) {
        super(error.message);
        this.error = error;
        this.friendlyMsg = friendlyMsg;
        this.status = error['status'];
        this.typeError = error['type'];
    }
}
exports.CustomException = CustomException;
//# sourceMappingURL=custom.exception.js.map