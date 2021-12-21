import React from 'react'
import { View, Image, Text } from 'react-native'
import IMediaCard from '../../../../interfaces/components/IMediaCard'
import { styles } from './styled'

const MediaCard: React.FC<IMediaCard> = ({ heading, subHeading, imageUrl }) => {
  return (
    <View style={styles.mediaInfoContainer}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <View>
        <Text style={styles.heading}>{heading}</Text>
        <Text style={styles.subHeading}>{subHeading}</Text>
      </View>
    </View>
  )
}

export default MediaCard
