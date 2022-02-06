export interface IMediaCardList {
  image: string
  name: string
  artists: string
  onMediaCardClick: (name: string, image: string, artists: string) => void
}
