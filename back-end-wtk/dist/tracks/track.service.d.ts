import { PrismaService } from '../services/prisma.service';
import { Track, User, TrackTab } from '@prisma/client';
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
    deleteTrackPermanently(trackId: string, userId: string): Promise<void>;
    getUserTracks(userId: string, source: 'library' | 'recycleBin'): Promise<Track[]>;
    addTabToTrack(trackId: string, userId: string, tabUrl: string): Promise<TrackTab>;
    getTabsForTrack(trackId: string, userId: string): Promise<TrackTab[]>;
}
