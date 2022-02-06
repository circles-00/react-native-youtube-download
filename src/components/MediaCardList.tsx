import React from 'react'
import { Image, View, Text, TouchableOpacity } from "react-native";
import { styles } from './styled'
import { IMediaCardList } from '../interfaces/components/IMediaCardList'

const MediaCardList: React.FC<IMediaCardList> = ({ image, name, artists, onMediaCardClick }) => {
  return (
    <TouchableOpacity style={styles.mediaCardListContainer} onPress={() => onMediaCardClick(name, image, artists)}>
      <Image source={{ uri: image }} style={styles.mediaCardListImage} />
      <View style={styles.mediaCardListInfo}>
        <Text style={styles.mediaCardListHeadingText}>{name}</Text>
        <Text style={styles.mediaCardListSubHeadingText}>{artists}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default MediaCardList
