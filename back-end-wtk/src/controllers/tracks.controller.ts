import { Controller, Post, Query, Res, HttpStatus, Get } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { TrackService } from '../services/track.service';
import { Response } from 'express';

@Controller('track')
export class TrackController {
  constructor(
    private readonly userService: UserService,
    private readonly trackService: TrackService,
  ) {}

  @Get('getTracks')
  async getTracks(
    @Query('userId') userId: string,
    @Query('source') source: 'library' | 'recycleBin',
    @Res() response: Response,
  ) {
    try {
      const tracks = this.trackService.getUserTracks(userId, source);
      response.status(HttpStatus.OK).json(tracks);
    } catch (error) {
      response
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }

  @Post('addToLibrary')
  async addToLibrary(
    @Query('userId') userId: string,
    @Query('trackId') trackId: string,
    @Res() response: Response,
  ) {
    try {
      const track = await this.trackService.addTrackToUserLibrary(
        trackId,
        userId,
      );
      response.status(HttpStatus.OK).json(track);
    } catch (error) {
      response
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }
}
