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
const swagger_1 = require("@nestjs/swagger");
const dto_1 = require("./dto");
let TrackController = class TrackController {
    constructor(userService, trackService) {
        this.userService = userService;
        this.trackService = trackService;
    }
    async getTracks(userId, source) {
        try {
            const tracks = await this.trackService.getUserTracks(userId, source);
            return tracks;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error.message);
        }
    }
    async addTrack(userId, trackId, source) {
        try {
            const track = await this.trackService.addTrackToUserLibraryOrBin(trackId, userId, source);
            return track;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error.message);
        }
    }
    async deleteTrack(userId, trackId) {
        try {
            const track = await this.trackService.deleteTrackPermanently(trackId, userId);
            return track;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error.message);
        }
    }
    async addTabs(trackId, userId, tabUrl) {
        try {
            const track = await this.trackService.addTabToTrack(trackId, userId, tabUrl);
            return track;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error.message);
        }
    }
    async addToHistory(trackId, userId) {
        try {
            const track = await this.trackService.addTrackToHistory(trackId, userId);
            return track;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error.message);
        }
    }
    async getTabs(trackId, userId) {
        try {
            const tabs = await this.trackService.getTabsForTrack(trackId, userId);
            return tabs;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error.message);
        }
    }
    async isTrackAdded(trackId, userId) {
        try {
            const isTrackAdded = await this.trackService.isTrackAdded(trackId, userId);
            return isTrackAdded;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error.message);
        }
    }
};
exports.TrackController = TrackController;
__decorate([
    (0, common_1.Get)('getTracks'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get Tracks',
        description: 'Get tracks for a user from either the library or recycle bin.',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'userId',
        type: String,
        required: true,
        description: 'User ID',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'source',
        enum: ['library', 'recycleBin'],
        required: true,
        description: 'Source of the tracks',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of tracks' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Internal server error' }),
    __param(0, (0, common_1.Query)('userId')),
    __param(1, (0, common_1.Query)('source')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], TrackController.prototype, "getTracks", null);
__decorate([
    (0, common_1.Post)('addTrack'),
    (0, swagger_1.ApiOperation)({
        summary: 'Add Track',
        description: "Add a track to the user's library or recycle bin.",
    }),
    (0, swagger_1.ApiBody)({ type: dto_1.AddTrackDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Track added' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Internal server error' }),
    __param(0, (0, common_1.Body)('userId')),
    __param(1, (0, common_1.Body)('trackId')),
    __param(2, (0, common_1.Body)('source')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], TrackController.prototype, "addTrack", null);
__decorate([
    (0, common_1.Post)('deleteTrack'),
    (0, swagger_1.ApiOperation)({
        summary: 'Delete Track',
        description: 'Permanently delete a track.',
    }),
    (0, swagger_1.ApiBody)({ type: dto_1.DeleteTrackDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Track deleted' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Internal server error' }),
    __param(0, (0, common_1.Body)('userId')),
    __param(1, (0, common_1.Body)('trackId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], TrackController.prototype, "deleteTrack", null);
__decorate([
    (0, common_1.Post)('addTabs'),
    (0, swagger_1.ApiOperation)({ summary: 'Add Tabs', description: 'Add tabs to a track.' }),
    (0, swagger_1.ApiBody)({ type: dto_1.AddTabsDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Tabs added to track' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Internal server error' }),
    __param(0, (0, common_1.Body)('trackId')),
    __param(1, (0, common_1.Body)('userId')),
    __param(2, (0, common_1.Body)('tabUrl')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], TrackController.prototype, "addTabs", null);
__decorate([
    (0, common_1.Post)('addHistory'),
    (0, swagger_1.ApiOperation)({
        summary: 'Add to History',
        description: 'Add a track to the opened tracks history.',
    }),
    (0, swagger_1.ApiBody)({ type: dto_1.AddToHistoryDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Track added to the history' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Internal server error' }),
    __param(0, (0, common_1.Body)('trackId')),
    __param(1, (0, common_1.Body)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], TrackController.prototype, "addToHistory", null);
__decorate([
    (0, common_1.Get)('getTabs'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get Tabs',
        description: 'Get tabs for a specific track.',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'trackId',
        type: String,
        required: true,
        description: 'Track ID',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'userId',
        type: String,
        required: true,
        description: 'User ID',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of tabs for the track' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Internal server error' }),
    __param(0, (0, common_1.Query)('trackId')),
    __param(1, (0, common_1.Query)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], TrackController.prototype, "getTabs", null);
__decorate([
    (0, common_1.Get)('isTrackAdded'),
    (0, swagger_1.ApiOperation)({
        summary: 'Is the Track added',
        description: 'Checks if the user added the track to his library or bin.',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'trackId',
        type: String,
        required: true,
        description: 'Track ID',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'userId',
        type: String,
        required: true,
        description: 'User ID',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'A boolean value showing if the track has been found or not',
    }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Internal server error' }),
    __param(0, (0, common_1.Query)('trackId')),
    __param(1, (0, common_1.Query)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], TrackController.prototype, "isTrackAdded", null);
exports.TrackController = TrackController = __decorate([
    (0, swagger_1.ApiTags)('Track'),
    (0, common_1.Controller)('track'),
    __metadata("design:paramtypes", [user_service_1.UserService,
        track_service_1.TrackService])
], TrackController);
//# sourceMappingURL=tracks.controller.js.map