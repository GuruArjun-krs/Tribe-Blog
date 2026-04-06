import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { View } from 'react-native'

import { PrimaryLayout } from '@/Layout'
import { HeaderLeft } from '@/Routes/Header'
import { COLORS } from '@/Utils/colors'
import useFetchLocal from '@/Hooks/useFetchLocal'
import { useFormik } from 'formik'
import { useUserProfile, useUserProfileUpdate } from '@/Api/Hooks/UserHook'
import { ButtonComp, SelectDropdownComp, TextInput } from '@/Components'
import { showToast } from '@/Utils/toastHelper'

const EditProfileScreen = () => {
    const navigation = useNavigation<any>()
    const { userId } = useFetchLocal();
    const { data: userProfile } = useUserProfile({ id: userId })
    const { mutate: updateProfile } = useUserProfileUpdate();

    useLayoutEffect(() => {
        const focusUnsubscribe = navigation.addListener('focus', () => {
            navigation?.setOptions({
                headerStyle: { backgroundColor: COLORS.secondary[700] },
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

    const profileFormik = useFormik({
        initialValues: {
            name: userProfile?.data?.name || '',
            nickname: userProfile?.data?.nickname || '',
            bio: userProfile?.data?.bio || '',
            gender: userProfile?.data?.gender || '',
            dob: userProfile?.data?.dob || '',
            email: userProfile?.data?.email || '',
            profileImg: userProfile?.data?.profileImg || '',
        },
        enableReinitialize: true,
        onSubmit: values => {
            updateProfile({ payload: values, id: userId }, {
                onSuccess: (data) => {
                    if (data?.success) {
                        showToast('success', 'Profile updated successfully.')
                        navigation.reset({
                            index: 0,
                            routes: [
                                {
                                    name: 'BottomTab',
                                    params: { screen: 'Profile' },
                                },
                            ],
                        });
                    }
                },
                onError: (error) => {
                    console.error('Update failed:', error);
                }
            });
        }
    })

    return (
        <PrimaryLayout bgColor={COLORS.secondary[700]}>
            <View style={{ flex: 1, padding: 16, gap: 16 }}>
                <TextInput
                    value={profileFormik.values.name}
                    onChangeText={profileFormik.handleChange('name')}
                    placeHolder='Enter your name'
                    label='Name'
                    error={profileFormik.touched.name && profileFormik.errors.name}
                    isMandatory
                />
                <TextInput
                    value={profileFormik.values.nickname}
                    onChangeText={profileFormik.handleChange('nickname')}
                    placeHolder='Enter your nickname'
                    label='Nickname'
                    error={profileFormik.touched.nickname && profileFormik.errors.nickname}
                />
                <TextInput
                    value={profileFormik.values.bio}
                    onChangeText={profileFormik.handleChange('bio')}
                    placeHolder='Enter your bio'
                    label='Bio'
                    error={profileFormik.touched.bio && profileFormik.errors.bio}
                    isTextArea
                />
                <TextInput
                    value={profileFormik.values.email}
                    onChangeText={profileFormik.handleChange('email')}
                    placeHolder='Enter your email'
                    label='Email'
                    error={profileFormik.touched.email && profileFormik.errors.email}
                    isMandatory
                />
                <SelectDropdownComp
                    value={profileFormik.values.gender}
                    onSelect={(val) => profileFormik.setFieldValue('gender', val)}
                    options={[
                        { title: 'Male', id: 'male' },
                        { title: 'Female', id: 'female' }
                    ]}
                />
                <ButtonComp title='Update Profile' onPress={profileFormik.handleSubmit} style={{ backgroundColor: COLORS.secondary[700] }} />
            </View>
        </PrimaryLayout>
    )
}

export default EditProfileScreen