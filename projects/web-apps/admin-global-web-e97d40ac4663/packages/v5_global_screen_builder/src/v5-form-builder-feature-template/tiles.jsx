import React from 'react';
import {
    ButtonGroup,
    Button
} from '@material-ui/core';

const V5Tiles = (props) => {
    const {
    } = props;

    return (
        <div style={{
            height: 54, borderRadius: '5px', boxShadow: "300ms",
            color: "rgba(0, 0, 0, 0.87)",
            boxShadow: " 0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)"
        }}>
            <div style={{ padding: "10px", display: "flex", flexDirection: "column" }}>
                <div style={{ margin: "0 auto", color: "rgb(159, 159, 159)" }}>
                    Title Text
                </div>
                <div style={{ margin: "0 auto", color: "rgb(33, 33, 33)", fontWeight: "bold" }}>
                    Text
                </div>
            </div>
        </div>
    );
}

export default V5Tiles;