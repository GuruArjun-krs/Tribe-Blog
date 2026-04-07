import { useAddCategory } from '@/Api/Hooks/CategoryHook'
import { ButtonComp, TextInput, Typo } from '@/Components'
import { COLORS } from '@/Utils/colors'
import { showToast } from '@/Utils/toastHelper'
import { AddCategorySchema } from '@/Utils/validationSchema'
import { useNavigation } from '@react-navigation/native'
import { useFormik } from 'formik'
import React, { useLayoutEffect } from 'react'
import { Dimensions, View } from 'react-native'

const { height } = Dimensions.get('window')

const AddCategory = () => {
    const navigation = useNavigation<any>()
    const { mutate: addCategory } = useAddCategory()

    useLayoutEffect(() => {
        const parent = navigation.getParent();
        const focusUnsubscribe = navigation.addListener('focus', () => {
            parent?.setOptions({
                headerStyle: { backgroundColor: COLORS.secondary[700] },
                title: 'Add New Category',
            });
        });
        const blurUnsubscribe = navigation.addListener('blur', () => {
            parent?.setOptions({
                headerStyle: { backgroundColor: COLORS.white },
            });
        });

        return () => {
            focusUnsubscribe();
            blurUnsubscribe();
        };
    }, [navigation]);

    const AddCategoryFormik = useFormik({
        initialValues: {
            name: '',
            description: ''
        },
        enableReinitialize: true,
        validationSchema: AddCategorySchema,
        onSubmit: values => {
            addCategory(values, {
                onSuccess: (data) => {
                    showToast('success', 'Category Added')
                    navigation.reset({
                        index: 0,
                        routes: [
                            {
                                name: 'BottomTab',
                                params: { screen: 'AddBlog' },
                            },
                        ],
                    });
                    console.log(data, '==============ata');

                },
                onError: (error: any) => {
                    const serverMessage = error?.response?.data?.message;
                    if (serverMessage) {
                        showToast('error', serverMessage)
                        console.log("Validation Error:", serverMessage);
                    } else {
                        showToast('error', error.message)
                        console.log("Generic Error:", error.message);
                    }

                }
            })
        }
    })

    return (
        <View style={{ padding: 20, gap: 16, backgroundColor: COLORS.white, paddingBottom: height * 0.05 }}>
            <Typo title='Add Category' variant='titleLargeSecondary' color={COLORS.status.warning} />
            <TextInput
                label='Category Name'
                placeHolder='Enter title'
                value={AddCategoryFormik.values.name}
                onChangeText={AddCategoryFormik.handleChange('name')}
                error={AddCategoryFormik.touched.name && AddCategoryFormik.errors.name}
                isMandatory
            />
            <TextInput
                label='Description'
                placeHolder='Enter description'
                value={AddCategoryFormik.values.description}
                onChangeText={AddCategoryFormik.handleChange('description')}
                error={AddCategoryFormik.touched.description && AddCategoryFormik.errors.description}
                isMandatory
                isTextArea
            />
            <ButtonComp title='Add Category' onPress={AddCategoryFormik.handleSubmit} style={{ backgroundColor: COLORS.status.warning }} />
        </View>
    )
}

export default AddCategory