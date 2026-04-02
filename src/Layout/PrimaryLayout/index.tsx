import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'react-native'
import { useIsFocused } from '@react-navigation/native';
import { COLORS } from '@/Utils/colors';
interface LayoutType {
    appStyle?: any
    children: any
    bgColor?: string
}

const PrimaryLayout = ({ appStyle, children, bgColor = COLORS.white }: LayoutType) => {
    const isFocused = useIsFocused();
    const isLightBackground = bgColor === COLORS.white || bgColor === '#FFFFFF';

    return (
        <SafeAreaView style={[{ flex: 1, backgroundColor: COLORS.white }, appStyle]}>
            {isFocused && (
                <StatusBar
                    backgroundColor={bgColor}
                    barStyle={isLightBackground ? 'dark-content' : 'light-content'}
                    animated={true}
                    translucent={false}
                />
            )}
            {children}
        </SafeAreaView>
    )
}

export default PrimaryLayout