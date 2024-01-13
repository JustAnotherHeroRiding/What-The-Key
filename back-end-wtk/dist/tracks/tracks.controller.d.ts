import { UserService } from '../auth/user.service';
import { TrackService } from './track.service';
import { Response } from 'express';
export declare class TrackController {
    private readonly userService;
    private readonly trackService;
    constructor(userService: UserService, trackService: TrackService);
    getTracks(userId: string, source: 'library' | 'recycleBin'): Promise<{
        id: string;
        libraryUserId: number;
        recycleBinUserId: number;
    }[]>;
    addTrack(userId: string, trackId: string, source: 'library' | 'recycleBin'): Promise<{
        id: string;
        libraryUserId: number;
        recycleBinUserId: number;
    }>;
    deleteTrack(userId: string, trackId: string): Promise<import(".prisma/client").Prisma.BatchPayload>;
    addTabs(trackId: string, userId: string, tabUrl: string, response: Response): Promise<void>;
    getTabs(trackId: string, userId: string, response: Response): Promise<void>;
}
