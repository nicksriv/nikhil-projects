import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import CancelIcon from '@material-ui/icons/Cancel'
import Chip from '@material-ui/core/Chip'
import { useDispatch } from 'react-redux'
import { convertDate } from 'app/views/utilities/DateFormat'
import { startCase } from 'lodash'
import { setSiteFilterDetails } from 'app/redux/SiteManagement/siteManagementSlice'
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        listStyle: 'none',
        padding: theme.spacing(0.5),
        margin: 0,
    },
    wrapper: {
        // display: 'flex',
        // overflow: 'auto',
        // justifyContent: 'flex-end',
        // '&::-webkit-scrollbar-track': {
        //     boxShadow: 'inset 0 0 6px rgba(0,0,0,0.3)',
        //     webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.3)'
        // },
        // '&::-webkit-scrollbar-thumb': {
        //     backgroundColor: 'rgba(0,0,0,.1)',
        // }
    },
    chip: {
        margin: theme.spacing(0.5),
        color: '#2C3E93',
        border: '1px solid #2C3E93',
    },
    listStyle: {
        display: 'flex',
        listStyle: 'none',
        justifyContent: 'flex-end',
    },
    deleteIcon: {
        color: '#2C3E93',
        height: '16px',
    },
}))
function FilterChips({ chipInfo }) {
    const classes = useStyles()
    const [chipData, setChipData] = useState(chipInfo)
    const [filterExists, setFilterExists] = useState(false)
    const dispatch = useDispatch()

    const handleDelete = (value) => {
        let data = { ...chipData }
        data[value] = ''
        // dispatch({ type: setUserFilterDetails.type, payload: data })
        setChipData(data)
    }

    useEffect(() => {
        setChipData(chipInfo)
        let exists = Object.keys(chipInfo).some(function (k) {
            return chipInfo[k] && chipInfo[k].length > 0
        })
        setFilterExists(exists)
    }, [chipInfo])

    const handleClear = () => {
        let data = {
            siteId : "",
            siteName : "",
            siteType : "",
            state:"",
            city:"",
            status: "",
            from: null,
            to: null
        }
        dispatch({ type: setSiteFilterDetails.type, payload: data })
    }
  
    return (
        <div className={classes.wrapper}>
            <div className={`flex justify-end mt-1 ${classes.listStyle}`}>
                {filterExists ? (
                    <Chip
                        variant="outlined"
                        color="primary"
                        label="Clear all"
                        onDelete={handleClear}
                        className={classes.chip}
                        deleteIcon={
                            <CancelIcon className={classes.deleteIcon} />
                        }
                    />
                ) : null}
                {chipData &&
                    Object.keys(chipData).map((key) =>
                        chipData[key] ? (
                            <li key={key}>
                                <Chip
                                    variant="outlined"
                                    color="primary"
                                    label={renderName(chipData, key)}
                                    onDelete={() => handleDelete(key)}
                                    className={classes.chip}
                                    deleteIcon={
                                        <CancelIcon
                                            className={classes.deleteIcon}
                                        />
                                    }
                                />
                            </li>
                        ) : null
                    )}
            </div>
        </div>
    )
}

function renderName(chipData, key) {
    return (
        <span>
            <span style={{ color: '#00000099' }}>{startCase(key)}</span>:{' '}
            {key === 'from' || key === 'to'
                ? convertDate(chipData[key])
                : chipData[key]}
        </span>
    )
}

export default FilterChips