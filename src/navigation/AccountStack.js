import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AccountScreen } from "../screens/Accounts/AccountScreen";

import { screen } from "../utils";

const Stack = createNativeStackNavigator();


export function AccountStack() {
  return (
      <Stack.Navigator>
          <Stack.Screen
          name={screen.account.account} 
          component={AccountScreen}
          options={{title:"Cuenta"}} />
      </Stack.Navigator>
  )
}