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
exports.SpotifyService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
let SpotifyService = class SpotifyService {
    constructor() {
        this.clientId = process.env.SPOTIFY_CLIENT_ID;
        this.clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
        this.accessToken = null;
        this.tokenTimestamp = null;
        this.initToken();
    }
    async initToken() {
        try {
            const token = await this.getAuthToken();
            this.accessToken = token;
        }
        catch (error) {
            console.error('Error fetching Spotify token:', error);
        }
    }
    createHeaders() {
        return {
            Authorization: `Bearer ${this.accessToken}`,
            'Content-Type': 'application/json',
        };
    }
    isTokenValid() {
        const now = Date.now();
        return (this.accessToken &&
            this.tokenTimestamp &&
            now - this.tokenTimestamp < 3600000);
    }
    async getAuthToken() {
        const now = Date.now();
        if (this.isTokenValid()) {
            return this.accessToken;
        }
        try {
            const credentials = this.clientId + ':' + this.clientSecret;
            const encodedCredentials = Buffer.from(credentials).toString('base64');
            const response = await axios_1.default.post('https://accounts.spotify.com/api/token', 'grant_type=client_credentials', {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    Authorization: `Basic ${encodedCredentials}`,
                },
            });
            this.accessToken = response.data.access_token;
            this.tokenTimestamp = now;
            return this.accessToken;
        }
        catch (error) {
            console.error('Error fetching Spotify token:', error);
            if (error.response) {
                console.error('Response:', error.response.data);
            }
            throw error;
        }
    }
    async fetchMultipleTracks(trackIds) {
        await this.getAuthToken();
        const headers = this.createHeaders();
        const tracksResponse = await axios_1.default.get(`https://api.spotify.com/v1/tracks?ids=${trackIds}`, { headers });
        const audioFeaturesResponse = await axios_1.default.get(`https://api.spotify.com/v1/audio-features?ids=${trackIds}`, {
            headers,
        });
        const tracks = tracksResponse.data.tracks;
        const audioFeatures = audioFeaturesResponse.data.audio_features;
        return tracks.map((track, index) => ({
            track,
            audioFeatures: audioFeatures[index],
        }));
    }
    async fetchTrack(trackId) {
        await this.getAuthToken();
        const headers = this.createHeaders();
        const trackResponse = await axios_1.default.get(`https://api.spotify.com/v1/tracks/${trackId}`, { headers });
        const audioFeaturesResponse = await axios_1.default.get(`https://api.spotify.com/v1/audio-features/${trackId}`, { headers });
        return {
            track: trackResponse.data,
            audioFeatures: audioFeaturesResponse.data,
        };
    }
    async fetchTrackDetailed(trackId) {
        await this.getAuthToken();
        const headers = this.createHeaders();
        const trackResponse = await axios_1.default.get(`https://api.spotify.com/v1/tracks/${trackId}`, { headers });
        const audioFeaturesResponse = await axios_1.default.get(`https://api.spotify.com/v1/audio-analysis/${trackId}`, { headers });
        return {
            track: trackResponse.data,
            audioFeatures: audioFeaturesResponse.data,
        };
    }
    async searchTracks(searchQuery) {
        await this.getAuthToken();
        const headers = this.createHeaders();
        const params = new URLSearchParams({
            q: searchQuery,
            type: 'track',
            limit: '10',
        });
        const searchResponse = await axios_1.default.get(`https://api.spotify.com/v1/search?${params}`, { headers });
        return searchResponse.data;
    }
    async getRandomGuitarTrack() {
        await this.getAuthToken();
        const headers = this.createHeaders();
        const seedGenres = 'rock,blues,punk,post-punk,alt-rock';
        const url = `https://api.spotify.com/v1/recommendations?&seed_genres=${seedGenres}&limit=1`;
        const response = await axios_1.default.get(url, { headers });
        return response.data;
    }
    async getGenres() {
        await this.getAuthToken();
        const headers = this.createHeaders();
        const url = `https://api.spotify.com/v1/recommendations/available-genre-seeds`;
        const response = await axios_1.default.get(url, { headers });
        return response.data;
    }
};
exports.SpotifyService = SpotifyService;
exports.SpotifyService = SpotifyService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], SpotifyService);
//# sourceMappingURL=spotify.service.js.map