import React from 'react';
import { View, StyleSheet } from 'react-native';

import { Typo } from "../../Components"
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const toastStyle: any = {
    error: {
        backgroundColor: '#FCEDEB',
        textColor: '#DB3B21',
        borderColor: '#DB3B21',
        borderLeft: '#DB3B21'
    },
    success: {
        backgroundColor: '#F2FFF7',
        textColor: '#1AAA55',
        borderColor: '#1AAA55',
        borderLeft: "#1AAA55",
    },
    info: {
        backgroundColor: '#EAF3FD',
        textColor: '#007AFF',
        borderColor: '#007AFF',
    },
};

const CustomToast = ({ text1, props }: any) => {
    const { type = 'info', message } = props;
    const style = toastStyle[type] || toastStyle.info;
    const insets = useSafeAreaInsets()

    return (
        <View style={[styles.container, { bottom: insets.bottom, backgroundColor: style.backgroundColor, borderColor: style.borderColor, borderLeftColor: style.borderLeft || style.borderColor, borderLeftWidth: 1 }]}>
            <Typo style={{ color: style.textColor, fontSize: 12 }} title={message || text1} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 8,
        padding: 12,
        elevation: 4,
        borderWidth: 1,
        flexDirection: 'row',
        gap: 15,
        alignItems: 'center'
    },
    title: {
        fontWeight: 'bold',
        fontSize: 14,
        marginBottom: 4,
    },
    message: {
        fontSize: 13,
    },
});

export default CustomToast;
