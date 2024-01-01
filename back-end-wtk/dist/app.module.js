"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app/app.controller");
const app_service_1 = require("./app/app.service");
const config_1 = require("@nestjs/config");
const auth_controller_1 = require("./auth/auth.controller");
const user_service_1 = require("./auth/user.service");
const track_service_1 = require("./tracks/track.service");
const prisma_service_1 = require("./services/prisma.service");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
const tracks_controller_1 = require("./tracks/tracks.controller");
const spotify_controller_1 = require("./spotify/spotify.controller");
const spotify_service_1 = require("./spotify/spotify.service");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule,
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '..', 'public'),
            }),
        ],
        controllers: [
            app_controller_1.AppController,
            auth_controller_1.UserController,
            tracks_controller_1.TrackController,
            spotify_controller_1.SpotifyController,
        ],
        providers: [
            app_service_1.AppService,
            user_service_1.UserService,
            track_service_1.TrackService,
            prisma_service_1.PrismaService,
            spotify_service_1.SpotifyService,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map