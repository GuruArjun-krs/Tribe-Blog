import React from 'react';
import { View, TextInput as RNTextInput, StyleSheet, TextInputProps, TextStyle, ViewStyle, Text } from 'react-native';
import { COLORS } from '@/Utils/colors';
import { Typo } from '@/Components';

interface Props extends TextInputProps {
    label?: string;
    error?: any;
    containerStyle?: ViewStyle;
    inputStyle?: TextStyle;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    placeHolder?: string;
    isMandatory?: boolean;
    isTextArea?: boolean;
    numberOfLines?: number;
}

const TextInput = ({ label, error, containerStyle, inputStyle, leftIcon, rightIcon, placeHolder = 'Enter', isMandatory, isTextArea = false, numberOfLines = 4, ...props }: Props) => {
    return (
        <View style={[{ width: '100%', gap: 8 }, containerStyle]}>
            {label && (
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                    <Typo variant="bodyMediumTertiary" title={label} color={COLORS.black} />
                    {isMandatory && (
                        <Text style={{ color: COLORS.status.error, transform: [{ translateY: -2 }] }}>
                            *
                        </Text>
                    )}
                </View>
            )}

            <View style={[
                styles.inputWrapper,
                error ? { borderColor: COLORS.status.error } : null,
                { backgroundColor: COLORS.white },
                isTextArea && { height: 120, alignItems: 'flex-start' }
            ]}>
                {leftIcon && <View style={{ marginRight: 10 }}>{leftIcon}</View>}

                <RNTextInput
                    placeholder={placeHolder}
                    placeholderTextColor={COLORS.text.disabled}
                    multiline={isTextArea}
                    numberOfLines={isTextArea ? numberOfLines : 1}
                    textAlignVertical={isTextArea ? 'top' : 'center'}
                    style={[{ color: COLORS.text[400], flex: 1, fontSize: 14, height: '100%' }, inputStyle]}
                    {...props}
                />

                {rightIcon && <View style={{ marginLeft: 10 }}>{rightIcon}</View>}
            </View>

            {error && (
                <Typo variant="bodySmallTertiary" title={error} color={COLORS.status.error} style={{ paddingLeft: 4 }} />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: COLORS.text.disabled,
        borderRadius: 12,
        paddingHorizontal: 12,
    },
});

export default TextInput;