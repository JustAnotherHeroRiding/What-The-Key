import { UserService } from '../auth/user.service';
import { TrackService } from './track.service';
export type RecentlyOpenedType = 'latest' | 'favorites';
export declare class TrackController {
    private readonly userService;
    private readonly trackService;
    constructor(userService: UserService, trackService: TrackService);
    getTracks(userId: string, source: 'library' | 'recycleBin'): Promise<string[]>;
    getTracksPage(userId: string, source: 'library' | 'recycleBin', cursor: string, pageSize: string): Promise<{
        tracks: string[];
        nextCursor: string;
    }>;
    getNumberOfTracks(userId: string, source: 'library' | 'recycleBin'): Promise<number>;
    addTrack(userId: string, trackId: string, source: 'library' | 'recycleBin'): Promise<{
        id: string;
        libraryUserId: number;
        recycleBinUserId: number;
    }>;
    deleteTrack(userId: string, trackId: string): Promise<import(".prisma/client").Prisma.BatchPayload>;
    getHistory(userId: string, type: RecentlyOpenedType): Promise<{
        id: string;
        libraryUserId: number;
        recycleBinUserId: number;
    }[] | {
        id: number;
        userId: number;
        trackId: string;
        openedAt: Date;
    }[]>;
    addToHistory(trackId: string, userId: string): Promise<{
        id: number;
        userId: number;
        trackId: string;
        openedAt: Date;
    }>;
    addTabs(trackId: string, userId: string, tabUrl: string): Promise<{
        id: number;
        userId: number;
        trackId: string;
        tabUrl: string;
    }>;
    getTabs(trackId: string, userId: string): Promise<{
        id: number;
        userId: number;
        trackId: string;
        tabUrl: string;
    }[]>;
    isTrackAdded(trackId: string, userId: string): Promise<{
        isInLibrary: boolean;
        isInRecycleBin: boolean;
    }>;
}
