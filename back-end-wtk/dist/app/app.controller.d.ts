import { UserService } from '../auth/user.service';
import { TrackService } from '../tracks/track.service';
export declare class AppController {
    private readonly userService;
    private readonly trackService;
    constructor(userService: UserService, trackService: TrackService);
}
