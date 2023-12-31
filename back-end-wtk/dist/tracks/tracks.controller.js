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
exports.TrackController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../auth/user.service");
const track_service_1 = require("./track.service");
let TrackController = class TrackController {
    constructor(userService, trackService) {
        this.userService = userService;
        this.trackService = trackService;
    }
    async getTracks(userId, source, response) {
        try {
            const tracks = await this.trackService.getUserTracks(userId, source);
            response.status(common_1.HttpStatus.OK).json(tracks);
        }
        catch (error) {
            response
                .status(common_1.HttpStatus.INTERNAL_SERVER_ERROR)
                .json({ message: error.message });
        }
    }
    async addTrack(userId, trackId, source, response) {
        try {
            const track = await this.trackService.addTrackToUserLibraryOrBin(trackId, userId, source);
            response.status(common_1.HttpStatus.OK).json(track);
        }
        catch (error) {
            console.log(error);
            response
                .status(common_1.HttpStatus.INTERNAL_SERVER_ERROR)
                .json({ message: error.message });
        }
    }
    async deleteTrack(userId, trackId, response) {
        try {
            const track = await this.trackService.deleteTrackPermanently(trackId, userId);
            response.status(common_1.HttpStatus.OK).json(track);
        }
        catch (error) {
            response
                .status(common_1.HttpStatus.INTERNAL_SERVER_ERROR)
                .json({ message: error.message });
        }
    }
    async addTabs(trackId, userId, tabUrl, response) {
        try {
            const track = await this.trackService.addTabToTrack(trackId, userId, tabUrl);
            response.status(common_1.HttpStatus.OK).json(track);
        }
        catch (error) {
            response
                .status(common_1.HttpStatus.INTERNAL_SERVER_ERROR)
                .json({ message: error.message });
        }
    }
    async getTabs(trackId, userId, response) {
        try {
            const tabs = await this.trackService.getTabsForTrack(trackId, userId);
            response.status(common_1.HttpStatus.OK).json(tabs);
        }
        catch (error) {
            response
                .status(common_1.HttpStatus.INTERNAL_SERVER_ERROR)
                .json({ message: error.message });
        }
    }
};
exports.TrackController = TrackController;
__decorate([
    (0, common_1.Get)('getTracks'),
    __param(0, (0, common_1.Query)('userId')),
    __param(1, (0, common_1.Query)('source')),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], TrackController.prototype, "getTracks", null);
__decorate([
    (0, common_1.Post)('addTrack'),
    __param(0, (0, common_1.Body)('userId')),
    __param(1, (0, common_1.Body)('trackId')),
    __param(2, (0, common_1.Body)('source')),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Object]),
    __metadata("design:returntype", Promise)
], TrackController.prototype, "addTrack", null);
__decorate([
    (0, common_1.Post)('deleteTrack'),
    __param(0, (0, common_1.Body)('userId')),
    __param(1, (0, common_1.Body)('trackId')),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], TrackController.prototype, "deleteTrack", null);
__decorate([
    (0, common_1.Post)('addTabs'),
    __param(0, (0, common_1.Body)('trackId')),
    __param(1, (0, common_1.Body)('userId')),
    __param(2, (0, common_1.Body)('tabUrl')),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Object]),
    __metadata("design:returntype", Promise)
], TrackController.prototype, "addTabs", null);
__decorate([
    (0, common_1.Get)('getTabs'),
    __param(0, (0, common_1.Query)('trackId')),
    __param(1, (0, common_1.Query)('userId')),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], TrackController.prototype, "getTabs", null);
exports.TrackController = TrackController = __decorate([
    (0, common_1.Controller)('track'),
    __metadata("design:paramtypes", [user_service_1.UserService,
        track_service_1.TrackService])
], TrackController);
//# sourceMappingURL=tracks.controller.js.map