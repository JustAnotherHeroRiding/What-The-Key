import { Controller } from '@nestjs/common';
import { UserService } from '../auth/user.service';
import { TrackService } from '../tracks/track.service';

@Controller()
export class AppController {
  constructor(
    private readonly userService: UserService,
    private readonly trackService: TrackService,
  ) {}

  /*   @Get('nest/api/track/:id')
  async getPostById(@Param('id') id: string): Promise<TrackModel> {
    return this.trackService.track({ id: id });
  }

  @Get('hello')
  getHello(): string {
    return 'Hello World';
  } */
}
