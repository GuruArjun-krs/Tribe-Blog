import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { View } from 'react-native'

import { PrimaryLayout } from '@/Layout'
import { HeaderLeft } from '@/Routes/Header'
import { COLORS } from '@/Utils/colors'
import useFetchLocal from '@/Hooks/useFetchLocal'
import { useFormik } from 'formik'
import { useUserProfile, useUserProfileImageUpdate, useUserProfileUpdate } from '@/Api/Hooks/UserHook'
import { ButtonComp, ImagePicker, SelectDropdownComp, TextInput } from '@/Components'
import { showToast } from '@/Utils/toastHelper'

const EditProfileScreen = () => {
    const navigation = useNavigation<any>()
    const { userId } = useFetchLocal();
    const { data: userProfile } = useUserProfile({ id: userId })
    const { mutate: updateProfile } = useUserProfileUpdate();
    const { mutate: imageUpdate } = useUserProfileImageUpdate()

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
            profileImg: userProfile?.data?.profileImg || null,
        },
        enableReinitialize: true,
        onSubmit: values => {
            console.log(values, 'values');
            imageUpdate(values?.profileImg, {
                onSuccess: (data) => {
                    console.log(data, '---------');
                    if (data?.success) {
                        const newPayload = {
                            name: values?.name,
                            nickname: values?.nickname || '',
                            bio: values?.bio || '',
                            gender: values?.gender || '',
                            dob: values?.dob || '',
                            email: values?.email || '',
                            profileImg: data?.data?.profileImg || null,
                        }
                        updateProfile({ payload: newPayload, id: userId }, {
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

                },
                onError: (error: any) => {
                    const serverMessage = error?.response?.data?.message;

                    if (serverMessage) {
                        console.log("Validation Error:", serverMessage);
                    } else {
                        console.log("Generic Error:", error.message);
                    }
                }
            })
        }
    })

    return (
        <PrimaryLayout bgColor={COLORS.secondary[700]}>
            <View style={{ flex: 1, padding: 16, gap: 16 }}>
                <ImagePicker
                    image={profileFormik.values.profileImg}
                    onImagePrepared={(val: any) => profileFormik.setFieldValue('profileImg', val)}
                    onClear={() => profileFormik.setFieldValue('profileImg', null)}
                />
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
                    onSelect={(val: any) => profileFormik.setFieldValue('gender', val?.id)}
                    options={[
                        { title: 'Male', id: 'Male' },
                        { title: 'Female', id: 'Female' }
                    ]}
                />
                <ButtonComp title='Update Profile' onPress={profileFormik.handleSubmit} style={{ backgroundColor: COLORS.secondary[700] }} />
            </View>
        </PrimaryLayout>
    )
}

export default EditProfileScreen