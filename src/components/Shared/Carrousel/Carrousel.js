import React from 'react'
import { View } from 'react-native'
import { Image } from 'react-native-elements'
import CarouselSnap from 'react-native-snap-carousel'
import { styles } from './Carrousel.styles'

export function Carrousel(props) {
    const {arrayImages, width, height} = props
    const renderItem = ({item}) =>(
        <Image
            source={{ uri: item }}
            style={{ height, width }}
        />
    )
  return (
    <View style={styles.content}>
      <CarouselSnap
        layout='default'
        data={arrayImages}
        sliderWidth={width}
        itemWidth={width}
        renderItem={renderItem}
      />
    </View>
  )
}