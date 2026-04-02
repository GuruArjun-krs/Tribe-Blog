import React, { useContext, useLayoutEffect } from 'react'
import { TourGuideZone, useTourGuideController } from 'rn-tourguide';
import { useNavigation } from '@react-navigation/native'
import { View } from 'react-native'

import { PrimaryLayout } from '@/Layout';
import { COLORS } from '@/Utils/colors';
import { RightHeader } from '@/Routes/Header';
import { ContextParent } from '@/Routes/BottomTab';
import { ButtonComp } from '@/Components';

const HomeScreen = () => {
    const navigation = useNavigation<any>()
    const { start, canStart } = useTourGuideController();
    const layoutContext = useContext(ContextParent);
    const { setLayoutChange } = layoutContext;

    useLayoutEffect(() => {
        const parent = navigation.getParent();
        const focusUnsubscribe = navigation.addListener('focus', () => {
            parent?.setOptions({
                headerStyle: { backgroundColor: COLORS.primary[100] },
                headerRight: () => (
                    <RightHeader />
                ),
            });
            if (canStart) {
                start()
            }
            setLayoutChange((prev: any) => ({
                ...prev,
                tabBgColor: COLORS.primary[100],
            }));
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
    }, [navigation, setLayoutChange]);

    return (
        <PrimaryLayout bgColor={COLORS.primary[100]}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <TourGuideZone zone={1} text={'This is button'} shape={'rectangle'}>
                    <ButtonComp onPress={() => start()} title='Press me' />
                </TourGuideZone>
            </View>
        </PrimaryLayout>
    )
}

export default HomeScreen