import React, { useContext, useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { Dimensions, FlatList, Image, TouchableOpacity, View } from 'react-native';

import { PrimaryLayout } from '@/Layout';
import { ButtonComp, Typo } from '@/Components';
import { COLORS } from '@/Utils/colors';
import { ContextParent } from '@/Routes/BottomTab';
import { HeaderLeft } from '@/Routes/Header';
import useFetchLocal from '@/Hooks/useFetchLocal';
import { useUserProfile } from '@/Api/Hooks/UserHook';

const { width: ScreenWidth } = Dimensions.get('window')
const COLUMN_SIZE = ScreenWidth / 3;

const ProfileScreen = () => {
    const navigation = useNavigation<any>();
    const layoutContext = useContext(ContextParent);
    const { setLayoutChange } = layoutContext;
    const { isLogin, userId } = useFetchLocal();
    const { data: userProfile } = useUserProfile({ id: userId })
    const [posts] = useState(new Array(12).fill({ id: Math.random() }));

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

    const ProfileHeader = () => (
        <View style={{ padding: 16, gap: 12 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <View style={{ width: 80, height: 80, borderRadius: 40, backgroundColor: COLORS.primary[700], borderWidth: 2, borderColor: COLORS.primary[400] }}>
                    <Image source={{ uri: userProfile?.data?.profileImg }} style={{ width: '100%', height: '100%', borderRadius: 40 }} />
                </View>
                <View style={{ alignItems: 'center' }}>
                    <Typo title={posts?.length?.toString()} variant="bodyMediumSecondary" />
                    <Typo title="Posts" variant="bodyMediumTertiary" />
                </View>
                <View style={{ alignItems: 'center' }}>
                    <Typo title="1.2k" variant="bodyMediumSecondary" />
                    <Typo title="Followers" variant="bodyMediumTertiary" />
                </View>
                <View style={{ alignItems: 'center' }}>
                    <Typo title="150" variant="bodyMediumSecondary" />
                    <Typo title="Following" variant="bodyMediumTertiary" />
                </View>
            </View>

            <View>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                    <Typo title={userProfile?.data?.name} variant="bodyMediumSecondary" />
                    <Typo title={userProfile?.data?.gender === "Male" ? "(He / Him)" : userProfile?.data?.gender === "Female" ? "(She / Her)" : ""} variant="bodyMediumSecondary" color={COLORS.text[300]} />

                </View>
                <Typo title={userProfile?.data?.nickname} color={COLORS.text.disabledSecondary} variant="bodySmallTertiary" />
                <Typo title={userProfile?.data?.bio} variant="bodyMediumTertiary" />
            </View>

            <View style={{ flexDirection: 'row', gap: 10 }}>
                <View style={{ flex: 1 }}>
                    <ButtonComp title='Edit Profile' onPress={() => navigation.navigate('EditProfile')} textColor={COLORS.primary[900]} />
                </View>
                <View style={{ flex: 1 }}>
                    <ButtonComp title='Logout' onPress={() => { }} textColor={COLORS.primary[900]} />
                </View>
            </View>
        </View>
    );

    const renderPostItem = () => (
        <TouchableOpacity style={{ width: COLUMN_SIZE, height: COLUMN_SIZE, borderWidth: 0.5, borderColor: COLORS.primary[900] }}>
            <View style={{ flex: 1, backgroundColor: COLORS.primary[800] }} />
        </TouchableOpacity>
    );

    return (
        <PrimaryLayout bgColor={COLORS.primary[900]}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                {isLogin === 'success' ? (
                    <FlatList
                        data={posts}
                        renderItem={renderPostItem}
                        keyExtractor={(item, index) => index.toString()}
                        numColumns={3}
                        ListHeaderComponent={ProfileHeader}
                        showsVerticalScrollIndicator={false}
                    />
                ) : (
                    <View style={{ gap: 10, width: ScreenWidth * 0.7, alignItems: 'center' }}>
                        <Typo title='Hello, Writer' variant='titleLargeSecondary' />
                        <Typo title="Log in to share what's on your mind today." color={COLORS.text.disabledSecondary} />
                        <ButtonComp title='Login' onPress={() => navigation.navigate('Login')} style={{ backgroundColor: COLORS.primary[900] }} />
                    </View>
                )}
            </View>
        </PrimaryLayout>
    )
}

export default ProfileScreen