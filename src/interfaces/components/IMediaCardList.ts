import { Track } from "react-native-track-player";

export interface IMediaCardList {
  image: string
  name: string
  artists: string
  onMediaCardClick: () => void
}
