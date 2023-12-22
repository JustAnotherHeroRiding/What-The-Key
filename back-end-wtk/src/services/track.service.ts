import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Track, Prisma, User } from '@prisma/client';

@Injectable()
export class TrackService {
  constructor(private prisma: PrismaService) {}

  async track(
    trackWhereUniqueInput: Prisma.TrackWhereUniqueInput,
  ): Promise<Track | null> {
    return this.prisma.track.findUnique({
      where: trackWhereUniqueInput,
    });
  }

  async tracks(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.TrackWhereUniqueInput;
    where?: Prisma.TrackWhereInput;
    orderBy?: Prisma.TrackOrderByWithRelationInput;
  }): Promise<Track[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.track.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createTrack(data: Prisma.TrackCreateInput): Promise<Track> {
    return this.prisma.track.create({
      data,
    });
  }

  async updateTrack(params: {
    where: Prisma.TrackWhereUniqueInput;
    data: Prisma.TrackUpdateInput;
  }): Promise<Track> {
    const { data, where } = params;
    return this.prisma.track.update({
      data,
      where,
    });
  }

  async deleteTrack(where: Prisma.TrackWhereUniqueInput): Promise<Track> {
    return this.prisma.track.delete({
      where,
    });
  }

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

  async addTrackToUserLibrary(
    trackId: string,
    profileId: string,
  ): Promise<Track> {
    // Ensure the user exists
    const user = await this.ensureUserExists(profileId);

    if (!user) {
      throw new Error('User not found, track will not be added.');
    }

    // Proceed to add or update the track with the local user ID
    return this.prisma.track.upsert({
      where: { id: trackId },
      update: {
        UserLibrary: {
          connect: { id: user.id },
        },
      },
      create: {
        id: trackId,
        UserLibrary: {
          connect: { id: user.id },
        },
      },
    });
  }

  async getUserTracks(
    userId: string,
    source: 'library' | 'recycleBin',
  ): Promise<Track[]> {
    const user = await this.ensureUserExists(userId);

    if (!user) {
      throw new Error('User not found, track will not be added.');
    }
    if (source === 'library') {
      return this.prisma.track.findMany({
        where: {
          libraryUserId: user.id,
        },
      });
    } else if (source === 'recycleBin') {
      return this.prisma.track.findMany({
        where: {
          recycleBinUserId: user.id,
        },
      });
    } else {
      throw new Error('Invalid source parameter');
    }
  }
}
