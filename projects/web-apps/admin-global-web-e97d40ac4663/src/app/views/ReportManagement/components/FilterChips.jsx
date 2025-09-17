import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import CancelIcon from '@material-ui/icons/Cancel'
import Chip from '@material-ui/core/Chip'
//import { setClientFilterDetails } from 'app/redux/ClientManagement/clientManagementSlice'
import { useDispatch } from 'react-redux'
import { startCase } from 'lodash'
import { convertDate } from 'app/views/utilities/DateFormat'
import { setReportFilterDetails } from 'app/redux/ReportManagement/reportManagementSlice'

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
function FilterChips({ chipInfo, moduleList }) {
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
        dispatch({ type: setReportFilterDetails.type, payload: data })
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
            name: '',
            moduleId: '',
            //rolesMapped: '',
            status: '',
            //from: null,
            //to: null
        }
        dispatch({ type: setReportFilterDetails.type, payload: data })
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
                                    label={renderName(chipData, key, moduleList)}
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

function renderName(chipData, key, moduleList) {
    return (
        <span>
            <span style={{ color: '#00000099' }}>{key === 'moduleId'? startCase(`parent Module Name`): key==="name" ? startCase(`Report Name`): startCase(key)}</span>:
            {key === 'from' || key === 'to'
                ? convertDate(chipData[key]) : key === "moduleId"?
                moduleList.map((x)=>
                    chipData[key] === x.id? <span>{x.name}</span> : null
                )
                : chipData[key] }
        </span>
    )
}

export default FilterChips
