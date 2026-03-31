import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { Button } from 'react-native'
import { PrimaryLayout } from '../../Layout'

const HomeScreen = () => {
    const navigation = useNavigation<any>()

    return (
        <PrimaryLayout>
            <Button title='Next' onPress={() => navigation.navigate('Profile')} />
        </PrimaryLayout>
    )
}

export default HomeScreen