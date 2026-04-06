import React, { useLayoutEffect } from 'react'
import { View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFormik } from 'formik'

import { ButtonComp, TextInput } from '@/Components'
import { PrimaryLayout } from '@/Layout'
import { HeaderLeft } from '@/Routes/Header'
import { COLORS } from '@/Utils/colors'
import { LoginSchema } from '@/Utils/validationSchema'
import { useLogin } from '@/Api/Hooks/AuthHook'

const LoginScreen = () => {
    const navigation = useNavigation<any>()
    const { mutate: loginApi } = useLogin();

    useLayoutEffect(() => {
        const focusUnsubscribe = navigation.addListener('focus', () => {
            navigation?.setOptions({
                headerStyle: { backgroundColor: COLORS.secondary[300] },
                headerLeft: () => (
                    <HeaderLeft onPress={() => navigation.navigate('BottomTab', { screen: 'Profile' })} />
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

    const loginFormik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: LoginSchema,
        onSubmit: values => {
            loginApi({
                email: values.email,
                password: values.password
            },
                {
                    onSuccess: async (data) => {
                        await AsyncStorage.setItem('login', 'success');
                        await AsyncStorage.setItem('accessToken', data?.data?.token || "");
                        await AsyncStorage.setItem('userId', data?.data?._id || "");
                        await AsyncStorage.setItem('userName', data?.data?.name || "");
                        await AsyncStorage.setItem('role', String(data?.data?.isAdmin))
                        navigation.reset({
                            index: 0,
                            routes: [
                                {
                                    name: 'BottomTab',
                                    params: { screen: 'Profile' },
                                },
                            ],
                        });
                    },
                    onError: (error: any) => {
                        loginFormik.setFieldError("password", error?.response?.data?.message)
                    }
                }
            )
        }
    })

    return (
        <PrimaryLayout bgColor={COLORS.secondary[300]}>
            <View style={{ flex: 1, padding: 16, justifyContent: 'center', alignItems: 'center', gap: 16 }}>
                <TextInput
                    value={loginFormik.values.email}
                    onChangeText={loginFormik.handleChange('email')}
                    error={loginFormik.touched.email && loginFormik.errors.email}
                    label='Email'
                    placeHolder='Enter your Email'
                    isMandatory
                />
                <TextInput
                    value={loginFormik.values.password}
                    onChangeText={loginFormik.handleChange('password')}
                    error={loginFormik.touched.password && loginFormik.errors.password}
                    label='Password'
                    placeHolder='Enter your Password'
                    isMandatory
                />
                <ButtonComp
                    title='Login'
                    style={{ backgroundColor: COLORS.secondary[300] }}
                    onPress={loginFormik.handleSubmit}
                />
            </View>
        </PrimaryLayout>
    )
}

export default LoginScreen