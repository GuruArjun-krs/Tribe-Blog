import { useCallback } from 'react';
import { BackHandler, ToastAndroid } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

const useDoubleBackExit = () => {
    useFocusEffect(
        useCallback(() => {
            let lastBackPressed = 0;
            const onBackPress = () => {
                const now = Date.now();
                if (lastBackPressed && now - lastBackPressed < 2000) {
                    BackHandler.exitApp();
                    return true;
                } else {
                    lastBackPressed = now;
                    ToastAndroid.show('Press again to exit app', ToastAndroid.SHORT);
                    return true;
                }
            };
            const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
            return () => subscription.remove();
        }, [])
    );
};

export default useDoubleBackExit;
