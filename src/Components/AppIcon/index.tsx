import React from 'react';
import { TextStyle } from 'react-native';
import { IconSets } from './types';
import { COLORS } from '../../Utils/colors';

type IconProps = {
    type?: keyof typeof IconSets;
    name: string;
    size?: number;
    color?: string;
    style?: TextStyle;
};

const AppIcon = ({ type = 'MaterialIcons', name, size = 24, color = COLORS.black, style }: IconProps) => {
    const IconComponent = IconSets[type] || IconSets.MaterialIcons;

    return (
        <IconComponent name={name} size={size} color={color} style={style} />
    );
};

export default AppIcon;
