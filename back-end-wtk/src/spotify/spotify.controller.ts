import {
  Controller,
  Get,
  Query,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { SpotifyService } from './spotify.service';
import {
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
@ApiTags('Spotify')
@Controller('spotify')
export class SpotifyController {
  constructor(private readonly spotifyService: SpotifyService) {}

  @Get('tracks')
  @ApiOperation({
    summary: 'Fetch Multiple Tracks',
    description:
      'Fetches multiple tracks from Spotify based on provided track IDs.',
  })
  @ApiQuery({
    name: 'ids',
    type: String,
    required: true,
    description: 'Comma-separated list of Spotify track IDs',
  })
  @ApiResponse({ status: 200, description: 'List of tracks' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async fetchMultipleTracks(@Query('ids') trackIds: string) {
    try {
      return await this.spotifyService.fetchMultipleTracks(trackIds);
    } catch (error) {
      throw new HttpException(
        'Error fetching tracks',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('track/:id')
  @ApiOperation({
    summary: 'Fetch a Single Track',
    description:
      'Fetches a single track from Spotify based on its ID. If a user id is passed.',
  })
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
    description: 'Spotify track ID',
  })
  @ApiResponse({ status: 200, description: 'Track details' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async fetchTrack(@Param('id') trackId: string) {
    try {
      return await this.spotifyService.fetchTrack(trackId);
    } catch (error) {
      throw new HttpException(
        'Error fetching track',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('trackDetailed/:id')
  @ApiOperation({
    summary: 'Fetch a Single Track',
    description:
      'Fetches a single track from Spotify based on its ID, including the audio analysis, it will also note that the user has opened it for the history.',
  })
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
    description: 'Spotify track ID',
  })
  @ApiParam({
    name: 'userId',
    type: String,
    required: false,
    description: 'User ID',
  })
  @ApiResponse({ status: 200, description: 'Track details' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async fetchTrackDetailed(
    @Param('id') trackId: string,
    @Param('userId') userId: string,
  ) {
    try {
      return await this.spotifyService.fetchTrackDetailed(trackId, userId);
    } catch (error) {
      throw new HttpException(
        'Error fetching track',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('search')
  @ApiOperation({
    summary: 'Search Tracks',
    description: 'Searches for tracks in Spotify based on a query.',
  })
  @ApiQuery({
    name: 'query',
    type: String,
    required: true,
    description: 'Search query',
  })
  @ApiResponse({ status: 200, description: 'Search results' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async searchTracks(@Query('query') searchQuery: string) {
    try {
      return await this.spotifyService.searchTracks(searchQuery);
    } catch (error) {
      throw new HttpException(
        'Error fetching tracks',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('random-guitar-track')
  @ApiOperation({
    summary: 'Get Random Guitar Track',
    description: 'Fetches a random guitar track from Spotify.',
  })
  @ApiResponse({ status: 200, description: 'Random guitar track details' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async getRandomGuitarTrack() {
    try {
      return await this.spotifyService.getRandomGuitarTrack();
    } catch (error) {
      throw new HttpException(
        'Error fetching tracks',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('genres')
  @ApiOperation({
    summary: 'Get Genres',
    description: 'Fetches a list of music genres from Spotify.',
  })
  @ApiResponse({ status: 200, description: 'List of genres' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async getGenres() {
    try {
      return await this.spotifyService.getGenres();
    } catch (error) {
      throw new HttpException(
        'Error fetching tracks',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
