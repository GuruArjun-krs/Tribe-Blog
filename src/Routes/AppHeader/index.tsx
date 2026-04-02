import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

import { Typo } from '@/Components';
import { COLORS } from '@/Utils/colors';

const AppHeader = (props: any) => {
    const { route, options } = props;
    const insets = useSafeAreaInsets();

    const activeTabName = getFocusedRouteNameFromRoute(route);
    const displayTitle = activeTabName || options?.title || route.name;

    const activeOptions = props.options;
    const backgroundColor = activeOptions?.headerStyle?.backgroundColor || COLORS.white;
    const HeaderRight = options?.headerRight;
    const HeaderLeft = options?.headerLeft;

    return (
        <View style={{ paddingTop: insets.top, backgroundColor: backgroundColor, borderBottomWidth: 1, borderBottomColor: '#eee', paddingLeft: insets.left + 20, paddingRight: insets.right + 20 }}>
            <View style={{ height: 50, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                {HeaderLeft ? <HeaderLeft /> : null}
                <Typo variant='bodyLargeSecondary' title={displayTitle} color={COLORS.white} />
                {HeaderRight ? <HeaderRight /> : null}
            </View>
        </View>
    );
};

export default AppHeader;