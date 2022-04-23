import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { Icon } from "react-native-elements";
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { LoadingModal } from '../../../components/Shared'
import { ListRestaurant } from '../../../components/Restaurants'
import { db, screen } from "../../../utils"
import { styles } from "./RestaurantsScreen.styles";

export function RestaurantsScreen (props){
    const { navigation } = props;
    const [currentUser, setCurrentUser] = useState(null)
    const [restaurants, setRestaurants] = useState(null)

    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user)=>{
            setCurrentUser(user)
        })
    }, [])

    useEffect(() => {
      const q = query(
            collection(db,"restaurants"),
            orderBy("createdAt","desc")
      );
      onSnapshot(q, (snapshot) =>{
        setRestaurants(snapshot.docs);
      })
    }, [])
    
    
    const goToAddRestaurant = () =>{
        navigation.navigate(screen.restaurant.addRestaurant)
    }
    return (
        <View style={styles.content}>
            {!restaurants ? (
                <LoadingModal show text="cargando" />
            ):(
                <ListRestaurant restaurants={restaurants} />
            )}
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