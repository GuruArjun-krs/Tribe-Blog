import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface localType {
    isLogin: string
    accessToken: string
    userId: string
    userName: string
    role: string
    loading: boolean
}

const useFetchLocal = () => {
    const [values, setValues] = useState<localType>({
        isLogin: '',
        accessToken: '',
        userId: '',
        userName: '',
        role: '',
        loading: true
    });

    useEffect(() => {
        const fetchAll = async () => {
            const results = await Promise.all([
                AsyncStorage.getItem('login'),
                AsyncStorage.getItem('accessToken'),
                AsyncStorage.getItem('userId'),
                AsyncStorage.getItem('userName'),
                AsyncStorage.getItem('role'),
            ]);

            setValues({
                isLogin: results[0] || '',
                accessToken: results[1] || '',
                userId: results[2] || '',
                userName: results[3] || '',
                role: results[4] || '',
                loading: false
            });
        };

        fetchAll();
    }, []);

    return values;
};

export default useFetchLocal;