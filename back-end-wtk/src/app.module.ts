import { Module } from '@nestjs/common';
import { AppController } from './app/app.controller';
import { AppService } from './app/app.service';
import { ConfigModule } from '@nestjs/config';
import { UserController } from './auth/auth.controller';
import { UserService } from './auth/user.service';
import { TrackService } from './tracks/track.service';
import { PrismaService } from './services/prisma.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { TrackController } from './tracks/tracks.controller';
import { SpotifyController } from './spotify/spotify.controller';
import { SpotifyService } from './spotify/spotify.service';

@Module({
  imports: [
    ConfigModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
  ],
  controllers: [
    AppController,
    UserController,
    TrackController,
    SpotifyController,
  ],
  providers: [
    AppService,
    UserService,
    TrackService,
    PrismaService,
    SpotifyService,
  ],
})
export class AppModule {}
