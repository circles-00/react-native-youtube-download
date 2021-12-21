import React from 'react'
import { Text, View } from 'react-native'
import { styles } from './styled'
import IGreetingsHeading from '../../../../interfaces/components/IGreetingsHeading.interface'

const GreetingsHeading: React.FC<IGreetingsHeading> = ({ title, name }) => {
  return (
    <View style={styles.contentContainer}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.name}>{name}</Text>
    </View>
  )
}

export default GreetingsHeading
