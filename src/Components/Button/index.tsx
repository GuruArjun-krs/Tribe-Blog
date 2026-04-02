import React from 'react';
import {
    TouchableOpacity,
    StyleSheet,
    ViewStyle,
    StyleProp
} from 'react-native';
import { Typo } from '@/Components';

interface ButtonProps {
    title: string;
    onPress: () => void;
    // Added optional style prop for flexibility
    style?: StyleProp<ViewStyle>;
    // Added disabled state
    disabled?: boolean;
}

const ButtonComp = ({ title, onPress, style, disabled }: ButtonProps) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled}
            activeOpacity={0.7}
            style={[styles.container, style, disabled && styles.disabled]}
            accessibilityRole="button"
            accessibilityLabel={title}
        >
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
        borderColor: '#000',
    },
    disabled: {
        opacity: 0.5,
    },
});

export default ButtonComp;