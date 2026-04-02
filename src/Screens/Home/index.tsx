import React, { useEffect, useLayoutEffect } from 'react'
import { TourGuideZone, useTourGuideController } from 'rn-tourguide';
import { useNavigation } from '@react-navigation/native'
import { Button, Image, View } from 'react-native'

import { PrimaryLayout } from '@/Layout';
import { COLORS } from '@/Utils/colors';
import { ButtonComp } from '@/Components';

const HomeScreen = () => {
    const navigation = useNavigation<any>()
    const { start, canStart } = useTourGuideController();

    useLayoutEffect(() => {
        const parent = navigation.getParent();
        const focusUnsubscribe = navigation.addListener('focus', () => {
            parent?.setOptions({
                headerStyle: { backgroundColor: COLORS.primary[100] },
                headerRight: () => (
                    <ButtonComp title='Go back' onPress={() => { }} />
                ),
            });
        });
        const blurUnsubscribe = navigation.addListener('blur', () => {
            parent?.setOptions({
                headerStyle: { backgroundColor: COLORS.white },
                title: null,
                headerRight: null,
            });
        });

        return () => {
            focusUnsubscribe();
            blurUnsubscribe();
        };
    }, [navigation]);

    useEffect(() => {
        if (canStart) {
            start();
        }
    }, [canStart]);

    return (
        <PrimaryLayout bgColor={COLORS.primary[100]}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 25 }}>
                <TourGuideZone zone={1} text="This is image" shape='circle' style={{ padding: 4 }}>
                    <Image source={{ uri: 'https://picsum.photos/1200' }} style={{ width: 100, height: 100, borderRadius: 50 }} />
                </TourGuideZone>
                <Button title='Start Tour' onPress={() => start()} />
            </View>
        </PrimaryLayout>
    )
}

export default HomeScreen