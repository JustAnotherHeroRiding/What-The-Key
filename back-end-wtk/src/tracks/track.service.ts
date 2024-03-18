import { Injectable } from '@nestjs/common';
import { PrismaService } from '../services/prisma.service';
import {
  Track,
  User,
  TrackTab,
  Prisma,
  UserTrackHistory,
} from '@prisma/client';

export interface TrackConnection {
  id: string;
  libraryUserId: number;
  recycleBinUserId: number;
}

@Injectable()
export class TrackService {
  constructor(private prisma: PrismaService) {}

  async ensureUserExists(profileId: string): Promise<User> {
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

  async addTrackToUserLibraryOrBin(
    trackId: string,
    userId: string,
    source: 'library' | 'recycleBin',
  ): Promise<Track> {
    const user = await this.ensureUserExists(userId);

    if (!user) {
      throw new Error('User not found, track will not be added.');
    }

    let track: TrackConnection = await this.prisma.track.findUnique({
      where: { id: trackId },
    });
    if (!track) {
      track = await this.prisma.track.create({
        data: {
          id: trackId,
          // You may need to provide other required fields for a new track
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
    } else if (source === 'recycleBin') {
      await this.prisma.recycleBinTrack.create({ data });
      await this.prisma.libraryTrack.deleteMany({
        where: { trackId: trackId, userId: user.id },
      });
    } else {
      throw new Error('Please use a valid source, library or recycleBin.');
    }

    return track;
  }

  async deleteTrackPermanently(
    trackId: string,
    userId: string,
  ): Promise<Prisma.BatchPayload> {
    const user = await this.ensureUserExists(userId);

    if (!user) {
      throw new Error('User not found, cannot delete track.');
    }

    const deletedTrack = await this.prisma.recycleBinTrack.deleteMany({
      where: { trackId: trackId, userId: user.id },
    });

    return deletedTrack;

    //If I want to delete the tab when the user removed the track.
    //It's nice that if a user adds the track again, the tab will remain.
    /* await this.prisma.trackTab.deleteMany({
      where: { trackId, userId: user.id },
    }); */
  }

  async getUserTracks(
    userId: string,
    source: 'library' | 'recycleBin',
  ): Promise<Track[]> {
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
        .then((results) => results.map((r) => r.track));
    } else if (source === 'recycleBin') {
      return this.prisma.recycleBinTrack
        .findMany({
          where: { userId: user.id },
          include: { track: true },
          orderBy: { addedAt: 'desc' },
        })
        .then((results) => results.map((r) => r.track));
    } else {
      throw new Error(
        'Please provide the correct source(library of recycleBin).',
      );
    }
  }

  async addTabToTrack(
    trackId: string,
    userId: string,
    tabUrl: string,
  ): Promise<TrackTab> {
    // Ensure user exists
    const user = await this.ensureUserExists(userId);
    if (!user) {
      throw new Error('User not found, cannot add tab.');
    }

    // Check if the tab entry already exists for the user and track
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

    // If the tab does not exist, create a new one
    return this.prisma.trackTab.create({
      data: {
        trackId: trackId,
        userId: user.id,
        tabUrl: tabUrl,
      },
    });
  }

  async getTabsForTrack(trackId: string, userId: string): Promise<TrackTab[]> {
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

  async isTrackAdded(
    trackId: string,
    userId: string,
  ): Promise<{ isInLibrary: boolean; isInRecycleBin: boolean }> {
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

  async getOpenedTracksHistory(userId: string): Promise<Track[]> {
    const user = await this.ensureUserExists(userId);

    if (!user) {
      throw new Error('User not found, cannot get track history.');
    }

    return this.prisma.userTrackHistory
      .findMany({
        where: {
          userId: user.id,
        },
        include: { track: true },
      })
      .then((results) => results.map((r) => r.track));
  }

  async addTrackToHistory(
    trackId: string,
    userId: string,
  ): Promise<UserTrackHistory> {
    const user = await this.ensureUserExists(userId);

    if (!user) {
      throw new Error('User not found, track will not be added.');
    }

    let track: TrackConnection = await this.prisma.track.findUnique({
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
}
