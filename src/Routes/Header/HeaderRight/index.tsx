import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { TouchableOpacity, View } from 'react-native'

import { AppIcon } from '@/Components'
import { COLORS } from '@/Utils/colors'

interface rightHeaderType {
    isSearch?: boolean
    isProfile?: boolean
    isLike?: boolean
}

const RightHeader = ({ isSearch = true, isProfile = true, isLike = true }: rightHeaderType) => {
    const navigation = useNavigation<any>()

    const headerStack = [
        {
            key: 'search',
            name: 'search',
            type: 'Feather' as const,
            size: 20,
            color: COLORS.white,
            onPress: () => navigation.navigate('Search'),
            display: isSearch
        },
        {
            key: 'user',
            name: 'user',
            type: 'Feather' as const,
            size: 20,
            color: COLORS.white,
            onPress: () => navigation.navigate('BottomTab', { screen: 'Profile' }),
            display: isProfile
        },
        {
            key: 'like',
            name: 'heart',
            type: 'Feather' as const,
            size: 20,
            color: COLORS.white,
            onPress: () => navigation.navigate('Like'),
            display: isLike
        }
    ]

    return (
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 16 }}>
            {headerStack?.filter((val) => val?.display)?.map((el) => (
                <TouchableOpacity onPress={el?.onPress} key={el?.key}>
                    <AppIcon name={el?.name} type={el?.type} size={el?.size} color={el?.color} />
                </TouchableOpacity>
            ))}
        </View>
    )
}

export default RightHeader