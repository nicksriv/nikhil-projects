import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function ScreenSkeleton(props) {
    const {a={}
    } = props;

    return (
        <>
            <Skeleton height="230px" />
        </>
    )
}

export default ScreenSkeleton;
