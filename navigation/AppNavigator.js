import { createStackNavigator } from "react-navigation";

import ColorsScreen from "../screens/ColorsScreen";
import HistoryScreen from "../screens/HistoryScreen";
import HomeScreen from "../screens/HomeScreen";
import SettingsScreen from "../screens/SettingsScreen";

const AppNavigator = createStackNavigator(
    {
        Colors: ColorsScreen,
        History: HistoryScreen,
        Home: HomeScreen,
        Settings: SettingsScreen,
    },
    {
        initialRouteName: "Home",
    }
);

export default AppNavigator;
