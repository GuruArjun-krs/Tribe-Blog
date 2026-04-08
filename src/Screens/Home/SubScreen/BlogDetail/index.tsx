import React, { useLayoutEffect } from 'react'
import { PrimaryLayout } from '@/Layout'
import { ScrollView, View } from 'react-native'
import { useBlogById } from '@/Api/Hooks/BlogHook'
import { useNavigation } from '@react-navigation/native'
import { HeaderLeft, RightHeader } from '@/Routes/Header'
import { COLORS } from '@/Utils/colors'
import { Typo } from '@/Components'
import moment from 'moment'
import useFetchLocal from '@/Hooks/useFetchLocal'

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
                <RightHeader isLike={false} isProfile={false} isUpdate={BlogDetail?.data?.createdBy?._id === userId} isSearch={false} />
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
                    <View>
                        <Typo title='Story:' style={{ textDecorationLine: 'underline' }} />
                        <Typo variant='bodyMediumTertiary' title={BlogDetail?.data?.content} />
                    </View>
                </ScrollView>
            </View>
        </PrimaryLayout>
    )
}

export default BlogDetails