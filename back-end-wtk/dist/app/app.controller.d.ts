import { UserService } from '../auth/user.service';
import { Track as TrackModel } from '@prisma/client';
import { TrackService } from '../tracks/track.service';
export declare class AppController {
    private readonly userService;
    private readonly trackService;
    constructor(userService: UserService, trackService: TrackService);
    getPostById(id: string): Promise<TrackModel>;
    getHello(): string;
}
