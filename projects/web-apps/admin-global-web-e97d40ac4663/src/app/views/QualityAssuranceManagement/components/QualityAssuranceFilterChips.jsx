import React, { useState, useEffect } from 'react'
import {
    makeStyles,
    // ThemeProvider,
    // createTheme,
} from '@material-ui/core/styles'
import CancelIcon from '@material-ui/icons/Cancel'
import Chip from '@material-ui/core/Chip'
import { useDispatch } from 'react-redux'
import { startCase } from 'lodash'
import { setQualityAssuranceFilterDetails } from 'app/redux/QualityAssuranceManagement/QualityAssuranceManagementSlice'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        listStyle: 'none',
        padding: theme.spacing(0.5),
        margin: 0,
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

function QualityAssuranceFilterChips({ chipInfo }) {
    const classes = useStyles()
    const [chipData, setChipData] = useState(chipInfo)
    const [filterExists, setFilterExists] = useState(false)
    const dispatch = useDispatch()

    const handleDelete = (value) => {
        let data = { ...chipData }
        if (data[value] instanceof Date) {
            data[value] = null
        } else {
            data[value] = ''
        }

        dispatch({ type: setQualityAssuranceFilterDetails.type, payload: data })
        setChipData(data)
    }

    useEffect(() => {
        setChipData(chipInfo)
        let exists = Object.keys(chipInfo).some(function (k) {
            return (
                (chipInfo[k] && chipInfo[k].length > 0) ||
                (chipInfo[k] && typeof chipInfo[k] === 'object')
            )
        })

        setFilterExists(exists)
    }, [chipInfo])

    const handleClear = () => {
        let data = {
            firstName: '',
            lastName: '',
            email: '',
            mobile: '',
            qualityControllerStatus: '',
            qualityAssuranceRefNo: ''
        }

        dispatch({ type: setQualityAssuranceFilterDetails.type, payload: data })

    }
    return (
        <div className={`flex justify-end mt-1 ${classes.listStyle}`}>
            {filterExists && (
                <Chip
                    variant="outlined"
                    color="primary"
                    label="Clear all"
                    onDelete={handleClear}
                    className={classes.chip}
                    deleteIcon={<CancelIcon className={classes.deleteIcon} />}
                />
            )}

            {chipData &&
                Object.keys(chipData).map(
                    (key) =>
                        chipData[key] && (
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
                        )
                )}
        </div>
    )
}

function renderName(chipData, key) {
    return (
        <span>
            <span style={{ color: '#00000099' }}>{startCase(key)}</span>:{' '}
            {chipData[key]}
        </span>
    )
}

export default QualityAssuranceFilterChips
