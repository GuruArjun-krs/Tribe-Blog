import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Screens } from './stackScreens';

const Stack = createNativeStackNavigator();

const MainStacks = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Home"
                screenOptions={{
                    headerShown: false
                }}
            >
                {Screens?.map((el) => (
                    <Stack.Screen
                        key={el?.key}
                        name={el?.name}
                        component={el?.component}
                        options={{
                            ...el.options,
                            title: el.name
                        }}
                    />
                ))}
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default MainStacks