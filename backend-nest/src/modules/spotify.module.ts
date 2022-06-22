import { Module } from '@nestjs/common';
import { SpotifyController } from '../controllers/spotify.controller';
import { SpotifyService } from '../services/spotify.service';
import { CatalogsPackage } from '../packages/spotify/catalogs.package';
import { Spotify } from '../packages/spotify/spotify.package';

@Module({
  imports: [CatalogsPackage],
  controllers: [SpotifyController],
  providers: [SpotifyService, Spotify],
})
export class SpotifyModule {}
