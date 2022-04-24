import React, { useState } from 'react'
import { View } from 'react-native'
import { Image } from 'react-native-elements'
import CarouselSnap, { Pagination } from 'react-native-snap-carousel'
import { styles } from './Carrousel.styles'

export function Carrousel(props) {
    const {arrayImages, width, height, hideDots} = props
    const [activeDotImage, setActiveDotImage] = useState(0)
    const renderItem = ({item}) =>(
        <Image
            source={{ uri: item }}
            style={{ height, width }}
        />
    )
    
    const pagination = () =>{
        return (
            <Pagination
                containerStyle={styles.dotContainer}
                dotStyle={styles.dot}
                dotsLength={arrayImages.length}
                activeDotIndex={activeDotImage}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
            />
        )
    }
  return (
    <View style={styles.content}>
      <CarouselSnap
        layout='default'
        data={arrayImages}
        sliderWidth={width}
        itemWidth={width}
        renderItem={renderItem}
        onSnapToItem={(index) =>  setActiveDotImage(index) }
      />
      {!hideDots && pagination()}
    </View>
  )
}