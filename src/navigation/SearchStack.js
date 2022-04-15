import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AccountScreen } from "../screens/Accounts/AccountScreen";
import { SearchScreen } from "../screens/Search/SearchScreen";

import { screen } from "../utils";

const Stack = createNativeStackNavigator();


export function SearchStack() {
  return (
      <Stack.Navigator>
          <Stack.Screen
          name={screen.search.search} 
          component={SearchScreen}
          options={{title:"Buscar"}} />
      </Stack.Navigator>
  )
}