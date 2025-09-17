import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import store from './stores/store';

const V5FormBuilderRefHandlers = forwardRef((props, ref) => {
    useImperativeHandle(
        ref,
        () => ({
            clearFormBuilderZone() {
                store.dispatch('deleteAll');
            }
        }),
    )
    return (
        <div></div>
    )
});

export default V5FormBuilderRefHandlers;