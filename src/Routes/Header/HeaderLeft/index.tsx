import { AppIcon } from '@/Components'
import { COLORS } from '@/Utils/colors'
import React from 'react'
import { TouchableOpacity, View } from 'react-native'

const HeaderLeft = ({ onPress }: { onPress: () => void }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <AppIcon name='chevron-left' type='Feather' size={20} color={COLORS.white} />
        </TouchableOpacity>
    )
}

export default HeaderLeft