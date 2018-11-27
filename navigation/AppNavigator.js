import { createStackNavigator } from "react-navigation";

import HomeScreen from "../screens/HomeScreen";
import ScanColorScreen from "../screens/ScanColorScreen";
import SettingsScreen from "../screens/SettingsScreen";

const AppNavigator = createStackNavigator({
    Home: HomeScreen,
    ScanColor: ScanColorScreen,
    Settings: SettingsScreen,
});

export default AppNavigator;
