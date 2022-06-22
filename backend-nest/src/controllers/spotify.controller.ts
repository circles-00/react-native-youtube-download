import {
  Controller,
  Get,
  Logger,
  Request,
  Response,
  UseGuards,
} from '@nestjs/common';
import { SpotifyService } from '../services/spotify.service';
import * as ffmpeg from 'fluent-ffmpeg';
import * as ytdl from 'ytdl-core';
import * as Chunker from 'stream-chunker';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('spotify')
@UseGuards(JwtAuthGuard)
export class SpotifyController {
  private readonly logger: Logger;
  constructor(private readonly spotifyService: SpotifyService) {}

  @Get('categories')
  async getCategories() {
    return await this.spotifyService.getCategories();
  }

  @Get('playlist/tracks')
  async getTracksForPlaylist(@Request() req) {
    const { playlistId } = req.query;

    return await this.spotifyService.getTracksForPlaylist(
      playlistId as string,
      req.headers.host as string,
    );
  }

  @Get('/stream-song')
  async streamSong(@Request() req, @Response() res) {
    const { remoteAddress: clientIp } = req.socket;
    const { songName } = req.query;
    const songUrl = await this.spotifyService.getSongUrl(songName as string);

    // Audio format header (OPTIONAL)
    res.set({ 'Content-Type': 'audio/mp3', 'accept-ranges': 'bytes' });

    // Chunk data
    const chunker = Chunker(16);

    chunker.on('data', (chunk: any) => {
      res.write(chunk);
    });

    chunker.on('error', () =>
      this.logger.log(`Stream from client with IP ${clientIp} closed`),
    );

    chunker.on('end', () => {
      res.end();
    });

    // Send compressed audio mp3 data
    ffmpeg().input(ytdl(songUrl)).toFormat('mp3').pipe(chunker);
  }
}
