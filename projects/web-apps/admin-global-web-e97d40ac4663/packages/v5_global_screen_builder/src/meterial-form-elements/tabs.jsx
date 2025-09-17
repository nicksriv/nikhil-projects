import React from 'react';
import ComponentHeader from '../form-elements/component-header';
import { FormLabel, TextField, Grid, Typography } from '@material-ui/core';
import ComponentLabel from './material-element-label';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import DragDropElements from './dropElements';
import ItemTypes from '../ItemTypes';
import AppBar from '@material-ui/core/AppBar';

const accepts = [ItemTypes.BOX, ItemTypes.CARD];


class TabsComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
        }
    }

    handleChange = (event, data) => {
        this.setState({ value: data });
    };

    render() {
        const propsData = this.props.data;

        const {
            controls, data, editModeOn, getDataByArrayId, setArrayAsChild, removeChildFromArray, seq, index,
        } = this.props;
        if (!data.childItems) {
            // eslint-disable-next-line no-param-reassign
            data.childItems = [];
            propsData.tabsOptions.map((opt) => {
                data.childItems.push([]);
            });
            data.isContainer = true;
        } else {
            if (propsData.tabsOptions.length > data.childItems.length) {
                propsData.tabsOptions.map((opt, ind) => {
                    if (data.childItems[ind] != undefined) {
                        data.childItems.push([]);
                    }
                });
            }
           
            data.isContainer = true;
        }
        return (
            <div className='SortableItem rfb-item'>
                <ComponentHeader {...this.props} />
                <div className="row" style={{marginLeft: '0px', marginRight: '0px'}}>
                    <div style={{ width: '100%' }}>
                        <ComponentLabel {...this.props} />
                        <Paper square>
                            <Tabs
                                variant="scrollable"
                                scrollButtons="on"
                                value={this.state.value}
                                onChange={this.handleChange}
                                indicatorColor="primary"
                                textColor="primary"
                                aria-label="disabled tabs example"
                            >
                                {
                                    propsData.tabsOptions.map((option) => {
                                        return (<Tab label={option.label} />)

                                    })
                                }
                            </Tabs>
                        </Paper>
                        {
                            propsData.tabsOptions.map((option, i) => {
                                return (
                                    <>
                                        {
                                            this.state.value === i &&
                                            <>
                                                {
                                                    <div style={{backgroundColor: 'rgba(0, 0, 0, .03)'}} key={`${i}_${option.key || '_'}`}>
                                                        {
                                                            controls ? controls[i] :
                                                                <DragDropElements
                                                                    style={{ width: '100%' }}
                                                                    data={data}
                                                                    accepts={accepts}
                                                                    items={ data.childItems}
                                                                    col={i}
                                                                    parentIndex={index}
                                                                    editModeOn={editModeOn}
                                                                    _onDestroy={(itemData) => removeChildFromArray(itemData,data, i)}
                                                                    getDataByArrayId={getDataByArrayId}
                                                                    setArrayAsChild={setArrayAsChild}
                                                                    seq={seq}
                                                                />
                                                        }
                                                    </div>
                                                }

                                            </>
                                        }
                                    </>
                                )

                            })
                        }
                    </div>
                </div>
            </div>
        );
    }
}
export default TabsComponent;
