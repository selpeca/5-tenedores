import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import { Icon, Image, Text } from 'react-native-elements'
import { screen, db } from '../../../utils'
import { doc, deleteDoc } from 'firebase/firestore'
import Toast from 'react-native-toast-message'
import { styles } from './RestaurantFavorites.styles'

export function RestaurantFavorites(props) {
    const { restaurant } = props
    const navigation = useNavigation();

    const goToRestaurant = () => {
        navigation.navigate(screen.restaurant.tab,{
            screen:screen.restaurant.restaurant,
            params:{
                id: restaurant.id
            }
        })
    }
    const onRemoveFavorite = async() =>{
        try {
            await deleteDoc(doc(db, "favorites", restaurant.idFavorite))
        } catch (error) {
            Toast.show({
                type: "error",
                position: "bottom",
                text1: "Error al guardar en favoritos",
                text2: error.message 
            })
        }
    }
    return (
        <TouchableOpacity onPress={goToRestaurant}>
        <View style={styles.content}></View>
            <Image source={{ uri: restaurant.images[0] }} style={styles.image} />
            <View style={styles.infoContent}>
                <Text style={styles.name}>{restaurant.name}</Text>
                <Icon
                    type='material-community'
                    name='heart'
                    color= "#f00"
                    size={35}
                    containerStyle={styles.iconContainer}
                    onPress={onRemoveFavorite}
                />
            </View>
        </TouchableOpacity>
    )
}