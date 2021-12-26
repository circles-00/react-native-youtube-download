interface IMediaCard {
  name: string,
  description: string,
  images: [
    {
      url: string
    }
  ],
  id: string,
  onPlaylistId: (playlistId: string) => void
}

export default IMediaCard