import { Typo } from '@/Components'
import { PrimaryLayout } from '@/Layout'
import { HeaderLeft } from '@/Routes/Header'
import { COLORS } from '@/Utils/colors'
import { useNavigation } from '@react-navigation/native'
import React, { useLayoutEffect } from 'react'
import { View } from 'react-native'

const LikeScreen = () => {
    const navigation = useNavigation<any>()
    useLayoutEffect(() => {
        const focusUnsubscribe = navigation.addListener('focus', () => {
            navigation?.setOptions({
                headerStyle: { backgroundColor: COLORS.hotPink },
                headerLeft: () => (
                    <HeaderLeft onPress={() => navigation.goBack()} />
                )
            });
        });
        const blurUnsubscribe = navigation.addListener('blur', () => {
            navigation?.setOptions({
                headerStyle: { backgroundColor: COLORS.white },
                headerLeft: null
            });
        });

        return () => {
            focusUnsubscribe();
            blurUnsubscribe();
        };
    }, [navigation]);

    return (
        <PrimaryLayout bgColor={COLORS.hotPink}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Typo title='Feature under development' variant='titleMediumSecondary' />
            </View>
        </PrimaryLayout>
    )
}

export default LikeScreen