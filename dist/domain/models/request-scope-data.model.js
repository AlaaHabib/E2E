"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestScopeData = void 0;
const async_hooks_1 = require("async_hooks");
class RequestScopeData {
    constructor(id, email, role) {
        this.id = id;
        this.email = email;
        this.role = role;
    }
    static get currentContext() {
        return this.cls.getStore();
    }
}
exports.RequestScopeData = RequestScopeData;
RequestScopeData.cls = new async_hooks_1.AsyncLocalStorage();
//# sourceMappingURL=request-scope-data.model.js.map