import { createStackNavigator } from "react-navigation";

import HomeScreen from "../screens/HomeScreen";
import SettingsScreen from "../screens/SettingsScreen";

const MainNavigator = createStackNavigator(
    {
        Home: HomeScreen,
        Settings: SettingsScreen,
    },
    {
        initialRouteName: "Home",
    }
);

export default MainNavigator;
