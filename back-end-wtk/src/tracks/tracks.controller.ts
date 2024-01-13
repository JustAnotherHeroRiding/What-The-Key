import {
  Controller,
  Post,
  Body,
  Res,
  HttpStatus,
  Get,
  Query,
  InternalServerErrorException,
} from '@nestjs/common';
import { UserService } from '../auth/user.service';
import { TrackService } from './track.service';
import { Response } from 'express';
import {
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AddTabsDto, AddTrackDto, DeleteTrackDto } from './dto';

@ApiTags('Track')
@Controller('track')
export class TrackController {
  constructor(
    private readonly userService: UserService,
    private readonly trackService: TrackService,
  ) {}

  @Get('getTracks')
  @ApiOperation({
    summary: 'Get Tracks',
    description:
      'Get tracks for a user from either the library or recycle bin.',
  })
  @ApiQuery({
    name: 'userId',
    type: String,
    required: true,
    description: 'User ID',
  })
  @ApiQuery({
    name: 'source',
    enum: ['library', 'recycleBin'],
    required: true,
    description: 'Source of the tracks',
  })
  @ApiResponse({ status: 200, description: 'List of tracks' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
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
  @ApiOperation({
    summary: 'Add Track',
    description: "Add a track to the user's library or recycle bin.",
  })
  @ApiBody({ type: AddTrackDto })
  @ApiResponse({ status: 200, description: 'Track added' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async addTrack(
    @Body('userId') userId: string,
    @Body('trackId') trackId: string,
    @Body('source') source: 'library' | 'recycleBin',
  ) {
    try {
      const track = await this.trackService.addTrackToUserLibraryOrBin(
        trackId,
        userId,
        source,
      );
      return track;
      //response.status(HttpStatus.OK).json(track);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Post('deleteTrack')
  @ApiOperation({
    summary: 'Delete Track',
    description: 'Permanently delete a track.',
  })
  @ApiBody({ type: DeleteTrackDto })
  @ApiResponse({ status: 200, description: 'Track deleted' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async deleteTrack(
    @Body('userId') userId: string,
    @Body('trackId') trackId: string,
  ) {
    try {
      const track = await this.trackService.deleteTrackPermanently(
        trackId,
        userId,
      );
      return track;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Post('addTabs')
  @ApiOperation({ summary: 'Add Tabs', description: 'Add tabs to a track.' })
  @ApiBody({ type: AddTabsDto })
  @ApiResponse({ status: 200, description: 'Tabs added to track' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
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
  @ApiOperation({
    summary: 'Get Tabs',
    description: 'Get tabs for a specific track.',
  })
  @ApiQuery({
    name: 'trackId',
    type: String,
    required: true,
    description: 'Track ID',
  })
  @ApiQuery({
    name: 'userId',
    type: String,
    required: true,
    description: 'User ID',
  })
  @ApiResponse({ status: 200, description: 'List of tabs for the track' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
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
