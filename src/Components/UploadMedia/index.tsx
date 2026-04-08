import React, { useEffect, useState } from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';

import AppIcon from '../AppIcon';
import { COLORS } from '@/Utils/colors';

const ImagePicker = ({ onImagePrepared, onClear, image, isBlog = false }: any) => {
    const [preview, setPreview] = useState<string | null>(null);

    useEffect(() => {
        if (typeof image === 'string') {
            setPreview(image);
        } else if (image && image.uri) {
            setPreview(image.uri);
        } else {
            setPreview(null);
        }
    }, [image]);

    const pickImage = () => {
        const options = {
            mediaType: 'photo',
            quality: 0.7,
        } as const;

        launchImageLibrary(options, (response) => {
            if (response.didCancel || response.errorCode) return;

            if (response.assets && response.assets.length > 0) {
                const selectedImage = response.assets[0];
                onImagePrepared(selectedImage);
            }
        });
    };

    const clearImage = () => {
        setPreview(null);
        onClear();
    };

    return (
        <View>
            <TouchableOpacity style={isBlog ? styles.blog : styles.profile} onPress={pickImage} activeOpacity={0.8}>
                {preview ? (
                    <>
                        <Image
                            source={{ uri: preview }}
                            style={{ width: '100%', height: '100%', position: 'relative', borderRadius: isBlog ? 20 : 50 }}
                            resizeMode='cover'
                        />
                        <TouchableOpacity onPress={clearImage} style={{ position: 'absolute', zIndex: 1, bottom: 0, right: 0, borderWidth: 1, backgroundColor: COLORS.secondary[700], borderRadius: 40, padding: 4, borderColor: COLORS.white }}>
                            <AppIcon name='edit-3' type='Feather' color={COLORS.white} size={16} />
                        </TouchableOpacity>
                    </>
                ) : (
                    <View style={{ alignItems: 'center' }}>
                        <AppIcon name='plus' type='Feather' />
                    </View>
                )}
            </TouchableOpacity>
        </View>
    );
};

export default ImagePicker;

const styles = StyleSheet.create({
    profile: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#FAFAFA',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: COLORS.white
    },
    blog: {
        width: '100%',
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        borderRadius: 20
    }
})