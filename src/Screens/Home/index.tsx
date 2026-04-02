import React, { useEffect } from 'react'
import { TourGuideZone, useTourGuideController } from 'rn-tourguide';
import { useNavigation } from '@react-navigation/native'
import { Button, Image, View } from 'react-native'
import { PrimaryLayout } from '../../Layout'

const HomeScreen = () => {
    const navigation = useNavigation<any>()
    const { start, canStart } = useTourGuideController();

    useEffect(() => {
        if (canStart) {
            console.log("Tour starting...");
            start();
        }
    }, [canStart]);

    return (
        <PrimaryLayout>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 25 }}>
                <TourGuideZone zone={1} text="This is image" shape='circle'>
                    <Image
                        source={{ uri: 'https://picsum.photos/200' }}
                        style={{ width: 100, height: 100, borderRadius: 50 }}
                    />
                </TourGuideZone>

                <Button title='Start Tour' onPress={() => start()} />
            </View>
        </PrimaryLayout>
    )
}

export default HomeScreen