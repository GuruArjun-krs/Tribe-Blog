import { NativeStackNavigationOptions } from '@react-navigation/native-stack';

import HomeScreen from '@/Screens/Home';
import ProfileScreen from '@/Screens/Profile';
import BottomTabs from '@/Routes/BottomTab';
import { AppIcon } from '@/Components';
import { COLORS } from '@/Utils/colors';
import { LoginScreen, RegisterScreen } from '@/Screens/Auth';
import EditProfileScreen from '@/Screens/Profile/SubScreen/EditProfile';
import LikeScreen from '@/Screens/Likes';
import AddBlog from '@/Screens/AddBlog';
import BlogDetails from '@/Screens/Home/SubScreen/BlogDetail';
import Logout from '@/Screens/Profile/SubScreen/Logout';
import CardMenu from '@/Screens/Home/SubScreen/CardMenu';
import BloggerProfile from '@/Screens/Profile/SubScreen/BloggerProfile';
import AddCategory from '@/Screens/AddCategory';
import EditBlogScreen from '@/Screens/EditBlog';

// this is used for bottomsheet while navigation
const options: NativeStackNavigationOptions = {
    headerShown: false,
    presentation: 'formSheet',
    sheetAllowedDetents: 'fitToContents',
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
            title: 'Join us and share your story',
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
            title: "My Favorite Blogs!"
        }
    },
    {
        key: 'blogDetail',
        name: 'BlogDetails',
        component: BlogDetails,
    },
    {
        key: 'logout',
        name: 'Logout',
        component: Logout,
        options: options
    },
    {
        key: 'cardOptions',
        name: 'CardOptions',
        component: CardMenu,
        options: options
    },
    {
        key: 'bloggerProfile',
        name: 'BloggerProfile',
        component: BloggerProfile
    },
    {
        key: 'addCategory',
        name: 'AddCategory',
        component: AddCategory,
        options: options
    },
    {
        key: 'editBlogScreen',
        name: 'EditBlog',
        component: EditBlogScreen,
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
        key: 'addBlog',
        name: 'AddBlog',
        component: AddBlog,
        options: {
            title: 'Add New Blog'
        }
    },
    {
        key: 'profile',
        name: 'Profile',
        component: ProfileScreen,
        iconName: 'user',
        iconType: 'Feather',
        focusedColor: COLORS.white,
        unFocusedColor: COLORS.text.disabled
    },
]