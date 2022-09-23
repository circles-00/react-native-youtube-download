import { Module } from '@nestjs/common';
import { SpotifyController } from '../controllers/spotify.controller';
import { SpotifyService } from '../services/spotify.service';
import { CatalogsPackage } from '../packages/spotify/catalogs.package';
import { Spotify } from '../packages/spotify/spotify.package';
import { SpotifySyncService } from '../jobs/spotify-sync.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesEntity } from '../models/categories.entity';
import { PlaylistsEntity } from '../models/playlists.entity';

@Module({
  imports: [
    CatalogsPackage,
    TypeOrmModule.forFeature([CategoriesEntity, PlaylistsEntity]),
  ],
  controllers: [SpotifyController],
  providers: [SpotifyService, Spotify, SpotifySyncService],
})
export class SpotifyModule {}
