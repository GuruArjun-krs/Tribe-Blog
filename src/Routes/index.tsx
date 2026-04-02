import React from 'react'
import { Platform, StatusBar } from 'react-native';
import { TourGuideProvider } from 'rn-tourguide';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Tooltip } from '@/Components';
import { StackScreens } from '@/Routes/Screen';
import { COLORS } from '@/Utils/colors';
import { AppHeader } from '@/Routes/Header';

const Stack = createNativeStackNavigator();

const MainStacks = () => {
    return (
        <TourGuideProvider
            verticalOffset={Platform.OS === 'android' ? StatusBar.currentHeight : 0}
            tooltipComponent={Tooltip}
            backdropColor="rgba(0, 0, 0, 0.5)"
            androidStatusBarVisible={false}
        >
            <NavigationContainer>
                <Stack.Navigator
                    initialRouteName="BottomTab"
                    screenOptions={{
                        headerShown: true,
                        header: (props) => <AppHeader {...props} />,
                        headerStyle: {
                            backgroundColor: COLORS.white,
                        },
                    }}
                >
                    {StackScreens?.map((el) => (
                        <Stack.Screen
                            key={el?.key}
                            name={el?.name}
                            component={el?.component}
                            options={el?.options || {}}
                        />
                    ))}
                </Stack.Navigator>
            </NavigationContainer>
        </TourGuideProvider >
    )
}

export default MainStacks