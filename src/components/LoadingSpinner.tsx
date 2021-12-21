import React from 'react'
import { ActivityIndicator } from 'react-native'
import { styles } from './styled'
import { ILoadingSpinner } from '../interfaces/components/ILoadingSpinner.interface'

const LoadingSpinner: React.FC<ILoadingSpinner> = ({ show }) => {
  return (
    <React.Fragment>
      {show && (
        <ActivityIndicator
          style={styles.loadingSpinner_container}
          size="large"
        />
      )}
    </React.Fragment>
  )
}

export default LoadingSpinner
