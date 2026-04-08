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
    ellipsizeMode?: "head" | "middle" | "tail" | "clip"
}

const Typo = ({ title, variant = 'bodyMediumTertiary', color = COLORS.black, style, ellipsizeMode = 'tail', numberOfLines, ...props }: TypoType) => {

    return (
        <Text ellipsizeMode={ellipsizeMode} numberOfLines={numberOfLines} style={[styles[variant], { color: color }, style]} {...props}>
            {title}
        </Text>
    )
}

export default Typo