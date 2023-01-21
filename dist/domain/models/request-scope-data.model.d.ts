/// <reference types="node" />
import { AsyncLocalStorage } from 'async_hooks';
export declare class RequestScopeData<TId = any, TEmail = string, TRole = string> {
    readonly id: TId;
    readonly email: TEmail;
    readonly role: TRole;
    static cls: AsyncLocalStorage<RequestScopeData<any, string, string>>;
    constructor(id: TId, email: TEmail, role: TRole);
    static get currentContext(): RequestScopeData<any, string, string>;
}
