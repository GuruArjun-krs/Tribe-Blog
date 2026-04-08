import React, { useLayoutEffect } from 'react'
import { ScrollView, TouchableOpacity, View } from 'react-native'

import { PrimaryLayout } from '@/Layout'
import { useFormik } from 'formik'
import { useBlogById, useEditBlog } from '@/Api/Hooks/BlogHook'
import { COLORS } from '@/Utils/colors'
import { HeaderLeft, RightHeader } from '@/Routes/Header'
import { useNavigation } from '@react-navigation/native'
import { AppIcon, Checkbox, ImagePicker, SelectDropdownComp, TextInput, Typo } from '@/Components'
import { useCategoryList } from '@/Api/Hooks/CategoryHook'
import { showToast } from '@/Utils/toastHelper'

const EditBlogScreen = ({ route }: any) => {
    const { id } = route?.params || {}
    const navigation = useNavigation<any>()
    const { data: BlogDetail } = useBlogById(id)
    const { data: CategoryList } = useCategoryList()
    const { mutate: EditApi } = useEditBlog()

    const CategoryOptions = CategoryList?.data?.map((el: any) => ({
        title: el?.label,
        value: el?.value
    }))

    useLayoutEffect(() => {
        navigation.setOptions({
            headerStyle: { backgroundColor: COLORS.editBlog },
            title: 'Edit Blog',
            headerLeft: () => (
                <HeaderLeft onPress={() => navigation.goBack()} />
            ),
            headerRight: () => (
                <RightHeader
                    isLike={false}
                    isProfile={false}
                    isUpdate
                    isSearch={false}
                    onUpdatePress={EditBlogFormik.handleSubmit}
                />
            )
        });
        const focusUnsubscribe = navigation.addListener('focus', () => {
            if (BlogDetail?.data) {
                navigation.setOptions({
                    headerStyle: { backgroundColor: COLORS.editBlog },
                    title: 'Edit Blog',
                    headerLeft: () => (
                        <HeaderLeft onPress={() => navigation.goBack()} />
                    ),
                    headerRight: () => (
                        <RightHeader isLike={false} isProfile={false} isUpdate isSearch={false} />
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

    const EditBlogFormik = useFormik({
        initialValues: {
            title: BlogDetail?.data?.title,
            content: BlogDetail?.data?.content,
            image: BlogDetail?.data?.image,
            isPublished: BlogDetail?.data?.isPublished,
            category: BlogDetail?.data.category
        },
        enableReinitialize: true,
        onSubmit: values => {
            EditApi({
                payload: values,
                id: id
            }, {
                onSuccess: (data) => {
                    showToast('success', 'Blog Updated')
                    navigation.reset({
                        index: 0,
                        routes: [
                            {
                                name: 'BottomTab',
                                params: { screen: 'Home' },
                            },
                        ],
                    });
                },
                onError: (error: any) => {
                    const serverMessage = error?.response?.data?.message;
                    if (serverMessage) {
                        console.log("Validation Error:", serverMessage);
                        showToast('error', serverMessage)
                    } else {
                        showToast('error', error.message)
                        console.log("Generic Error:", error.message);
                    }
                }
            })
        }
    })

    return (
        <PrimaryLayout bgColor={COLORS.editBlog}>
            <View style={{ flex: 1 }}>
                <ScrollView contentContainerStyle={{ padding: 16, gap: 12 }} showsVerticalScrollIndicator={false}>
                    <ImagePicker
                        isBlog
                        image={EditBlogFormik.values.image}
                        onImagePrepared={(val: any) => EditBlogFormik.setFieldValue('image', val)}
                        onClear={() => EditBlogFormik.setFieldValue('image', null)}
                    />
                    <TextInput
                        label='Title'
                        placeHolder='Enter title'
                        value={EditBlogFormik.values.title}
                        onChangeText={EditBlogFormik.handleChange('title')}
                        error={EditBlogFormik.touched.title && EditBlogFormik.errors.title}
                        isMandatory
                    />
                    <SelectDropdownComp
                        label='Category'
                        placeholder='Select Category'
                        value={EditBlogFormik.values.category?.title}
                        onSelect={(val: any) => EditBlogFormik.setFieldValue('category', val?.value)}
                        options={CategoryOptions}
                        error={EditBlogFormik.touched.category && EditBlogFormik.errors.category}
                        isMandatory
                    />
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20 }}>
                        <Checkbox
                            label="Publish"
                            value={EditBlogFormik.values.isPublished === true}
                            onChange={(val) => EditBlogFormik.setFieldValue('isPublished', val)}
                            error={EditBlogFormik.errors.isPublished}
                        />

                        <Checkbox
                            label="Private"
                            value={EditBlogFormik.values.isPublished === false}
                            onChange={(val) => EditBlogFormik.setFieldValue('isPublished', !val)}
                            error={EditBlogFormik.errors.isPublished}
                        />
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                        <AppIcon name='info' type='Feather' size={16} color={COLORS.editBlog} />
                        <Typo title='Want to add new category?' />
                        <TouchableOpacity onPress={() => navigation.navigate('AddCategory')}>
                            <Typo title='Add' color={COLORS.editBlog} style={{ textDecorationLine: 'underline' }} />
                        </TouchableOpacity>
                    </View>
                    <TextInput
                        label='Content'
                        placeHolder='Enter content'
                        value={EditBlogFormik.values.content}
                        onChangeText={EditBlogFormik.handleChange('content')}
                        isTextArea
                        numberOfLines={10}
                        error={EditBlogFormik.touched.content && EditBlogFormik.errors.content}
                        isMandatory
                    />
                </ScrollView>
            </View>
        </PrimaryLayout>
    )
}

export default EditBlogScreen