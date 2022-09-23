import { Column, Entity, ManyToOne } from 'typeorm';
import { CategoriesEntity } from './categories.entity';
import { SpotifyBaseEntity } from './spotify-base.entity';

@Entity({ name: 'playlists' })
export class PlaylistsEntity extends SpotifyBaseEntity {
  @Column()
  description: string;

  @ManyToOne((type) => CategoriesEntity, (category) => category.playlists)
  category: CategoriesEntity;
}
