import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { View } from 'react-native';

import { PrimaryLayout } from '@/Layout';
import { Typo } from '@/Components';
import { COLORS } from '@/Utils/colors';

const ProfileScreen = () => {
    const navigation = useNavigation();

    useLayoutEffect(() => {
        const parent = navigation.getParent();
        const focusUnsubscribe = navigation.addListener('focus', () => {
            parent?.setOptions({
                headerStyle: { backgroundColor: COLORS.primary[900] },
            });
        });
        const blurUnsubscribe = navigation.addListener('blur', () => {
            parent?.setOptions({
                headerStyle: { backgroundColor: COLORS.white },
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
                <Typo title='This is Profile Page' />
            </View>
        </PrimaryLayout>
    )
}

export default ProfileScreen