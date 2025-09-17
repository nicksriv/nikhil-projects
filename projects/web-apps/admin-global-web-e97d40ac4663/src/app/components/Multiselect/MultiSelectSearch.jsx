import React from 'react'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: '190px',
        '& > * + *': {
            marginTop: theme.spacing(3),
        },
    },
}))

export default function MultiSelectSearch({
    label,
    placeholder,
    listArray,
    onChange,
    value,
}) {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <Autocomplete
                value={value}
                onChange={(event, value) => onChange(event, value)}
                multiple
                id="tags-outlined"
                options={listArray}
                getOptionLabel={(option) => option.name}
                filterSelectedOptions
                renderInput={(params) => (
                    <TextField
                        {...params}
                        variant="outlined"
                        label={label}
                        placeholder={placeholder}
                    />
                )}
            />
        </div>
    )
}
