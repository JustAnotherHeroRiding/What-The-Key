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
exports.TrackService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../services/prisma.service");
let TrackService = class TrackService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async ensureUserExists(profileId) {
        let user = await this.prisma.user.findUnique({
            where: { profileId: profileId },
        });
        if (!user) {
            user = await this.prisma.user.create({
                data: { profileId: profileId },
            });
        }
        return user;
    }
    async addTrackToUserLibraryOrBin(trackId, userId, source) {
        const user = await this.ensureUserExists(userId);
        if (!user) {
            throw new Error('User not found, track will not be added.');
        }
        let track = await this.prisma.track.findUnique({
            where: { id: trackId },
        });
        if (!track) {
            track = await this.prisma.track.create({
                data: {
                    id: trackId,
                },
            });
        }
        const data = {
            trackId: trackId,
            userId: user.id,
            addedAt: new Date(),
        };
        if (source === 'library') {
            await this.prisma.libraryTrack.create({ data });
            await this.prisma.recycleBinTrack.deleteMany({
                where: { trackId: trackId, userId: user.id },
            });
        }
        else if (source === 'recycleBin') {
            await this.prisma.recycleBinTrack.create({ data });
            await this.prisma.libraryTrack.deleteMany({
                where: { trackId: trackId, userId: user.id },
            });
        }
        else {
            throw new Error('Please use a valid source, library or recycleBin.');
        }
        return track;
    }
    async deleteTrackPermanently(trackId, userId) {
        const user = await this.ensureUserExists(userId);
        if (!user) {
            throw new Error('User not found, cannot delete track.');
        }
        const deletedTrack = await this.prisma.recycleBinTrack.deleteMany({
            where: { trackId: trackId, userId: user.id },
        });
        return deletedTrack;
    }
    async getUserTracks(userId, source) {
        const user = await this.ensureUserExists(userId);
        if (!user) {
            throw new Error('User not found, cannot fetch tracks.');
        }
        if (source === 'library') {
            return this.prisma.libraryTrack
                .findMany({
                where: { userId: user.id },
                include: { track: true },
                orderBy: { addedAt: 'desc' },
            })
                .then((results) => results.map((r) => r.track.id));
        }
        else if (source === 'recycleBin') {
            return this.prisma.recycleBinTrack
                .findMany({
                where: { userId: user.id },
                include: { track: true },
                orderBy: { addedAt: 'desc' },
            })
                .then((results) => results.map((r) => r.track.id));
        }
        else {
            throw new Error('Please provide the correct source(library of recycleBin).');
        }
    }
    async getTracksPage(userId, source, cursor, pageSize) {
        const user = await this.ensureUserExists(userId);
        console.log(source);
        if (!user) {
            throw new Error('User not found, cannot fetch tracks.');
        }
        const trackQuery = {
            where: {
                userId: user.id,
                addedAt: { lt: new Date(cursor) },
            },
            include: { track: true },
            orderBy: { addedAt: 'desc' },
            take: parseInt(pageSize),
        };
        let tracks;
        if (source === 'library') {
            tracks = await this.prisma.libraryTrack.findMany(trackQuery);
        }
        else if (source === 'recycleBin') {
            tracks = await this.prisma.recycleBinTrack.findMany(trackQuery);
        }
        let nextCursor;
        if (tracks.length > 0) {
            if (source === 'library') {
                nextCursor = tracks[tracks.length - 1].addedAt.toISOString();
            }
            else if (source === 'recycleBin') {
                nextCursor = tracks[tracks.length - 1].addedAt.toISOString();
            }
        }
        return { tracks: tracks.map((r) => r.trackId), nextCursor };
    }
    async getNumberOfTracks(userId, source) {
        const user = await this.ensureUserExists(userId);
        if (!user) {
            throw new Error('User not found, cannot fetch tracks.');
        }
        let numberOfTracks;
        if (source === 'library') {
            numberOfTracks = await this.prisma.libraryTrack.count({
                where: { userId: user.id },
            });
        }
        else if (source === 'recycleBin') {
            numberOfTracks = await this.prisma.recycleBinTrack.count({
                where: { userId: user.id },
            });
        }
        else {
            throw new Error('Please provide the correct source (library or recycleBin).');
        }
        return numberOfTracks;
    }
    async addTabToTrack(trackId, userId, tabUrl) {
        const user = await this.ensureUserExists(userId);
        if (!user) {
            throw new Error('User not found, cannot add tab.');
        }
        const existingTab = await this.prisma.trackTab.findFirst({
            where: {
                trackId: trackId,
                userId: user.id,
            },
        });
        if (existingTab) {
            return this.prisma.trackTab.update({
                where: {
                    id: existingTab.id,
                },
                data: {
                    tabUrl: tabUrl,
                },
            });
        }
        return this.prisma.trackTab.create({
            data: {
                trackId: trackId,
                userId: user.id,
                tabUrl: tabUrl,
            },
        });
    }
    async getTabsForTrack(trackId, userId) {
        const user = await this.ensureUserExists(userId);
        if (!user) {
            throw new Error('User not found, cannot get tab.');
        }
        return this.prisma.trackTab.findMany({
            where: {
                trackId: trackId,
                userId: user.id,
            },
        });
    }
    async isTrackAdded(trackId, userId) {
        const user = await this.ensureUserExists(userId);
        if (!user) {
            throw new Error('User not found, cannot check if track is added.');
        }
        const trackInLibrary = await this.prisma.libraryTrack.findUnique({
            where: {
                trackId_userId: {
                    trackId: trackId,
                    userId: user.id,
                },
            },
        });
        const trackInRecycleBin = await this.prisma.recycleBinTrack.findUnique({
            where: {
                trackId_userId: {
                    trackId: trackId,
                    userId: user.id,
                },
            },
        });
        return {
            isInLibrary: !!trackInLibrary,
            isInRecycleBin: !!trackInRecycleBin,
        };
    }
    async getOpenedTracksHistory(userId, type = 'latest', limit = 8) {
        const user = await this.ensureUserExists(userId);
        if (!user) {
            throw new Error('User not found, cannot get track history.');
        }
        if (type === 'latest') {
            const uniqueHistoryEntries = await this.prisma.$queryRaw `
    SELECT * FROM "UserTrackHistory"
    WHERE "id" IN (
    SELECT MAX("id") FROM "UserTrackHistory"
    WHERE "userId" = ${user.id}
    GROUP BY "trackId")
    ORDER BY "openedAt" DESC
    LIMIT ${limit};
  `;
            return uniqueHistoryEntries;
        }
        else if (type === 'favorites') {
            const favoriteTracks = await this.prisma.$queryRaw `
      SELECT "trackId", COUNT(*) as visit_count FROM "UserTrackHistory"
      WHERE "userId" = ${user.id}
      GROUP BY "trackId"
      ORDER BY visit_count DESC
      LIMIT ${limit}
    `;
            const convertedTracks = favoriteTracks.map((track) => ({
                ...track,
                visit_count: track.visit_count.toString(),
            }));
            return convertedTracks;
        }
        else {
            throw new Error('Invalid type provided.');
        }
    }
    async addTrackToHistory(trackId, userId) {
        const user = await this.ensureUserExists(userId);
        if (!user) {
            throw new Error('User not found, track will not be added.');
        }
        let track = await this.prisma.track.findUnique({
            where: { id: trackId },
        });
        if (!track) {
            track = await this.prisma.track.create({
                data: {
                    id: trackId,
                },
            });
        }
        const data = {
            trackId: trackId,
            userId: user.id,
        };
        const trackHistory = await this.prisma.userTrackHistory.create({ data });
        return trackHistory;
    }
};
exports.TrackService = TrackService;
exports.TrackService = TrackService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TrackService);
//# sourceMappingURL=track.service.js.map