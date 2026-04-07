import React, { useLayoutEffect } from 'react'
import { Dimensions, FlatList, Image, TouchableOpacity, View } from 'react-native'

import { PrimaryLayout } from '@/Layout'
import { useUserProfile } from '@/Api/Hooks/UserHook'
import { useNavigation } from '@react-navigation/native'
import { HeaderLeft } from '@/Routes/Header'
import { COLORS } from '@/Utils/colors'
import { AppIcon, Typo } from '@/Components'
import { useBloggerBlogById } from '@/Api/Hooks/BlogHook'

const { width: ScreenWidth } = Dimensions.get('window')
const COLUMN_SIZE = ScreenWidth / 3;

const BloggerProfile = ({ route }: any) => {
    const { id } = route?.params || {}
    const navigation = useNavigation<any>()

    const { data: BloggerProfile } = useUserProfile({ id: id })
    const { data: BlogDetails } = useBloggerBlogById(id)

    useLayoutEffect(() => {
        navigation.setOptions({
            headerStyle: { backgroundColor: COLORS.lemonYellow },
            title: `${BloggerProfile?.data?.name} - ${BloggerProfile?.data?.nickname}`,
            headerLeft: () => (
                <HeaderLeft onPress={() => navigation.goBack()} />
            ),
        });
        const focusUnsubscribe = navigation.addListener('focus', () => {
            if (BloggerProfile?.data) {
                navigation.setOptions({
                    headerStyle: { backgroundColor: COLORS.lemonYellow },
                    title: `${BloggerProfile?.data?.name} - ${BloggerProfile?.data?.nickname}`,
                    headerLeft: () => (
                        <HeaderLeft onPress={() => navigation.navigate('BottomTab', { screen: 'Home' })} />
                    ),
                });
            } else {
                navigation.setOptions({
                    title: 'Loading...',
                });
            }
        });
        const blurUnsubscribe = navigation.addListener('blur', () => {
            navigation?.setOptions({
                headerStyle: { backgroundColor: COLORS.white },
                headerLeft: null,
                title: null
            });
        });

        return () => {
            focusUnsubscribe();
            blurUnsubscribe();
        };
    }, [navigation, BloggerProfile, id]);

    const ProfileHeader = () => (
        <View style={{ padding: 16, gap: 12 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <View style={{ width: 80, height: 80, borderRadius: 40, backgroundColor: COLORS.primary[700], borderWidth: 2, borderColor: COLORS.lemonYellow }}>
                    <Image source={{ uri: BloggerProfile?.data?.profileImg }} style={{ width: '100%', height: '100%', borderRadius: 40 }} />
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 50 }}>
                    <View style={{ alignItems: 'center' }}>
                        <Typo title={BlogDetails?.count?.toString()} variant="bodyMediumSecondary" />
                        <Typo title="Posts" variant="bodyMediumTertiary" />
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <Typo title={BlogDetails?.count?.toString() || '0'} variant="bodyMediumSecondary" />
                        <Typo title="Favorites" variant="bodyMediumTertiary" />
                    </View>
                </View>
            </View>

            <View>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                    <Typo title={BloggerProfile?.data?.name} variant="bodyMediumSecondary" />
                    {BloggerProfile?.data?.gender && (
                        <Typo title={BloggerProfile?.data?.gender === "Male" ? "(He / Him)" : BloggerProfile?.data?.gender === "Female" ? "(She / Her)" : ""} variant="bodyMediumSecondary" color={COLORS.text[300]} />
                    )}

                </View>
                {BloggerProfile?.data?.nickname && (
                    <Typo title={BloggerProfile?.data?.nickname} color={COLORS.text.disabledSecondary} variant="bodySmallTertiary" />
                )}
                {BloggerProfile?.data?.bio && (
                    <Typo title={BloggerProfile?.data?.bio} variant="bodyMediumTertiary" />
                )}
            </View>
        </View>
    );

    const renderPostItem = ({ item }: any) => (
        <TouchableOpacity style={{ width: COLUMN_SIZE, height: COLUMN_SIZE, borderWidth: 0.5, borderColor: COLORS.lemonYellow }} onPress={() => navigation.navigate('BlogDetails', { id: item?._id })}>
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
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 40, gap: 15 }}>
                <View style={{ width: 80, height: 80, borderRadius: 40, borderWidth: 2, borderColor: COLORS.primary[500], justifyContent: 'center', alignItems: 'center' }}>
                    <AppIcon name='blogger' type='Zocial' color={COLORS.primary[500]} />
                </View>
                <Typo title='Share Blogs' variant='titleLargePrimary' />
                <Typo title='When you share blogs, they will appear on your profile.' color={COLORS.text.secondary} variant='bodyMediumSecondary' style={{ textAlign: 'center' }} />

                <TouchableOpacity onPress={() => navigation.navigate('BottomTab', { screen: 'AddBlog' })}>
                    <Typo title='Share your first blog' color={COLORS.primary[500]} variant='bodyMediumTertiary' />
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <PrimaryLayout bgColor={COLORS.lemonYellow}>
            <View style={{ flex: 1 }}>
                <FlatList
                    data={BlogDetails?.data || []}
                    renderItem={renderPostItem}
                    ListEmptyComponent={renderNoData}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={3}
                    ListHeaderComponent={ProfileHeader}
                    contentContainerStyle={{ flexGrow: 1 }}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </PrimaryLayout>
    )
}

export default BloggerProfile