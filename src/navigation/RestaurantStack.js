import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AddRestaurantScreen } from "../screens/Restaurants/AddRestaurantScreen";
import { RestaurantsScreen } from "../screens/Restaurants/RestaurantsScreen";
import { RestaurantScreen } from "../screens/Restaurants/RestaurantScreen";
import { AddReviewRestaurantScreen } from "../screens/Restaurants/AddReviewRestaurantScreen/AddReviewRestaurantScreen";

import { screen } from "../utils";

const Stack = createNativeStackNavigator();

export function RestaurantStack(){
    return (
        <Stack.Navigator>
            <Stack.Screen
            name={screen.restaurant.restaurants} 
            component={RestaurantsScreen}
            options={{title:"Restaurantes"}} />
            <Stack.Screen
            name={screen.restaurant.addRestaurant} 
            component={AddRestaurantScreen}
            options={{title:"Agregar"}} />
            <Stack.Screen
            name={screen.restaurant.restaurant} 
            component={RestaurantScreen}
            options={{title:"Restaurante"}} />
            <Stack.Screen
            name={screen.restaurant.addReviewRestaurant} 
            component={AddReviewRestaurantScreen}
            options={{title:"Nueva opinión"}} />
        </Stack.Navigator>
    )
}