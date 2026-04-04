import React from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { Typo } from '@/Components';
import { COLORS } from '@/Utils/colors';
interface ButtonProps {
    title: string;
    onPress: () => void;
    style?: StyleProp<ViewStyle>;
    disabled?: boolean;
}

const ButtonComp = ({ title, onPress, style, disabled }: ButtonProps) => {
    return (
        <TouchableOpacity onPress={onPress} disabled={disabled} activeOpacity={0.7} style={[styles.container, style, disabled && { opacity: 0.5 }]}>
            <Typo title={title} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        paddingVertical: 12,
        paddingHorizontal: 16,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        borderColor: COLORS.text.disabled,
    },
});

export default ButtonComp;