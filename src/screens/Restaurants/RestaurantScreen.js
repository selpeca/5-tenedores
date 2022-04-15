import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text } from "react-native";
import { Button } from "react-native-elements";
import { screen } from "../../utils"

export function RestaurantScreen (props){
    
    const { navigation } = props;
    const goToAddRestaurant = () =>{
        navigation.navigate(screen.restaurant.addRestaurant)
    }
    return (
        <View>
            <Text>Estamos en la screen Restaurants</Text>
            <Button title="Crear restaurante" onPress={() =>{goToAddRestaurant()}}/>
        </View>
    );
}