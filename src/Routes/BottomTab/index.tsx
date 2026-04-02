import React, { createContext, useState } from 'react'
import { BottomTabBar, createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { TabScreens } from '@/Routes/Screen';
import { COLORS } from '@/Utils/colors';
import { AppIcon } from '@/Components';
import { TourGuideZone } from 'rn-tourguide';

const Tab = createBottomTabNavigator();

export const ContextParent = createContext<any>(null);


const BottomTabs = () => {
    const [layoutChange, setLayoutChange] = useState<any>({
        tabBgColor: COLORS.white,
    });

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
                        borderTopWidth: 1,
                        borderTopColor: COLORS.text.disabled,
                    },
                    tabBarLabelStyle: {
                        fontSize: 10,
                        fontWeight: '500',
                    },
                    tabBarIcon: ({ size, focused }) => {
                        const screenType = TabScreens.find(el => el.name === route.name);
                        const name = screenType?.iconName;
                        const type = screenType?.iconType;
                        return (
                            <AppIcon name={name ?? ''} type={type as any} size={20} color={focused ? screenType?.focusedColor : screenType?.unFocusedColor} />
                        );
                    },
                })}
            >
                {TabScreens?.map((el) => (
                    <Tab.Screen
                        key={el?.key}
                        name={el?.name}
                        component={el?.component}
                    />
                ))}
            </Tab.Navigator>
        </ContextParent.Provider>
    )
}

export default BottomTabs