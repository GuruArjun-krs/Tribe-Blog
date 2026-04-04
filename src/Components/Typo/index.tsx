import React from 'react'
import { Text } from 'react-native'
import { styles } from './style'
import { COLORS } from '../../Utils/colors'

interface TypoType {
    title: string
    variant?: keyof typeof styles
    color?: string
    style?: any
    numberOfLines?: number
}

const Typo = ({ title, variant = 'bodyMediumTertiary', color = COLORS.black, style, ...props }: TypoType) => {
    return (
        <Text style={[styles[variant], { color: color }, style]} {...props}>{title}</Text>
    )
}

export default Typo