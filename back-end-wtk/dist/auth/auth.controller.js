"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const supabase_service_1 = require("../supabase.service");
let UserController = class UserController {
    async getSession(request) {
        const token = request.headers.authorization?.split(' ')[1];
        if (!token)
            throw new common_1.UnauthorizedException('No token provided');
        const { data: user, error } = await supabase_service_1.supabaseAdmin.auth.getUser(token);
        if (error) {
            throw new common_1.UnauthorizedException('Invalid token');
        }
        return user;
    }
    async getAllUsers() {
        const { data, error } = await supabase_service_1.supabaseAdmin.auth.admin.listUsers();
        if (error) {
            throw new common_1.UnauthorizedException('Invalid token');
        }
        return data;
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Get)('checkSession'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getSession", null);
__decorate([
    (0, common_1.Get)('getAllUsers'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getAllUsers", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('user')
], UserController);
//# sourceMappingURL=auth.controller.js.map