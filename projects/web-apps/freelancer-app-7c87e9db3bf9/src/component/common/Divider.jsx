import React from 'react';
import { R } from '../../res'
import View from './View';
const Divider = ({ size = 1, height=20, color = R.colors.primary.lightest, vertical = false }) => {
    if (vertical) {
        return (
            <View
                style={{
                    backgroundColor: color,
                    width: R.units.scale(size),
                    height: R.units.scale(height),

                }}
    />
        );
    }
return (
    <View
        style={{
            backgroundColor: color,
            height: R.units.scale(size),
            width: "100%",
        }}
    />
);
};

export default Divider;