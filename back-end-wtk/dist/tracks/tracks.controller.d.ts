import { UserService } from '../auth/user.service';
import { TrackService } from './track.service';
import { Response } from 'express';
export declare class TrackController {
    private readonly userService;
    private readonly trackService;
    constructor(userService: UserService, trackService: TrackService);
    getTracks(userId: string, source: 'library' | 'recycleBin', response: Response): Promise<void>;
    addTrack(userId: string, trackId: string, source: 'library' | 'recycleBin', response: Response): Promise<void>;
    deleteTrack(userId: string, trackId: string, response: Response): Promise<void>;
    addTabs(trackId: string, userId: string, tabUrl: string, response: Response): Promise<void>;
    getTabs(trackId: string, userId: string, response: Response): Promise<void>;
}
