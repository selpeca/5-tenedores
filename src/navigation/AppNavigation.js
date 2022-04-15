import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-elements";

import { screen } from "../utils";

import { RestaurantStack } from "./RestaurantStack";
import { FavoriteStack } from "./FavoriteStack";
import { RankingStack } from "./RankingStack";
import { SearchStack } from "./SearchStack";
import { AccountStack } from "./AccountStack";


const Tab = createBottomTabNavigator();

export function AppNavigation() {
    return <Tab.Navigator 
            screenOptions={({ route }) =>({
                tabBarActiveTintColor: "#00a680",
                tabBarInactiveTintColor: "#646464",
                tabBarIcon:({ color, size }) => screenOptions(route, color, size)
            })}
        >
        <Tab.Screen name={screen.restaurant.tab} component={RestaurantStack} options={{title: "Restaurantes", headerShown: false}} />
        <Tab.Screen name={screen.favorite.tab} component={FavoriteStack} options={{title: "Favoritos", headerShown: false}} />
        <Tab.Screen name={screen.ranking.tab} component={RankingStack} options={{title: "Ranking", headerShown: false}} />
        <Tab.Screen name={screen.search.tab} component={SearchStack}  options={{title: "Buscar", headerShown: false}} />
        <Tab.Screen name={screen.account.tab} component={AccountStack}  options={{title: "Cuenta", headerShown: false}} />
    </Tab.Navigator>
}

const screenOptions = (route, color, size) => {
    let iconName;

    if (route.name === screen.restaurant.tab) {
        iconName = "compass-outline"
    }

    if (route.name === screen.favorite.tab) {
        iconName = "heart-outline"
    }

    if (route.name === screen.ranking.tab) {
        iconName = "star-outline"
    }

    if (route.name === screen.search.tab) {
        iconName = "magnify"
    }

    if (route.name === screen.account.tab) {
        iconName = "home-outline"
    }

    return <Icon type="material-community" name={iconName} color={color} size={size} />

}