import { PrismaService } from '../services/prisma.service';
import { Track, Prisma, User, TrackTab } from '@prisma/client';
export declare class TrackService {
    private prisma;
    constructor(prisma: PrismaService);
    track(trackWhereUniqueInput: Prisma.TrackWhereUniqueInput): Promise<Track | null>;
    tracks(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.TrackWhereUniqueInput;
        where?: Prisma.TrackWhereInput;
        orderBy?: Prisma.TrackOrderByWithRelationInput;
    }): Promise<Track[]>;
    createTrack(data: Prisma.TrackCreateInput): Promise<Track>;
    updateTrack(params: {
        where: Prisma.TrackWhereUniqueInput;
        data: Prisma.TrackUpdateInput;
    }): Promise<Track>;
    ensureUserExists(profileId: string): Promise<User>;
    addTrackToUserLibraryOrBin(trackId: string, userId: string, source: 'library' | 'recycleBin'): Promise<Track>;
    deleteTrackPermanently(trackId: string, userId: string): Promise<void>;
    getUserTracks(userId: string, source: 'library' | 'recycleBin'): Promise<Track[]>;
    addTabToTrack(trackId: string, userId: string, tabUrl: string): Promise<TrackTab>;
    getTabsForTrack(trackId: string, userId: string): Promise<TrackTab[]>;
}
