import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { ConfigModule } from '@nestjs/config';
import { UserController } from './controllers/auth.controller';
import { UserService } from './services/user.service';
import { TrackService } from './services/track.service';
import { PrismaService } from './services/prisma.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { TrackController } from './controllers/tracks.controller';
import { SpotifyController } from './controllers/spotify.controller';
import { SpotifyService } from './services/spotify.service';

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
