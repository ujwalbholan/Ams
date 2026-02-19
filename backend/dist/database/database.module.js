"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseModule = void 0;
const dotenv_1 = require("dotenv");
const common_1 = require("@nestjs/common");
const serverless_1 = require("@neondatabase/serverless");
(0, dotenv_1.config)({
    path: ['.env'],
});
const sql = (0, serverless_1.neon)(process.env.DATABASE_URL);
const dbProvider = {
    provide: 'POSTGRES_POOL',
    useValue: sql,
};
let DatabaseModule = class DatabaseModule {
};
exports.DatabaseModule = DatabaseModule;
exports.DatabaseModule = DatabaseModule = __decorate([
    (0, common_1.Module)({
        providers: [dbProvider],
        exports: [dbProvider],
    })
], DatabaseModule);
//# sourceMappingURL=database.module.js.map