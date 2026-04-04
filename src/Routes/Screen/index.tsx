import { NativeStackNavigationOptions } from '@react-navigation/native-stack';

import HomeScreen from '@/Screens/Home';
import ProfileScreen from '@/Screens/Profile';
import BottomTabs from '@/Routes/BottomTab';
import { AppIcon } from '@/Components';
import { COLORS } from '@/Utils/colors';
import { LoginScreen, RegisterScreen } from '@/Screens/Auth';
import EditProfileScreen from '@/Screens/Profile/SubScreen/EditProfile';
import LikeScreen from '@/Screens/Likes';

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
    {
        key: 'login',
        name: 'Login',
        component: LoginScreen,
        options: {
            title: 'Tell Your Story',
        }
    },
    {
        key: 'register',
        name: 'Register',
        component: RegisterScreen,
        options: {

        }
    },
    {
        key: 'editProfile',
        name: 'EditProfile',
        component: EditProfileScreen,
        options: {
            title: 'Edit Profile'
        }
    },
    {
        key: 'like',
        name: 'Like',
        component: LikeScreen,
        options: {
            title: "Let's see who liked"
        }
    }
]

export const TabScreens = [
    {
        key: 'home',
        name: 'Home',
        component: HomeScreen,
        iconName: 'home',
        iconType: 'Feather',
        focusedColor: COLORS.white,
        unFocusedColor: COLORS.text.disabled
    },
    {
        key: 'profile',
        name: 'Profile',
        component: ProfileScreen,
        iconName: 'user',
        iconType: 'Feather',
        focusedColor: COLORS.white,
        unFocusedColor: COLORS.text.disabled
    }
]