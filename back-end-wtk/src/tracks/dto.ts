import { ApiProperty } from '@nestjs/swagger';

export class AddTrackDto {
  @ApiProperty({ example: 'user123', description: 'ID of the user' })
  userId: string;

  @ApiProperty({ example: 'track456', description: 'ID of the track' })
  trackId: string;

  @ApiProperty({
    example: 'library',
    enum: ['library', 'recycleBin'],
    description: 'Source of the track',
  })
  source: 'library' | 'recycleBin';
}

export class DeleteTrackDto {
  @ApiProperty({ example: 'user123', description: 'ID of the user' })
  userId: string;

  @ApiProperty({ example: 'track456', description: 'ID of the track' })
  trackId: string;
}

export class AddTabsDto {
  @ApiProperty({ example: 'user123', description: 'ID of the user' })
  userId: string;

  @ApiProperty({ example: 'track456', description: 'ID of the track' })
  trackId: string;

  @ApiProperty({ example: 'tabs789', description: 'ID of the tabs' })
  tabsId: string;
}
