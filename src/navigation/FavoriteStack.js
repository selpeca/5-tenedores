import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FavoritesScreen } from "../screens/Favorites/FavoritesScreen";

import { screen } from "../utils";

const Stack = createNativeStackNavigator();


export function FavoriteStack() {
  return (
      <Stack.Navigator>
          <Stack.Screen
          name={screen.favorite.favorites} 
          component={FavoritesScreen}
          options={{title:"Favoritos"}} />
      </Stack.Navigator>
  )
}