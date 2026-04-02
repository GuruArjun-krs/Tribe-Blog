import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Typo from '../Typo';
import { COLORS } from '../../Utils/colors';
import AppIcon from '../AppIcon';

export const Tooltip = ({ handleStop, handleNext, handlePrev, currentStep, isFirstStep, isLastStep }: any) => {
    return (
        <View style={{ backgroundColor: COLORS.secondary[50], paddingHorizontal: 10, paddingVertical: 8, borderRadius: 20, position: 'relative', width: 250, gap: 8 }}>
            <TouchableOpacity onPress={handleStop} style={{ position: 'absolute', top: -10, right: -5, backgroundColor: COLORS.white, borderWidth: 1, borderColor: '#EBEBEB', borderRadius: 40, padding: 4 }}>
                <AppIcon name='close' size={12} color={'#009155'} />
            </TouchableOpacity>
            <Typo title={currentStep?.text || "No description provided"} color={COLORS.text[600]} />

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                {!isFirstStep && (
                    <TouchableOpacity onPress={handlePrev} style={{ paddingVertical: 4 }}>
                        <Typo title="Previous" color={COLORS.secondary[800]} style={{ opacity: 0.8, fontSize: 12 }} />
                    </TouchableOpacity>
                )}

                <TouchableOpacity onPress={isLastStep ? handleStop : handleNext} style={{ paddingHorizontal: 12, paddingVertical: 4, borderRadius: 15, borderWidth: 1, borderColor: COLORS.secondary[800] }}>
                    <Typo title={isLastStep ? "Finish" : "Next"} color={COLORS.secondary[800]} style={{ fontWeight: 'bold', fontSize: 12 }} />
                </TouchableOpacity>
            </View>
        </View>
    );
};