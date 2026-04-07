import React, { memo, useLayoutEffect } from 'react'
import { FlatList, Image, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import moment from 'moment'

import { useMyFavorites } from '@/Api/Hooks/BlogHook'
import { AppIcon, Typo } from '@/Components'
import useFetchLocal from '@/Hooks/useFetchLocal'
import { PrimaryLayout } from '@/Layout'
import { HeaderLeft } from '@/Routes/Header'
import { COLORS } from '@/Utils/colors'

const LikeScreen = () => {
    const navigation = useNavigation<any>()
    const { data: FavoriteBlog } = useMyFavorites()
    const { isLogin } = useFetchLocal();

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

    const BlogCard = memo(({ item }: any) => (
        <View style={{ backgroundColor: COLORS.secondary[50], borderRadius: 12, borderWidth: 1, borderColor: COLORS.hotPink }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 12 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                    <View style={{ width: 30, height: 30 }}>
                        <Image source={{ uri: item?.image }} style={{ width: '100%', height: '100%', borderRadius: 40 }} />
                    </View>
                    <View style={{ flexDirection: 'column' }}>
                        <Typo variant='bodyLargeSecondary' title={item?.createdBy?.name} />
                        <Typo title={moment(item?.updatedAt).format("MMM D, YYYY")} />

                    </View>
                </View>

                {isLogin === 'success' && (
                    <TouchableOpacity style={{ borderWidth: 1, padding: 8, borderRadius: 40, borderColor: COLORS.hotPink }} onPress={() => navigation.navigate('CardOptions', { data: item })}>
                        <AppIcon name='dots-three-vertical' type='Entypo' size={14} />
                    </TouchableOpacity>
                )}
            </View>
            <Image source={{ uri: item?.image }} style={{ width: '100%', height: 180, backgroundColor: '#e1e1e1' }} />
            <View style={{ padding: 14, gap: 8 }}>
                <Typo title={item?.title} variant='bodyLargeSecondary' />
                <Typo title={item?.content} numberOfLines={2} ellipsizeMode='tail' variant='bodyMediumTertiary' />
                <TouchableOpacity onPress={() => navigation.navigate('BlogDetails', { id: item._id })} style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4, justifyContent: 'flex-end' }}>
                    <Typo title="Continue Reading" variant='bodySmallPrimary' color={COLORS.hotPink} />
                    <AppIcon name='chevron-right' type='Feather' color={COLORS.black} size={14} />
                </TouchableOpacity>
            </View>
        </View>
    ));

    const renderItem = ({ item }: any) => <BlogCard item={item} />;

    return (
        <PrimaryLayout bgColor={COLORS.hotPink}>
            <View style={{ flex: 1 }}>
                <FlatList
                    data={FavoriteBlog?.data}
                    renderItem={renderItem}
                    keyExtractor={(item) => item._id}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={() => (
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 40, gap: 12 }}>
                            <Typo title='For the elite only' variant='titleMediumSecondary' color={COLORS.hotPink} />
                            <Typo title='Start adding to your favorites so you never lose the plot.' style={{ textAlign: 'center' }} color={COLORS.text.disabledSecondary} />

                        </View>
                    )}
                    contentContainerStyle={{ padding: 16, gap: 12, flexGrow: 1 }}
                    initialNumToRender={10}
                    maxToRenderPerBatch={10}
                    windowSize={5}
                    removeClippedSubviews={true}
                />
            </View>
        </PrimaryLayout>
    )
}

export default LikeScreen