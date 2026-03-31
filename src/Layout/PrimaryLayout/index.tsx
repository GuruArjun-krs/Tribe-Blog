import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS } from '../../Utils/colors'
import { StatusBar } from 'react-native'

interface LayoutType {
    appStyle?: any
    children: any
    bgColor?: string
}

const PrimaryLayout = ({ appStyle, children, bgColor = COLORS.white }: LayoutType) => {
    return (
        <SafeAreaView style={[{ flex: 1, backgroundColor: COLORS.white }, appStyle]}>
            <StatusBar backgroundColor={bgColor} />
            {children}
        </SafeAreaView>
    )
}

export default PrimaryLayout