import React, { memo, useContext, useLayoutEffect } from 'react'
import { useTourGuideController } from 'rn-tourguide';
import { useNavigation } from '@react-navigation/native'
import { FlatList, Image, TouchableOpacity, View } from 'react-native'
import moment from 'moment';

import { PrimaryLayout } from '@/Layout';
import { COLORS } from '@/Utils/colors';
import { RightHeader } from '@/Routes/Header';
import { ContextParent } from '@/Routes/BottomTab';
import { AppIcon, Typo } from '@/Components';
import { useBlogList } from '@/Api/Hooks/BlogHook';
import useDoubleBackExit from '@/Hooks/useExitApp';
import useFetchLocal from '@/Hooks/useFetchLocal';

const HomeScreen = () => {
    const navigation = useNavigation<any>()
    const { isLogin, userId } = useFetchLocal();
    const { start, canStart } = useTourGuideController();
    const layoutContext = useContext(ContextParent);
    const { setLayoutChange } = layoutContext;
    const { data: BlogList } = useBlogList()

    useDoubleBackExit()

    useLayoutEffect(() => {
        const parent = navigation.getParent();
        const focusUnsubscribe = navigation.addListener('focus', () => {
            parent?.setOptions({
                headerStyle: { backgroundColor: COLORS.primary[100] },
                title: 'Home',
                headerRight: () => (
                    <RightHeader isSearch={false} isProfile={false} />
                ),
            });

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

    const BlogCard = memo(({ item }: any) => (
        <View style={{ backgroundColor: COLORS.secondary[50], borderRadius: 12, borderWidth: 1, borderColor: COLORS.primary[200] }}>
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
                    <TouchableOpacity style={{ borderWidth: 1, padding: 8, borderRadius: 40, borderColor: COLORS.primary[200] }} onPress={() => navigation.navigate('CardOptions', { data: item })}>
                        <AppIcon name='dots-three-vertical' type='Entypo' size={14} />
                    </TouchableOpacity>
                )}
            </View>
            <Image source={{ uri: item?.image }} style={{ width: '100%', height: 180, backgroundColor: '#e1e1e1' }} />
            <View style={{ padding: 14, gap: 8 }}>
                <View style={{ borderWidth: 1, padding: 12, borderRadius: 8, borderColor: COLORS.pink }}>
                    <Typo title={item?.title} variant='bodyLargeSecondary' />
                    <Typo title={item?.content} numberOfLines={2} ellipsizeMode='tail' variant='bodyMediumTertiary' />
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 12 }}>
                    {item?.favorites?.includes(userId) ? (
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                            <AppIcon name={'heart'} type={'FontAwesome6'} size={16} color={COLORS.hotPink} />
                            <Typo title='Favorite' variant='bodySmallTertiary' color={COLORS.hotPink} />
                        </View>
                    ) : (
                        <View />
                    )}
                    <TouchableOpacity onPress={() => navigation.navigate('BlogDetails', { id: item._id })} style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Typo title="Continue Reading" variant='bodySmallPrimary' color={COLORS.primary[100]} />
                        <AppIcon name='chevron-right' type='Feather' color={COLORS.black} size={14} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    ));

    const renderItem = ({ item }: any) => <BlogCard item={item} />;

    return (
        <PrimaryLayout bgColor={COLORS.primary[100]}>
            <View style={{ flex: 1 }}>
                <FlatList
                    data={BlogList?.data}
                    renderItem={renderItem}
                    keyExtractor={(item) => item._id}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ padding: 16, gap: 12 }}
                    initialNumToRender={10}
                    maxToRenderPerBatch={10}
                    windowSize={5}
                    removeClippedSubviews={true}
                />
            </View>
        </PrimaryLayout>
    )
}

export default HomeScreen