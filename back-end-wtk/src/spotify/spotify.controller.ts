import {
  Controller,
  Get,
  Query,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { SpotifyService } from 'src/spotify/spotify.service';
@Controller('spotify')
export class SpotifyController {
  constructor(private readonly spotifyService: SpotifyService) {}

  @Get('tracks')
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

  @Get('search')
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
