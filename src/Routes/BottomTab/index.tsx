import React, { createContext, useCallback, useState } from 'react'
import { BottomTabBar, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TouchableOpacity, View } from 'react-native';
import { TourGuideZone } from 'rn-tourguide';
import { useNavigation } from '@react-navigation/native';

import { TabScreens } from '@/Routes/Screen';
import { COLORS } from '@/Utils/colors';
import { AppIcon, Typo } from '@/Components';
import CustomTabBarBackground from '@/Routes/BottomTab/tabBackground';
import useFetchLocal from '@/Hooks/useFetchLocal';

const Tab = createBottomTabNavigator();

export const ContextParent = createContext<any>(null);

const BottomTabs = () => {
    const navigation = useNavigation<any>()
    const { isLogin } = useFetchLocal();
    const [layoutChange, setLayoutChange] = useState<any>({
        tabBgColor: COLORS.white,
    });

    const renderTabButton = () => {
        return (
            <TouchableOpacity
                onPress={() => navigation.navigate('BottomTab', { screen: 'AddBlog' })}
                style={{
                    position: 'absolute',
                    bottom: 25,
                    alignSelf: 'center',
                    backgroundColor: layoutChange.tabBgColor,
                    width: 60,
                    height: 60,
                    borderRadius: 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                    elevation: 5,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.3,
                    shadowRadius: 3,
                }}
            >
                <AppIcon name='plus' type='Feather' color={COLORS.white} />
            </TouchableOpacity>
        );
    };

    // const renderItem = (name: any, type: any, active: boolean, navigation: any, route: { name: string }) => {
    //     const screenType = TabScreens.find((el) => el.name === route.name);

    //     return (
    //         <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => navigation.navigate(route.name)}>
    //             <AppIcon
    //                 name={name ?? ''}
    //                 type={type as any}
    //                 size={20}
    //                 color={active ? screenType?.focusedColor : screenType?.unFocusedColor}
    //             />
    //         </TouchableOpacity>
    //     );
    // };

    const renderItem = (name: any, type: any, active: any, screenType: any) => {
        return (
            <View style={{ alignItems: 'center' }}>
                <AppIcon
                    name={name ?? ''}
                    type={type}
                    size={20}
                    color={active ? screenType?.focusedColor : screenType?.unFocusedColor}
                />
            </View>
        );
    };

    const CustomTabBarLabel = ({ focused, title }: any) => {
        return (
            <Typo
                style={{ fontSize: 10, textAlign: 'center' }}
                title={title}
                color={focused ? COLORS.white : COLORS.text.disabled}
                variant={focused ? 'bodySmallPrimary' : 'bodySmallTertiary'}
                numberOfLines={2}
            />
        );
    };

    return (
        <ContextParent.Provider value={{ layoutChange: layoutChange.tabBgColor, setLayoutChange }}>
            <Tab.Navigator
                initialRouteName='Home'
                tabBar={(props) => (
                    <TourGuideZone zone={3} text={'This is the navigation bar'} shape={'rectangle'}>
                        <BottomTabBar {...props} />
                    </TourGuideZone>
                )}
                screenOptions={({ route }) => ({
                    headerShown: false,
                    tabBarActiveTintColor: COLORS.white,
                    tabBarInactiveTintColor: COLORS.text.disabled,
                    tabBarStyle: {
                        backgroundColor: layoutChange.tabBgColor,
                        borderTopWidth: 0,
                        display: 'flex',
                    },
                    tabBarIcon: ({ focused }) => {
                        const screenType = TabScreens?.find(el => el?.name === route?.name);
                        return renderItem(screenType?.iconName, screenType?.iconType, focused, screenType);
                    },
                    tabBarLabel: ({ focused }) => (
                        <CustomTabBarLabel focused={focused} title={route?.name} />
                    ),
                    tabBarBackground: () => <CustomTabBarBackground />
                })}
            >
                {TabScreens?.map((el) => (
                    <Tab.Screen
                        key={el?.key}
                        name={el?.name}
                        component={el?.component}
                        listeners={{
                            tabPress: (e) => {
                                if (isLogin !== 'success') {
                                    e.preventDefault();
                                    navigation.navigate('Login');
                                }
                            },
                        }}
                        options={{
                            ...el?.options,
                            tabBarButton: el?.name === 'AddBlog' ? () => renderTabButton() : undefined
                        }}
                    />
                ))}
            </Tab.Navigator>
        </ContextParent.Provider>
    )
}

export default BottomTabs