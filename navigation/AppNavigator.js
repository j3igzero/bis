import { createStackNavigator } from "react-navigation";

import ColorsScreen from "../screens/ColorsScreen";
import ContactScreen from "../screens/ContactScreen";
import ContactSuccessScreen from "../screens/ContactSuccessScreen";
import HistoryScreen from "../screens/HistoryScreen";
import HomeScreen from "../screens/HomeScreen";
import InksScreen from "../screens/InksScreen";
import SettingsScreen from "../screens/SettingsScreen";

const AppNavigator = createStackNavigator(
    {
        Colors: ColorsScreen,
        Contact: ContactScreen,
        ContactSuccess: ContactSuccessScreen,
        History: HistoryScreen,
        Home: HomeScreen,
        Inks: InksScreen,
        Settings: SettingsScreen,
    },
    {
        initialRouteName: "Home",
    }
);

export default AppNavigator;
