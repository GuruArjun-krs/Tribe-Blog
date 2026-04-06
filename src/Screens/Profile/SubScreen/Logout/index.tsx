import React from 'react'
import { View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';

import { ButtonComp, Typo } from '@/Components'
import { COLORS } from '@/Utils/colors';

const Logout = () => {
    const navigation = useNavigation<any>()

    const handleLogout = async () => {
        await AsyncStorage.clear()
        navigation.reset({
            index: 0,
            routes: [
                {
                    name: 'BottomTab',
                    params: { screen: 'Home' },
                },
            ],
        });
    }

    return (
        <View style={{ padding: 20, justifyContent: 'center', alignItems: 'flex-start', backgroundColor: COLORS.white, gap: 20 }}>
            <Typo title='Are you sure want to logout?' variant='titleMediumSecondary' />
            <View style={{ flexDirection: 'row', gap: 20 }}>
                <View style={{ flex: 1 }}>
                    <ButtonComp title='No, Cancel' onPress={() => navigation.goBack()} textColor={COLORS.black} />
                </View>
                <View style={{ flex: 1 }}>
                    <ButtonComp title='Yes, Logout' onPress={() => handleLogout()} style={{ backgroundColor: COLORS.status.error }} />
                </View>
            </View>
        </View>
    )
}

export default Logout