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
exports.SpotifyController = void 0;
const common_1 = require("@nestjs/common");
const spotify_service_1 = require("./spotify.service");
const swagger_1 = require("@nestjs/swagger");
let SpotifyController = class SpotifyController {
    constructor(spotifyService) {
        this.spotifyService = spotifyService;
    }
    async fetchMultipleTracks(trackIds) {
        try {
            return await this.spotifyService.fetchMultipleTracks(trackIds);
        }
        catch (error) {
            throw new common_1.HttpException('Error fetching tracks', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async fetchTrack(trackId) {
        try {
            return await this.spotifyService.fetchTrack(trackId);
        }
        catch (error) {
            throw new common_1.HttpException('Error fetching track', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async fetchTrackDetailed(trackId) {
        try {
            return await this.spotifyService.fetchTrackDetailed(trackId);
        }
        catch (error) {
            throw new common_1.HttpException('Error fetching track', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async searchTracks(searchQuery) {
        try {
            return await this.spotifyService.searchTracks(searchQuery);
        }
        catch (error) {
            throw new common_1.HttpException('Error fetching tracks', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getRandomGuitarTrack() {
        try {
            return await this.spotifyService.getRandomGuitarTrack();
        }
        catch (error) {
            throw new common_1.HttpException('Error fetching tracks', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getGenres() {
        try {
            return await this.spotifyService.getGenres();
        }
        catch (error) {
            throw new common_1.HttpException('Error fetching tracks', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.SpotifyController = SpotifyController;
__decorate([
    (0, common_1.Get)('tracks'),
    (0, swagger_1.ApiOperation)({
        summary: 'Fetch Multiple Tracks',
        description: 'Fetches multiple tracks from Spotify based on provided track IDs.',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'ids',
        type: String,
        required: true,
        description: 'Comma-separated list of Spotify track IDs',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of tracks' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Internal server error' }),
    __param(0, (0, common_1.Query)('ids')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SpotifyController.prototype, "fetchMultipleTracks", null);
__decorate([
    (0, common_1.Get)('track/:id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Fetch a Single Track',
        description: 'Fetches a single track from Spotify based on its ID.',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        type: String,
        required: true,
        description: 'Spotify track ID',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Track details' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Internal server error' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SpotifyController.prototype, "fetchTrack", null);
__decorate([
    (0, common_1.Get)('trackDetailed/:id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Fetch a Single Track',
        description: 'Fetches a single track from Spotify based on its ID, including the audio analysis.',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        type: String,
        required: true,
        description: 'Spotify track ID',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Track details' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Internal server error' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SpotifyController.prototype, "fetchTrackDetailed", null);
__decorate([
    (0, common_1.Get)('search'),
    (0, swagger_1.ApiOperation)({
        summary: 'Search Tracks',
        description: 'Searches for tracks in Spotify based on a query.',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'query',
        type: String,
        required: true,
        description: 'Search query',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Search results' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Internal server error' }),
    __param(0, (0, common_1.Query)('query')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SpotifyController.prototype, "searchTracks", null);
__decorate([
    (0, common_1.Get)('random-guitar-track'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get Random Guitar Track',
        description: 'Fetches a random guitar track from Spotify.',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Random guitar track details' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Internal server error' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SpotifyController.prototype, "getRandomGuitarTrack", null);
__decorate([
    (0, common_1.Get)('genres'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get Genres',
        description: 'Fetches a list of music genres from Spotify.',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of genres' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Internal server error' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SpotifyController.prototype, "getGenres", null);
exports.SpotifyController = SpotifyController = __decorate([
    (0, swagger_1.ApiTags)('Spotify'),
    (0, common_1.Controller)('spotify'),
    __metadata("design:paramtypes", [spotify_service_1.SpotifyService])
], SpotifyController);
//# sourceMappingURL=spotify.controller.js.map