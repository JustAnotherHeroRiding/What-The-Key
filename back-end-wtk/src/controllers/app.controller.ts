import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { Track as TrackModel } from '@prisma/client';
import { TrackService } from '../services/track.service';

@Controller()
export class AppController {
  constructor(
    private readonly userService: UserService,
    private readonly trackService: TrackService,
  ) {}

  @Get('nest/api/track/:id')
  async getPostById(@Param('id') id: string): Promise<TrackModel> {
    return this.trackService.track({ id: id });
  }
}
