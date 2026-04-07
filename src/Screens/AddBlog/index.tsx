import React, { useContext, useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useFormik } from 'formik'
import { ScrollView, TouchableOpacity, View } from 'react-native'

import { useAddBlog } from '@/Api/Hooks/BlogHook'
import { AppIcon, SelectDropdownComp, TextInput, Typo } from '@/Components'
import { PrimaryLayout } from '@/Layout'
import { ContextParent } from '@/Routes/BottomTab'
import { HeaderLeft, RightHeader } from '@/Routes/Header'
import { COLORS } from '@/Utils/colors'
import { showToast } from '@/Utils/toastHelper'
import { AddBlogSchema } from '@/Utils/validationSchema'
import { useCategoryList } from '@/Api/Hooks/CategoryHook'

const AddBlog = () => {
    const navigation = useNavigation<any>()
    const layoutContext = useContext(ContextParent);
    const { setLayoutChange } = layoutContext;
    const { data: CategoryList } = useCategoryList()
    const { mutate: addBlogApi } = useAddBlog();

    const CategoryOptions = CategoryList?.data?.map((el: any) => ({
        title: el?.label,
        value: el?.value
    }))

    useLayoutEffect(() => {
        const parent = navigation.getParent();
        const focusUnsubscribe = navigation.addListener('focus', () => {
            parent?.setOptions({
                headerStyle: { backgroundColor: COLORS.secondary[700] },
                title: 'Add New Blog',
                headerShown: true,
                headerLeft: () => (
                    <HeaderLeft onPress={() => navigation.navigate('BottomTab', { screen: 'Home' })} />
                ),
                headerRight: () => (
                    <RightHeader isLike={false} isProfile={false} isSearch={false} isPost postPress={addBlogFormik.handleSubmit} />
                )
            });
            setLayoutChange((prev: any) => ({
                ...prev,
                tabBgColor: COLORS.secondary[700],
            }));
        });
        const blurUnsubscribe = navigation.addListener('blur', () => {
            parent?.setOptions({
                headerStyle: { backgroundColor: COLORS.white },
                headerLeft: null,
                headerRight: null
            });
        });

        return () => {
            focusUnsubscribe();
            blurUnsubscribe();
        };
    }, [navigation]);

    const addBlogFormik = useFormik({
        initialValues: {
            title: '',
            category: '',
            content: ''
        },
        enableReinitialize: true,
        validationSchema: AddBlogSchema,
        onSubmit: values => {
            addBlogApi(values, {
                onSuccess: async (data) => {
                    showToast('success', 'Blog Created successfully.')
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
                    console.log(error, '-----err');
                }
            })
        }
    })

    return (
        <PrimaryLayout bgColor={COLORS.secondary[700]}>
            <View style={{ flex: 1, padding: 16 }}>
                <ScrollView contentContainerStyle={{ gap: 16 }} showsVerticalScrollIndicator={false}>
                    <TextInput
                        label='Title'
                        placeHolder='Enter title'
                        value={addBlogFormik.values.title}
                        onChangeText={addBlogFormik.handleChange('title')}
                        error={addBlogFormik.touched.title && addBlogFormik.errors.title}
                        isMandatory
                    />
                    <SelectDropdownComp
                        label='Category'
                        placeholder='Select Category'
                        value={addBlogFormik.values.category}
                        onSelect={(val: any) => { console.log(val, 'val'), addBlogFormik.setFieldValue('category', val?.value) }}
                        options={CategoryOptions}
                        error={addBlogFormik.touched.category && addBlogFormik.errors.category}
                        isMandatory
                    />
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                        <AppIcon name='info' type='Feather' size={16} color={COLORS.status.success} />
                        <Typo title='Want to add new category?' />
                        <TouchableOpacity onPress={() => navigation.navigate('AddCategory')}>
                            <Typo title='Add' color={COLORS.status.success} style={{ textDecorationLine: 'underline' }} />
                        </TouchableOpacity>
                    </View>
                    <TextInput
                        label='Content'
                        placeHolder='Enter content'
                        value={addBlogFormik.values.content}
                        onChangeText={addBlogFormik.handleChange('content')}
                        isTextArea
                        numberOfLines={10}
                        error={addBlogFormik.touched.content && addBlogFormik.errors.content}
                        isMandatory
                    />
                </ScrollView>
            </View>
        </PrimaryLayout>
    )
}

export default AddBlog