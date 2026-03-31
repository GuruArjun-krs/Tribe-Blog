import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { getHeaderTitle } from '@react-navigation/elements';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const AppHeader = ({ navigation, route, options, back }: any) => {
    const title = getHeaderTitle(options, route.name);
    const insets = useSafeAreaInsets()

    return (
        <View style={[styles.headerContainer, { paddingTop: insets.top, paddingBottom: 12 }]}>
          
        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        elevation: 10
    },
    titleText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    backText: {
        fontSize: 24,
        color: '#007AFF',
    },
});

export default AppHeader;