import { NativeStackNavigationOptions } from '@react-navigation/native-stack';

import HomeScreen from '@/Screens/Home';
import ProfileScreen from '@/Screens/Profile';
import BottomTabs from '@/Routes/BottomTab';

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

export const StackScreens = [
    {
        key: 'bottomTab',
        name: 'BottomTab',
        component: BottomTabs,
        options: {
            title: 'Home'
        }
    },
]

export const TabScreens = [
    {
        key: 'home',
        name: 'Home',
        component: HomeScreen,
    },
    {
        key: 'profile',
        name: 'Profile',
        component: ProfileScreen,
    }
]