import React from 'react'
import { Platform, StatusBar, StyleSheet, View, ViewStyle, Dimensions, Text } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown'
import { AppIcon, Typo } from '@/Components';
import { COLORS } from '@/Utils/colors';

export interface DropdownItem {
    title: string;
    id: string | number;
}

interface SelectDropdownProps {
    options: DropdownItem[];
    placeholder?: string;
    onSelect: (item: DropdownItem, index: number) => void;
    value?: any;
    buttonStyle?: ViewStyle;
    search?: boolean
    label?: string
    isMandatory?: boolean
    containerStyle?: any
    error?: any
}

const { width } = Dimensions.get('window')

const SelectDropdownComp = ({ options, placeholder = 'Select', onSelect, value, buttonStyle, search, label, isMandatory, containerStyle, error }: SelectDropdownProps) => {
    const selectedValue = options?.find(item => item?.title === value) || null;

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
            <SelectDropdown
                key={value}
                statusBarTranslucent
                data={options}
                defaultValue={selectedValue}
                searchPlaceHolder={'Search...'}
                searchInputTxtColor={COLORS.black}
                searchPlaceHolderColor={COLORS.text.disabled}
                search={search}
                onSelect={onSelect}
                renderButton={(selectedItem, isOpened) => {
                    return (
                        <View style={[styles.dropdownButtonStyle, { borderColor: error ? COLORS.status.error : COLORS.text.disabled, }, buttonStyle]}>
                            <Typo numberOfLines={1} ellipsizeMode='tail' style={{ fontSize: 14, color: (placeholder && !selectedItem?.title) ? COLORS.text.disabled : COLORS.text[400] }} title={selectedItem?.title || placeholder} />
                            <AppIcon name={isOpened ? 'chevron-up' : 'chevron-down'} type="Feather" size={14} color={COLORS.black} />
                        </View>
                    );
                }}
                renderItem={(item, index, isSelected) => {
                    return (
                        <View style={{ ...styles.dropdownItemStyle, ...(isSelected && { backgroundColor: COLORS.text.disabled }) }}>
                            <Typo numberOfLines={1} ellipsizeMode='tail' style={{ fontSize: 14, width: width * 0.4, color: isSelected ? COLORS.primary[500] : '#828692', fontWeight: isSelected ? 800 : 500 }} title={item.title} />
                        </View>
                    );
                }}
                showsVerticalScrollIndicator={false}
                dropdownStyle={{ backgroundColor: COLORS.white, borderRadius: 8, marginTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 0) : 0 }}
            />
            {error && (
                <Typo variant="bodySmallTertiary" title={error} color={COLORS.status.error} style={{ paddingLeft: 4 }} />
            )}
        </View>
    )
}

export default SelectDropdownComp

const styles = StyleSheet.create({
    dropdownButtonStyle: {
        backgroundColor: COLORS.white,
        borderRadius: 12,
        padding: 12,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        justifyContent: 'space-between',
        borderWidth: 1,
    },
    dropdownItemStyle: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        gap: 10,
    },
});