import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';

const ProfileScreen = () => {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <StatusBar backgroundColor={'blue'} />

        </SafeAreaView>
    )
}

export default ProfileScreen