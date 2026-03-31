import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Screens } from './stackScreens';
import AppHeader from './customHeader';

const Stack = createNativeStackNavigator();

const MainStacks = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Home"
                screenOptions={{
                    header: (props) => <AppHeader {...props} />
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