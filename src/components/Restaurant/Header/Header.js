import React from 'react'
import { View } from 'react-native'
import { Rating, Text } from 'react-native-elements'
import { styles } from './Header.styles'

export function Header(props) {
  const {restaurant} = props
  return (
    <View style={styles.content}>
        <View style={styles.titleView}>
          <Text style={styles.name}>{restaurant.name}</Text>
          <Rating
            imageSize={20}
            readOnly
            startingValue={4}
          />
        </View>
        <Text style={styles.description}>{restaurant.description}</Text>
    </View>
  )
}