import React from 'react'
import { TourGuideProvider } from 'rn-tourguide';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Tooltip } from '@/Components';
import { StackScreens } from '@/Routes/Screen';
import AppHeader from '@/Routes/AppHeader';
import { COLORS } from '@/Utils/colors';

const Stack = createNativeStackNavigator();

const MainStacks = () => {
    return (
        <TourGuideProvider
            verticalOffset={30}
            tooltipComponent={Tooltip}
            backdropColor="rgba(0, 0, 0, 0.5)"
            androidStatusBarVisible={false}
            borderRadius={20}
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
        </TourGuideProvider>
    )
}

export default MainStacks