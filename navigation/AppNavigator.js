import { createStackNavigator } from "react-navigation";

import ColorsScreen from "../screens/ColorsScreen";
import ContactScreen from "../screens/ContactScreen";
import ContactSuccessScreen from "../screens/ContactSuccessScreen";
import HistoryScreen from "../screens/HistoryScreen";
import HomeScreen from "../screens/HomeScreen";
import InksScreen from "../screens/InksScreen";
import SettingsScreen from "../screens/SettingsScreen";
import PantoneScreen from "../screens/PantoneScreen";

import GuestScreen from "../screens/GuestScreen";
import ColorProfileScreen from "../screens/ColorProfileScreen";
import FormulaScreen from "../screens/FormulaScreen";
import SearchScreen from "../screens/SearchScreen";

const AppNavigator = createStackNavigator(
    {
        Colors: ColorsScreen,
        Contact: ContactScreen,
        ContactSuccess: ContactSuccessScreen,
        History: HistoryScreen,
        Home: HomeScreen,
        Inks: InksScreen,
        Settings: SettingsScreen,
        Pantone: PantoneScreen,

        Guest: GuestScreen,
        ColorProfile: ColorProfileScreen,
        Formul: FormulaScreen,
        Search: SearchScreen,
    },
    {
        initialRouteName: "Guest",
    }
);

export default AppNavigator;
