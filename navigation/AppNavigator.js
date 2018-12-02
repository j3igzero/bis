import { createStackNavigator } from "react-navigation";

import MainNavigator from "./MainNavigator";
import CameraScreen from "../screens/CameraScreen";

const AppNavigator = createStackNavigator(
    {
        Main: MainNavigator,
        Camera: CameraScreen,
    },
    {
        initialRouteName: "Main",
        mode: "modal",
        headerMode: "none",
    }
);

export default AppNavigator;
