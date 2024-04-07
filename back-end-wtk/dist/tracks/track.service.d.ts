import { PrismaService } from '../services/prisma.service';
import { Track, User, TrackTab, Prisma, UserTrackHistory } from '@prisma/client';
import { RecentlyOpenedType } from './tracks.controller';
export interface TrackConnection {
    id: string;
    libraryUserId: number;
    recycleBinUserId: number;
}
export declare class TrackService {
    private prisma;
    constructor(prisma: PrismaService);
    ensureUserExists(profileId: string): Promise<User>;
    addTrackToUserLibraryOrBin(trackId: string, userId: string, source: 'library' | 'recycleBin'): Promise<Track>;
    deleteTrackPermanently(trackId: string, userId: string): Promise<Prisma.BatchPayload>;
    getUserTracks(userId: string, source: 'library' | 'recycleBin'): Promise<string[]>;
    getTracksPage(userId: string, source: 'library' | 'recycleBin', cursor: string, pageSize: string): Promise<{
        tracks: string[];
        nextCursor?: string;
    }>;
    getNumberOfTracks(userId: string, source: 'library' | 'recycleBin'): Promise<number>;
    addTabToTrack(trackId: string, userId: string, tabUrl: string): Promise<TrackTab>;
    getTabsForTrack(trackId: string, userId: string): Promise<TrackTab[]>;
    isTrackAdded(trackId: string, userId: string): Promise<{
        isInLibrary: boolean;
        isInRecycleBin: boolean;
    }>;
    getOpenedTracksHistory(userId: string, type?: RecentlyOpenedType, limit?: number): Promise<Track[] | UserTrackHistory[]>;
    addTrackToHistory(trackId: string, userId: string): Promise<UserTrackHistory>;
}
