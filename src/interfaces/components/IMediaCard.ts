interface IMediaCard {
  name: string,
  description: string,
  images: [
    {
      url: string
    }
  ],
  id: string,
  onPlaylistId: (playlistId: string, name: string) => void
}

export default IMediaCard