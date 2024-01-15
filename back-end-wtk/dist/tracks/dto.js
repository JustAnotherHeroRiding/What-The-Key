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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddTabsDto = exports.DeleteTrackDto = exports.AddTrackDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class AddTrackDto {
}
exports.AddTrackDto = AddTrackDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'user123', description: 'ID of the user' }),
    __metadata("design:type", String)
], AddTrackDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'track456', description: 'ID of the track' }),
    __metadata("design:type", String)
], AddTrackDto.prototype, "trackId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'library',
        enum: ['library', 'recycleBin'],
        description: 'Source of the track',
    }),
    __metadata("design:type", String)
], AddTrackDto.prototype, "source", void 0);
class DeleteTrackDto {
}
exports.DeleteTrackDto = DeleteTrackDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'user123', description: 'ID of the user' }),
    __metadata("design:type", String)
], DeleteTrackDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'track456', description: 'ID of the track' }),
    __metadata("design:type", String)
], DeleteTrackDto.prototype, "trackId", void 0);
class AddTabsDto {
}
exports.AddTabsDto = AddTabsDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'user123', description: 'ID of the user' }),
    __metadata("design:type", String)
], AddTabsDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'track456', description: 'ID of the track' }),
    __metadata("design:type", String)
], AddTabsDto.prototype, "trackId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'tabs.com/adayinthelife',
        description: 'ID of the tabs',
    }),
    __metadata("design:type", String)
], AddTabsDto.prototype, "tabsUrl", void 0);
//# sourceMappingURL=dto.js.map