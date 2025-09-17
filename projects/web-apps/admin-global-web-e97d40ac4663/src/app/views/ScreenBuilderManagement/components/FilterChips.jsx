import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import CancelIcon from '@material-ui/icons/Cancel'
import Chip from '@material-ui/core/Chip'
//import { setClientFilterDetails } from 'app/redux/ClientManagement/clientManagementSlice'
import { useDispatch } from 'react-redux'
import { startCase } from 'lodash'
import { convertDate } from 'app/views/utilities/DateFormat'
import { setModuleFilterDetails } from 'app/redux/ScreenBuilderManagement/screenBuilderManagementSlice'
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
function FilterChips({ chipInfo }) {
    const classes = useStyles();
    const [chipData, setChipData] = useState(chipInfo);
    const [filterExists, setFilterExists] = useState(false);
    const dispatch = useDispatch();

    const handleDelete = (value) => {
        let data = { ...chipData }
        if (data[value] instanceof Date) {
            data[value] = null
        } else {
            data[value] = ''
        }
        dispatch({ type: setModuleFilterDetails.type, payload: data })
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

        setFilterExists(exists);
    }, [chipInfo]);

    const handleClear = () => {
        let data = {
            moduleName: '',
            //parentModuleName: '',
            //rolesMapped: '',
            status: '',
            from: null,
            to: null
        }
        dispatch({ type: setModuleFilterDetails.type, payload: data })
    }

    return (
        <div  className={`flex justify-end mt-1 ${classes.listStyle}`}>
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
            <span style={{ color: '#00000099' }}>{startCase(key)}</span>:
            {key === 'from' || key === 'to'
                ? convertDate(chipData[key])
                : chipData[key]}
        </span>
    )
}

export default FilterChips
