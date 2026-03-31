import React from 'react'
import { Text } from 'react-native'
import { styles } from './style'

interface TypoType {
    title: string
    variant: keyof typeof styles
    color?: string
    style?: any
}

const Typo = ({ title, variant, color, style, ...props }: TypoType) => {
    return (
        <Text style={[styles[variant], { color: color }, style]} {...props}>{title}</Text>
    )
}

export default Typo