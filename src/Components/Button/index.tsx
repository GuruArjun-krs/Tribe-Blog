import React from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { Typo } from '@/Components';
import { COLORS } from '@/Utils/colors';
interface ButtonProps {
    title: string;
    onPress: () => void;
    style?: StyleProp<ViewStyle>;
    disabled?: boolean;
    textColor?: string
}

const ButtonComp = ({ title, onPress, style, disabled, textColor = COLORS.white }: ButtonProps) => {
    return (
        <TouchableOpacity onPress={onPress} disabled={disabled} activeOpacity={0.7} style={[styles.container, style, disabled && { opacity: 0.5 }]}>
            <Typo title={title} color={textColor} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        borderWidth: 1,
        paddingVertical: 10,
        paddingHorizontal: 12,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        borderColor: COLORS.text.disabled,
    },
});

export default ButtonComp;