import React, { useLayoutEffect } from 'react'
import { View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFormik } from 'formik'


import { PrimaryLayout } from '@/Layout'
import { HeaderLeft } from '@/Routes/Header'
import { COLORS } from '@/Utils/colors'
import { useNavigation } from '@react-navigation/native'
import { ButtonComp, TextInput } from '@/Components'
import { RegisterSchema } from '@/Utils/validationSchema'
import { useRegister } from '@/Api/Hooks/AuthHook'
import { showToast } from '@/Utils/toastHelper';

const RegisterScreen = () => {
    const navigation = useNavigation<any>()
    const { mutate: registerApi } = useRegister();


    useLayoutEffect(() => {
        const focusUnsubscribe = navigation.addListener('focus', () => {
            navigation?.setOptions({
                headerStyle: { backgroundColor: COLORS.pink },
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

    const registerFormik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
        },
        validationSchema: RegisterSchema,
        onSubmit: values => {
            registerApi({
                email: values?.email,
                name: values?.name,
                password: values?.password
            }, {
                onSuccess: async (data) => {
                    registerFormik.resetForm()
                    showToast('success', data?.message)
                    navigation.reset({
                        index: 0,
                        routes: 'Login',
                    });
                },
                onError: (error: any) => {
                    showToast('error', error?.message)
                }
            })
        }
    })

    return (
        <PrimaryLayout bgColor={COLORS.pink}>
            <View style={{ flex: 1, padding: 16, justifyContent: 'center', alignItems: 'center', gap: 16 }}>
                <TextInput
                    value={registerFormik.values.name}
                    onChangeText={registerFormik.handleChange('name')}
                    error={registerFormik.touched.name && registerFormik.errors.name}
                    label='Name'
                    placeHolder='Enter your name'
                    isMandatory
                />
                <TextInput
                    value={registerFormik.values.email}
                    onChangeText={registerFormik.handleChange('email')}
                    error={registerFormik.touched.email && registerFormik.errors.email}
                    label='Email'
                    placeHolder='Enter your Email'
                    isMandatory
                />
                <TextInput
                    value={registerFormik.values.password}
                    onChangeText={registerFormik.handleChange('password')}
                    error={registerFormik.touched.password && registerFormik.errors.password}
                    label='Password'
                    placeHolder='Enter your Password'
                    isMandatory
                />

                <TextInput
                    value={registerFormik.values.confirmPassword}
                    onChangeText={registerFormik.handleChange('confirmPassword')}
                    error={registerFormik.touched.confirmPassword && registerFormik.errors.confirmPassword}
                    label='Confirm Password'
                    placeHolder='Re-enter your Password'
                    isMandatory
                />
                <ButtonComp title='Register' onPress={registerFormik.handleSubmit} style={{ backgroundColor: COLORS.pink }} />
            </View>
        </PrimaryLayout>
    )
}

export default RegisterScreen