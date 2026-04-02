import React, { useContext, useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { View } from 'react-native';

import { PrimaryLayout } from '@/Layout';
import { Typo } from '@/Components';
import { COLORS } from '@/Utils/colors';
import { ContextParent } from '@/Routes/BottomTab';
import { HeaderLeft } from '@/Routes/Header';
import { TourGuideZone } from 'rn-tourguide';

const ProfileScreen = () => {
    const navigation = useNavigation<any>();
    const layoutContext = useContext(ContextParent);
    const { setLayoutChange } = layoutContext;

    useLayoutEffect(() => {
        const parent = navigation.getParent();
        const focusUnsubscribe = navigation.addListener('focus', () => {
            parent?.setOptions({
                headerStyle: { backgroundColor: COLORS.primary[900] },
                headerLeft: () => (
                    <HeaderLeft onPress={() => navigation.navigate('BottomTab', { screen: 'Home' })} />
                )
            });
            setLayoutChange((prev: any) => ({
                ...prev,
                tabBgColor: COLORS.primary[900],
            }));
        });
        const blurUnsubscribe = navigation.addListener('blur', () => {
            parent?.setOptions({
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
        <PrimaryLayout bgColor={COLORS.primary[900]}>
            <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>
                {/* <TourGuideZone zone={4} text={'This is profile text'} shape={'rectangle'}> */}
                    <Typo title='This is Profile Page' />
                {/* </TourGuideZone> */}
            </View>
        </PrimaryLayout>
    )
}

export default ProfileScreen