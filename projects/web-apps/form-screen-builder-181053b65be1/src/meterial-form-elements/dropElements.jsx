import React, { useImperativeHandle, Fragment } from 'react';
import { DropTarget } from 'react-dnd';
import FormElements from '../form-elements';
import MaterialElements from '../meterial-form-elements';
import ItemTypes from '../ItemTypes';

import CustomElement from '../form-elements/custom-element';
import Registry from '../stores/registry';

function getCustomElement(item, props) {
    if (!item.component || typeof item.component !== 'function') {
        item.component = Registry.get(item.key);
        if (!item.component) {
            console.error(`${item.element} was not registered`);
        }
    }
    return (
        <CustomElement
            {...props}
            mutable={false}
            key={`form_${item.id}`}
            data={item}
        />
    );
}

function getFormElement(element, key) {
    return MaterialElements[element || key];
}

function getElement(item, props) {
    if (!item) return null;
    const Element = item.custom ?
        () => getCustomElement(item, props) :
        getFormElement(item.element, item.key);
    return (
        <Fragment>
            <Element {...props} key={`form_${item.id}`} data={item} />
        </Fragment>
    );
}

function getStyle(backgroundColor) {
    return {
        border: '1px solid rgba(0,0,0,0.2)',
        minHeight: '2rem',
        minWidth: '12rem',
        width: '100%',
        backgroundColor,
        padding: 0,
        float: 'left',
    };
}

function isContainer(item) {
    if (item.itemType !== ItemTypes.CARD) {
        const { data } = item;
        if (data) {
            if (data.isContainer) {
                return true;
            }
            if (data.fieldName) {
                return data.fieldName.indexOf('_col_row') > -1;
            }
        }
    }
    return false;
}

const DragDropElements = React.forwardRef(
    ({
        greedy, isOver, isOverCurrent, connectDropTarget, items, col, getDataByArrayId, ...rest
    }, ref) => {
        const item = items[col];
        useImperativeHandle(
            ref,
            () => ({
                onDrop: (/* dropped */) => {
                    // const { data } = dropped;
                    // console.log('onDrop', data);
                },
            }),
            [],
        );

        let backgroundColor = 'rgba(0, 0, 0, .03)';

        if (isOverCurrent || (isOver && greedy)) {
            backgroundColor = 'darkgreen';
        }
        const arrayElements = [];
        item.map((itemData) => {
            arrayElements.push(getElement(itemData, rest));
        })
        // console.log('accepts, canDrop', accepts, canDrop);
        return connectDropTarget(
            <div style={getStyle(backgroundColor)}>
                {
                    arrayElements.map((ele) => {
                        return (
                            <div>
                                {ele}
                            </div>
                        );

                    })
                }
            </div>,
        );
    },
);

export default DropTarget(
    (props) => props.accepts,
    {
        drop(
            props,
            monitor,
            component,
        ) {
            if (!component) {
                return;
            }

            const item = monitor.getItem();
            if (!isContainer(item)) {
                (component).onDrop(item);
                if (item.data && typeof props.setArrayAsChild === 'function') {
                    const isNew = !item.data.id;
                    const data = isNew ? item.onCreate(item.data) : item.data;
                    props.setArrayAsChild(props.data, data, props.col);
                }
            }
        },
    },
    (connect, monitor) => ({
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        isOverCurrent: monitor.isOver({ shallow: true }),
        canDrop: monitor.canDrop(),
    }),
)(DragDropElements);
