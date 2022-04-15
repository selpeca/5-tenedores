import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RankingScreen } from "../screens/Ranking/RankingScreen";


import { screen } from "../utils";

const Stack = createNativeStackNavigator();


export function RankingStack() {
  return (
      <Stack.Navigator>
          <Stack.Screen
          name={screen.ranking.ranking} 
          component={RankingScreen}
          options={{title:"Top 10"}} />
      </Stack.Navigator>
  )
}