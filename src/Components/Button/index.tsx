import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Typo } from '@/Components'

interface buttonType {
    title: string,
    onPress: () => void
}

const ButtonComp = ({ title, onPress }: buttonType) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <Typo title={title} />
        </TouchableOpacity>
    )
}

export default ButtonComp