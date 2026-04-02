import { NativeStackNavigationOptions } from '@react-navigation/native-stack';

import HomeScreen from "../Screens/Home";
import ProfileScreen from "../Screens/Profile";

// this is used for bottomsheet while navigation
const options: NativeStackNavigationOptions = {
    headerShown: false,
    presentation: 'formSheet',
    sheetAllowedDetents: [0.5, 0.9],
    sheetInitialDetentIndex: 0,
    sheetGrabberVisible: true,
    animation: 'slide_from_bottom',
    fullScreenGestureEnabled: false,
}

export const Screens = [
    {
        key: 'home',
        name: 'Home',
        component: HomeScreen,
    },
    {
        key: 'profile',
        name: 'Profile',
        component: ProfileScreen,
        options: options  // this is how u trigger default bottomsheet when navigating as screen
    }
]