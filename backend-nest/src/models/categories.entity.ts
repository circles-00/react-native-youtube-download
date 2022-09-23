import { Entity, OneToMany } from 'typeorm';
import { PlaylistsEntity } from './playlists.entity';
import { SpotifyBaseEntity } from './spotify-base.entity';

@Entity({ name: 'categories' })
export class CategoriesEntity extends SpotifyBaseEntity {
  @OneToMany((type) => PlaylistsEntity, (playlist) => playlist.category, {
    eager: true,
    cascade: true,
  })
  playlists: PlaylistsEntity[];
}
