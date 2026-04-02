import React from 'react'
import { TourGuideProvider } from 'rn-tourguide';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Screens } from './stackScreens';
import { Tooltip } from '../Components';

const Stack = createNativeStackNavigator();

const MainStacks = () => {
    return (
        <TourGuideProvider
            verticalOffset={34}
            tooltipComponent={Tooltip}
            backdropColor="rgba(0, 0, 0, 0.1)"
            androidStatusBarVisible={false}
            borderRadius={20}
        >
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
        </TourGuideProvider>
    )
}

export default MainStacks