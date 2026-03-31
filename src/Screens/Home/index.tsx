import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { Button, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const HomeScreen = () => {
    const navigation = useNavigation<any>()

    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Button
                onPress={() => navigation.navigate('Profile')}
                title='Go to Profile'
            />
        </SafeAreaView >
    )
}

export default HomeScreen