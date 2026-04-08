import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { AppIcon, Typo } from '@/Components';
import { COLORS } from '@/Utils/colors';

interface CheckboxType {
    value: boolean;
    onChange: (val: boolean) => void;
    label?: string;
    error?: any;
}

const CustomCheckbox = ({ value, onChange, label, error }: CheckboxType) => {
    return (
        <>
            <Pressable onPress={() => onChange(!value)} style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 4, gap: 4 }} accessibilityRole="checkbox" accessibilityState={{ checked: value }}>
                <View style={[styles.checkbox, value && { backgroundColor: COLORS.primary[500], borderColor: COLORS.primary[500] }, error && { borderColor: COLORS.status.error }]}>
                    {value && (
                        <AppIcon
                            name="check"
                            size={18}
                            color={COLORS.white || '#fff'}
                        />
                    )}
                </View>

                {label && (
                    <Typo title={label} variant='bodyMediumTertiary' style={[error && { color: COLORS.status.error }]} />
                )}
            </Pressable>

            {error && (
                <Typo
                    variant="bodySmallTertiary"
                    title={error}
                    color={COLORS.status.error}
                />
            )}
        </>
    );
};

const styles = StyleSheet.create({
    checkbox: {
        width: 22,
        height: 22,
        borderWidth: 2,
        borderColor: '#333',
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
});

export default CustomCheckbox;