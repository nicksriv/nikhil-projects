import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { TextField, Grid } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import { Button } from '@mui/material'

const useStyles = makeStyles((theme) => ({
    filterWrap: {
        width: '432px',
        minHeight: '450px',
        top: '0',
        background:
            'var(--light-🌕-on-primary-high-emphasis-ffffff) 0% 0% no-repeat padding-box',
        boxShadow: '0px 3px 24px #0000003D',
        borderRadius: '2px',
        opacity: 1,
        zIndex: 99999,
    },
    inputField: {
        width: '90%',
        margin: '20px',
    },
}))

function ViewReportFilter({ close, handleSearchChange, applyFilter, handleClearClick }) {
    const classes = useStyles()

    return (
        <>
            <Grid className={classes.filterWrap}>
                <Grid
                    className={`flex justify-between items-center bg-primary px-4 ${classes.popOverHeader}`}
                >
                    <p className="text-white text-16">Filter</p>
                    <CloseIcon
                        className="text-white cursor-pointer"
                        onClick={close}
                    />
                </Grid>
                <TextField
                    variant="outlined"
                    id="name"
                    name="name"
                    placeholder="Search"
                    type="text"
                    onChange={handleSearchChange}
                    fullWidth
                    className={classes.inputField}
                />
                <Grid className="flex justify-end" style={{margin: '15rem 1rem 0 0'}}>
                    <Button
                        type="button"
                        fullWidth
                        variant="outlined"
                        // disabled={!isValid}
                        className="w-100 color-primary border-primary"
                        onClick={handleClearClick}
                    >
                        CLEAR
                    </Button>
                    <Button
                        type="button"
                        fullWidth
                        variant="contained"
                        // disabled={!isValid}
                        className="w-100 ml-5 bg-primary text-white"
                        onClick={applyFilter}
                    >
                        APPLY
                    </Button>
                </Grid>
            </Grid>
        </>
    )
}

export default ViewReportFilter
