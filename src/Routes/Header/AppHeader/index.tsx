import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { TourGuideZone } from 'rn-tourguide';

import { Typo } from '@/Components';
import { COLORS } from '@/Utils/colors';
import { TabScreens } from '@/Routes/Screen';

const AppHeader = (props: any) => {
    const { route, options } = props;
    const insets = useSafeAreaInsets();

    const activeTabName = getFocusedRouteNameFromRoute(route);
    const currentTabConfig = TabScreens?.find(el => el.name === activeTabName);

    const displayTitle = currentTabConfig?.options?.title || activeTabName || options?.title || route.name;

    const activeOptions = props.options;
    const backgroundColor = activeOptions?.headerStyle?.backgroundColor || COLORS.white;
    const HeaderRight = options?.headerRight;
    const HeaderLeft = options?.headerLeft;

    return (
        <View style={{ paddingTop: insets.top, backgroundColor: backgroundColor, borderBottomWidth: 1, borderBottomColor: '#eee', paddingLeft: insets.left + 16, paddingRight: insets.right + 16 }}>
            <View style={{ height: 50, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                    {HeaderLeft ? <HeaderLeft /> : null}
                    <Typo variant='bodyLargeSecondary' title={displayTitle} color={COLORS.white} />
                </View>
                <TourGuideZone zone={2} text={'This is Header Navigations'} shape={'rectangle'}>
                    <View collapsable={false}>
                        {HeaderRight ? <HeaderRight /> : null}
                    </View>
                </TourGuideZone>
            </View>
        </View>
    );
};

export default AppHeader;