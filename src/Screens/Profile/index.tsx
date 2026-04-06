import React, { useContext, useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { Dimensions, FlatList, Image, TouchableOpacity, View } from 'react-native';

import { PrimaryLayout } from '@/Layout';
import { AppIcon, ButtonComp, Typo } from '@/Components';
import { COLORS } from '@/Utils/colors';
import { ContextParent } from '@/Routes/BottomTab';
import { HeaderLeft } from '@/Routes/Header';
import useFetchLocal from '@/Hooks/useFetchLocal';
import { useUserProfile } from '@/Api/Hooks/UserHook';
import { useMyBlogs } from '@/Api/Hooks/BlogHook';

const { width: ScreenWidth } = Dimensions.get('window')
const COLUMN_SIZE = ScreenWidth / 3;

const ProfileScreen = () => {
    const navigation = useNavigation<any>();
    const layoutContext = useContext(ContextParent);
    const { setLayoutChange } = layoutContext;
    const { isLogin, userId } = useFetchLocal();
    const { data: userProfile } = useUserProfile({ id: userId })
    const { data: myBlogList } = useMyBlogs()

    useLayoutEffect(() => {
        const parent = navigation.getParent();
        const focusUnsubscribe = navigation.addListener('focus', () => {
            parent?.setOptions({
                headerStyle: { backgroundColor: COLORS.primary[900] },
                title: 'My Profile',
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
                headerLeft: null,
                title: null
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
                    <Typo title={myBlogList?.count?.toString()} variant="bodyMediumSecondary" />
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
                    {userProfile?.data?.gender && (
                        <Typo title={userProfile?.data?.gender === "Male" ? "(He / Him)" : userProfile?.data?.gender === "Female" ? "(She / Her)" : ""} variant="bodyMediumSecondary" color={COLORS.text[300]} />
                    )}

                </View>
                {userProfile?.data?.nickname && (
                    <Typo title={userProfile?.data?.nickname} color={COLORS.text.disabledSecondary} variant="bodySmallTertiary" />
                )}
                {userProfile?.data?.bio && (
                    <Typo title={userProfile?.data?.bio} variant="bodyMediumTertiary" />
                )}
                {(!userProfile?.data?.bio || !userProfile?.data?.bio) && (
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }} onPress={() => navigation.navigate('EditProfile')}>
                        <Typo title='Complete your Profile' color={COLORS.text.secondary} variant='bodySmallTertiary' />
                        <AppIcon name='chevron-right' type='Feather' size={12} />
                    </TouchableOpacity>
                )}
            </View>

            <View style={{ flexDirection: 'row', gap: 10 }}>
                <View style={{ flex: 1 }}>
                    <ButtonComp title='Edit Profile' onPress={() => navigation.navigate('EditProfile')} textColor={COLORS.primary[900]} />
                </View>
                <View style={{ flex: 1 }}>
                    <ButtonComp title='Logout' onPress={() => navigation.navigate('Logout')} textColor={COLORS.primary[900]} />
                </View>
            </View>
        </View>
    );

    const renderPostItem = ({ item }: any) => (
        <TouchableOpacity style={{ width: COLUMN_SIZE, height: COLUMN_SIZE, borderWidth: 0.5, borderColor: COLORS.primary[900] }} onPress={() => navigation.navigate('BlogDetails', { id: item?._id })}>
            <View style={{ flex: 1, backgroundColor: COLORS.primary[800], position: 'relative' }}>
                <Image source={{ uri: item.image }} style={{ width: '100%', height: '100%' }} />
                <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(255, 255, 255, 0.4)' }}>
                    <Typo title={item?.title} style={{ backgroundColor: COLORS.white, paddingVertical: 2, paddingHorizontal: 6, borderRadius: 4 }} />
                </View>
            </View>
        </TouchableOpacity>
    );

    const renderNoData = () => {
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center', padding: 16, gap: 20 }}>
                <Typo title='Post your First Story' color='red' variant='titleMediumSecondary' />
                <ButtonComp title='Write My First Story' style={{ backgroundColor: COLORS.primary[900] }} onPress={() => navigation.navigate('BottomTab', { screen: 'AddBlog' })} />
            </View>
        )
    }

    return (
        <PrimaryLayout bgColor={COLORS.primary[900]}>
            <View style={{ flex: 1 }}>
                {isLogin === 'success' ? (
                    <FlatList
                        data={myBlogList?.data || []}
                        renderItem={renderPostItem}
                        ListEmptyComponent={renderNoData}
                        keyExtractor={(item, index) => index.toString()}
                        numColumns={3}
                        ListHeaderComponent={ProfileHeader}
                        contentContainerStyle={{ flexGrow: 1 }}
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