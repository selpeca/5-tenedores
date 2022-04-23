import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { Icon } from "react-native-elements";
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { screen } from "../../../utils"
import { styles } from "./RestaurantScreen.styles";

export function RestaurantScreen (props){
    const { navigation } = props;
    const [currentUser, setCurrentUser] = useState(null)

    useEffect(() => {
        const auth = getAuth();
      onAuthStateChanged(auth, (user)=>{
        setCurrentUser(user)
      })
    }, [])
    
    const goToAddRestaurant = () =>{
        navigation.navigate(screen.restaurant.addRestaurant)
    }
    return (
        <View style={styles.content}>
            <Text>Estamos en la screen Restaurants</Text>
            {
                currentUser && (
                    <Icon
                        reverse
                        type="material-community"
                        name="plus"
                        color="#00a68c"
                        containerStyle={styles.btnContainer}
                        onPress={() =>{goToAddRestaurant()}}
                    />
                )
            }
        </View>
    );
}