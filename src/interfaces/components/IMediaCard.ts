interface IMediaCard {
  title: string
  description: string
  thumbnail: string
  id: string
  onPlaylistId: (playlistId: string, name: string) => void
}

export default IMediaCard
