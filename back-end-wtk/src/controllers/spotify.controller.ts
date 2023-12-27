import { Controller, Get, Query, Param } from '@nestjs/common';
import { SpotifyService } from 'src/services/spotify.service';
@Controller('spotify')
export class SpotifyController {
  constructor(private readonly spotifyService: SpotifyService) {}

  @Get('tracks')
  async fetchMultipleTracks(@Query('ids') trackIds: string) {
    return await this.spotifyService.fetchMultipleTracks(trackIds);
  }

  @Get('track/:id')
  async fetchTrack(@Param('id') trackId: string) {
    return await this.spotifyService.fetchTrack(trackId);
  }

  @Get('search')
  async searchTracks(@Query('query') searchQuery: string) {
    return await this.spotifyService.searchTracks(searchQuery);
  }

  @Get('random-guitar-track')
  async getRandomGuitarTrack() {
    return await this.spotifyService.getRandomGuitarTrack();
  }

  @Get('genres')
  async getGenres() {
    return await this.spotifyService.getGenres();
  }
}
