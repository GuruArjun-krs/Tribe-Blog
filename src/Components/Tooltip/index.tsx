import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Typo from '../Typo';
import { COLORS } from '../../Utils/colors';
import AppIcon from '../AppIcon';

export const Tooltip = ({ handleStop, currentStep }: any) => {
    return (
        <View style={{ backgroundColor: '#009155', paddingHorizontal: 10, paddingVertical: 8, borderRadius: 20, position: 'relative', width: 250 }}>
            <TouchableOpacity onPress={handleStop} style={{ position: 'absolute', top: -10, right: -5, backgroundColor: COLORS.white, borderWidth: 1, borderColor: '#EBEBEB', borderRadius: 40, padding: 4 }}>
                <AppIcon name='close' size={12} color={'#009155'} />
            </TouchableOpacity>
            <Typo title={currentStep?.text || "No description provided"} color={COLORS.white} />
        </View>
    );
};