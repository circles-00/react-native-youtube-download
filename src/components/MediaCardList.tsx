import React from 'react'
import { Image, View, Text } from 'react-native'
import { styles } from './styled'
import { IMediaCardList } from '../interfaces/components/IMediaCardList'

const MediaCardList: React.FC<IMediaCardList> = ({ image, name, artists }) => {
  return (
    <View style={styles.mediaCardListContainer}>
      <Image source={{ uri: image }} style={styles.mediaCardListImage} />
      <View style={styles.mediaCardListInfo}>
        <Text style={styles.mediaCardListHeadingText}>{name}</Text>
        <Text style={styles.mediaCardListSubHeadingText}>{artists}</Text>
      </View>
    </View>
  )
}

export default MediaCardList
