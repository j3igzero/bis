import { createStackNavigator } from "react-navigation";

import HomeScreen from "../screens/HomeScreen";
import SettingsScreen from "../screens/SettingsScreen";
import ColorsScreen from "../screens/ColorsScreen";

const MainNavigator = createStackNavigator(
    {
        Home: HomeScreen,
        Colors: ColorsScreen,
        Settings: SettingsScreen,
    },
    {
        initialRouteName: "Home",
    }
);

export default MainNavigator;
