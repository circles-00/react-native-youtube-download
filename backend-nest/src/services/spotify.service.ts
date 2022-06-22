import { Injectable } from '@nestjs/common';
import * as yt from 'youtube-search-without-api-key';
import { Spotify } from '../packages/spotify/spotify.package';

@Injectable()
export class SpotifyService {
  constructor(private readonly spotifyInstance: Spotify) {}

  async getCategories() {
    const categories = await this.spotifyInstance.catalogs.getCategories();
    categories.items = await Promise.all(
      categories.items.map(async (item: any) => {
        item.playlists =
          await this.spotifyInstance.catalogs.getCategoryPlaylists(item.id);
        return item;
      }),
    );
    return categories;
  }

  async getTracksForPlaylist(playlistId: string, hostName: string) {
    const tracks = await this.spotifyInstance.catalogs.getPlaylistTracks(
      playlistId,
    );

    if (!tracks) return [];

    return tracks.map((track: any) => {
      const songArtists = track.artists
        .map((artist: any) => artist.name)
        .join(', ');
      return {
        id: track.id,
        title: track.name,
        artist: songArtists,
        artwork: track.album.images[0].url,
        album: '',
        duration: track.duration_ms / 1000,
        url: `http://${hostName}/api/spotify/stream-song?songName=${track.name} - ${songArtists}`,
      };
    });
  }

  async getSongUrl(songName: string) {
    const songRes = await yt.search(songName);
    return (songRes[0] || {}).url;
  }
}
