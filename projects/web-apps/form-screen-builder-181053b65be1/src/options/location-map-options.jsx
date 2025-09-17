import { FormControl, FormGroup, InputLabel, MenuItem, Select } from '@material-ui/core';
import React from 'react'

function LocationMapOption(props) {

    const displayMapOptions = [
        {
            value: "Map",
            key: "map"
        },
        {
            value: "Text",
            key: "text"
        },
        {
            value: "Map+Text",
            key: "maptext"
        },

    ];

    return (
        <div>
            <FormGroup>
                <FormControl fullWidth variant="outlined" className='my-3'>
                    <InputLabel id="defaultSelect">Display As</InputLabel>
                    <Select
                        labelId="defaultSelect"
                        id="defaultSelect"
                        label="Validations"
                        defaultValue="none"
                        value={props.element.customOptions.displayMapOption}
                        MenuProps={{
                            anchorOrigin: {
                              vertical: "bottom",
                              horizontal: "left"
                            },
                            getContentAnchorEl: null
                          }}
                        onChange={(event) => props.setDisplayMapOptions("displayMapOption", event)}
                    >
                        {displayMapOptions.map((item) => (
                            <MenuItem key={item.key} value={item.value} > {item.value} </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </FormGroup>
        </div>
    )
}

export default LocationMapOption
