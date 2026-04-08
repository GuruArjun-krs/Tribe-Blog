import React, { useLayoutEffect } from 'react'
import moment from 'moment'
import { useNavigation } from '@react-navigation/native'
import { Dimensions, Image, ScrollView, View } from 'react-native'

import { PrimaryLayout } from '@/Layout'
import { useBlogById } from '@/Api/Hooks/BlogHook'
import { HeaderLeft, RightHeader } from '@/Routes/Header'
import { COLORS } from '@/Utils/colors'
import { Typo } from '@/Components'
import useFetchLocal from '@/Hooks/useFetchLocal'

const { width } = Dimensions.get('window')

const BlogDetails = ({ route }: any) => {
    const { id } = route?.params
    const { userId } = useFetchLocal()
    const navigation = useNavigation<any>()
    const { data: BlogDetail } = useBlogById(id)

    useLayoutEffect(() => {
        navigation.setOptions({
            headerStyle: { backgroundColor: COLORS.purple },
            title: `${BlogDetail?.data?.title || 'Blog'} by ${BlogDetail?.data?.createdBy?.name || 'Author'}`,
            headerLeft: () => (
                <HeaderLeft onPress={() => navigation.goBack()} />
            ),
            headerRight: () => (
                <RightHeader
                    isLike={false}
                    isProfile={false}
                    isUpdate={BlogDetail?.data?.createdBy?._id === userId}
                    isSearch={false}
                    onUpdatePress={() => navigation.navigate('EditBlog', { id: id })}
                />
            )
        });
        const focusUnsubscribe = navigation.addListener('focus', () => {
            if (BlogDetail?.data) {
                navigation.setOptions({
                    headerStyle: { backgroundColor: COLORS.purple },
                    title: `${BlogDetail.data.title || 'Blog'} by ${BlogDetail.data.createdBy?.name || 'Author'}`,
                    headerLeft: () => (
                        <HeaderLeft onPress={() => navigation.goBack()} />
                    ),
                    headerRight: () => (
                        <RightHeader isLike={false} isProfile={false} isUpdate={BlogDetail?.data?.createdBy?._id === userId} isSearch={false} />
                    )
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
                title: null,
                headerRight: null
            });
        });

        return () => {
            focusUnsubscribe();
            blurUnsubscribe();
        };
    }, [navigation, BlogDetail, id]);

    return (
        <PrimaryLayout bgColor={COLORS.purple}>
            <View style={{ flex: 1 }}>
                <ScrollView contentContainerStyle={{ padding: 16, gap: 12 }} showsVerticalScrollIndicator={false}>
                    <View style={{ flexDirection: 'column' }}>
                        <Typo title='Author' />
                        <Typo variant='bodyMediumPrimary' title={BlogDetail?.data?.createdBy?.name} />
                    </View>
                    <View style={{ flexDirection: 'column' }}>
                        <Typo title='Published On' />
                        <Typo variant='bodyMediumSecondary' title={moment(BlogDetail?.data?.createdAt).format("MMM D, YYYY")} />
                    </View>
                    <View style={{ flexDirection: 'column' }}>
                        <Typo title='Category' />
                        <Typo variant='bodyMediumSecondary' title={BlogDetail?.data.category.label} />
                    </View>
                    <View style={{ gap: 8 }}>
                        <Typo title='Story:' style={{ textDecorationLine: 'underline' }} />
                        <View style={{ width: width - 32, height: 200, borderRadius: 16 }}>
                            <Image source={{ uri: BlogDetail?.data.image }} style={{ width: '100%', height: '100%', borderRadius: 16 }} />
                        </View>
                        <Typo variant='bodyMediumTertiary' title={BlogDetail?.data?.content} />
                    </View>
                </ScrollView>
            </View>
        </PrimaryLayout>
    )
}

export default BlogDetails