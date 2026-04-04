import React, { memo, useContext, useEffect, useLayoutEffect } from 'react'
import { TourGuideZone, useTourGuideController } from 'rn-tourguide';
import { useNavigation } from '@react-navigation/native'
import { FlatList, Image, StyleSheet, Text, View } from 'react-native'

import { PrimaryLayout } from '@/Layout';
import { COLORS } from '@/Utils/colors';
import { RightHeader } from '@/Routes/Header';
import { ContextParent } from '@/Routes/BottomTab';
import { ButtonComp, Typo } from '@/Components';
import { useBlogList } from '@/Api/Hooks/BlogHook';

const HomeScreen = () => {
    const navigation = useNavigation<any>()
    const { start, canStart } = useTourGuideController();
    const layoutContext = useContext(ContextParent);
    const { setLayoutChange } = layoutContext;
    const { data: BlogList, refetch, isFetching } = useBlogList()
    console.log(BlogList, 'BlogList',isFetching);
    useEffect(() => {
        refetch()
    }, [])
    useLayoutEffect(() => {
        const parent = navigation.getParent();
        const focusUnsubscribe = navigation.addListener('focus', () => {
            parent?.setOptions({
                headerStyle: { backgroundColor: COLORS.primary[100] },
                headerRight: () => (
                    <RightHeader isSearch={false} />
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

    const DATA = Array.from({ length: 200 }, (_, index) => ({
        id: index.toString(),
        image: `https://picsum.photos/id/${(index + 10) % 100}/300/200`,
        title: `Product ${index + 1}`,
        subtitle: 'Premium Collection',
        price: `$${(Math.random() * 100 + 20).toFixed(2)}`,
        description: 'This is a brief description of the high-quality product featured in our latest catalog.',
    }));

    const ProductCard = memo(({ item }: any) => (
        <View style={{ backgroundColor: '#fff', borderRadius: 12, marginBottom: 20, overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 3 }}>
            <Image source={{ uri: item.image }} style={{ width: '100%', height: 180, backgroundColor: '#e1e1e1' }} />
            <View style={{ padding: 15 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                    <Typo title={item?.title} variant='bodyLargeSecondary' />
                    <Typo title={item?.price} variant='bodyLargeSecondary' color={COLORS.secondary[500]} />
                </View>
                <Typo title={item?.subtitle} variant='bodyMediumTertiary' />
                <Typo title={item?.description} numberOfLines={2} variant='bodySmallTertiary' color={COLORS.text.disabledSecondary} />
            </View>
        </View>
    ));

    const renderItem = ({ item }: any) => <ProductCard item={item} />;

    return (
        <PrimaryLayout bgColor={COLORS.primary[100]}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                {/* <TourGuideZone zone={1} text={'This is button'} shape={'rectangle'}>
                    <ButtonComp onPress={() => start()} title='Press me' />
                </TourGuideZone> */}
                <FlatList
                    data={DATA}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ padding: 16 }}
                    initialNumToRender={10}    // Loads fewer items initially
                    maxToRenderPerBatch={10}   // Limits items per "chunk" while scrolling
                    windowSize={5}             // Keeps only a small window of items in memory
                    removeClippedSubviews={true} // Unmounts off-screen components
                />
            </View>
        </PrimaryLayout>
    )
}

export default HomeScreen