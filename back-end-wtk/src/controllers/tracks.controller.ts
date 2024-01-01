/* import {
  Controller,
  Post,
  Body,
  Res,
  HttpStatus,
  Get,
  Query,
} from '@nestjs/common';
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
      const tracks = await this.trackService.getUserTracks(userId, source);
      response.status(HttpStatus.OK).json(tracks);
    } catch (error) {
      response
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }

  @Post('addTrack')
  async addTrack(
    @Body('userId') userId: string,
    @Body('trackId') trackId: string,
    @Body('source') source: 'library' | 'recycleBin',
    @Res() response: Response,
  ) {
    try {
      const track = await this.trackService.addTrackToUserLibraryOrBin(
        trackId,
        userId,
        source,
      );
      response.status(HttpStatus.OK).json(track);
    } catch (error) {
      console.log(error);
      response
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }

  @Post('deleteTrack')
  async deleteTrack(
    @Body('userId') userId: string,
    @Body('trackId') trackId: string,
    @Res() response: Response,
  ) {
    try {
      const track = await this.trackService.deleteTrackPermanently(
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

  @Post('addTabs')
  async addTabs(
    @Body('trackId') trackId: string,
    @Body('userId') userId: string,
    @Body('tabUrl') tabUrl: string,
    @Res() response: Response,
  ) {
    try {
      const track = await this.trackService.addTabToTrack(
        trackId,
        userId,
        tabUrl,
      );
      response.status(HttpStatus.OK).json(track);
    } catch (error) {
      response
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }

  @Get('getTabs')
  async getTabs(
    @Query('trackId') trackId: string,
    @Query('userId') userId: string,
    @Res() response: Response,
  ) {
    try {
      const tabs = await this.trackService.getTabsForTrack(trackId, userId);
      response.status(HttpStatus.OK).json(tabs);
    } catch (error) {
      response
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }
}
 */
