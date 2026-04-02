import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { TabScreens } from '@/Routes/Screen';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
    return (
        <Tab.Navigator
            initialRouteName='Home'
            screenOptions={{
                headerShown: false,
            }}
        >
            {TabScreens?.map((el) => (
                <Tab.Screen
                    key={el?.key}
                    name={el?.name}
                    component={el?.component}
                />
            ))}
        </Tab.Navigator>
    )
}

export default BottomTabs