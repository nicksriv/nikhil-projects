import React, { useEffect } from 'react'
import {
    Checkbox,
    FormControlLabel,
    Box,
    Paper,
    Grid,
} from '@material-ui/core'
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import { makeStyles } from '@material-ui/core/styles'
import { useSelector } from 'react-redux';

const useStyles = makeStyles(() => ({
    paper: {
        border: '1.5px solid #00000090',
    },
    label: {
        fontSize: "13px",
        alignSelf: "center",
        marginTop: "0.6rem",
        opacity: "0.8"
    },
    labelChecked: {
        fontSize: "13px",
        color: "#2C3E93",
        alignSelf: "center",
        marginTop: "0.6rem",
        opacity: "0.8"
    },
    paperChecked: {
        border: '2px solid #2C3E93',
        backgroundColor: "#e5f2f4"
    },
    description: {
        fontSize: "13px",
        marginLeft: "1rem",
        padding: "0.6rem 0"
    },
    descriptionColor: {
        opacity: "0.5"
    },
    content: {
        color: "#000000BC",
        fontWeight: "normal"
    }
}))
function CheckboxGlobal(props) {
    const { title, description, pageMode, key, name, modules, handleCheck } = props;
    const classes = useStyles()
    const [checked, setChecked] = React.useState(false);

    const { clientPrivilages } = useSelector((state) => state.clients);

    const handleChange = (event) => {
        if (pageMode !== 'view')
        handleCheck(name, event.target.checked);
    };

    useEffect(()=> {
        setChecked(clientPrivilages[name]);
    }, [clientPrivilages]);
    return (
        <Grid key={key}>
            <Paper elevation={0} className={`${checked ? classes.paperChecked : classes.paper} mb-4`}>
                <Grid container spacing="3" className="items-center">
                    <Box component="span" m={3} className="flex-size" onClick={()=>handleChange({target: {checked: !checked}})}>
                        <FormControlLabel
                            labelPlacement="start"
                            control={
                                <Checkbox
                                    // key={key}
                                    name="name"
                                    color="primary"
                                    checkedIcon={
                                        <CheckCircleIcon
                                            className={classes.checkedIconClass}
                                        />
                                    }
                                    icon={
                                        <RadioButtonUncheckedIcon
                                            className={
                                                classes.unCheckedIconClass
                                            }
                                        />
                                    }
                                    inputProps={{
                                        'aria-label': 'decorative checkbox',
                                    }}
                                    disabled={pageMode==='view'}
                                    checked={checked}
                                    onChange={handleChange}
                                // disabled={!state}
                                // className={state === false ? "invisible-on-pc" : ""}
                                />
                            }
                            label={<h6 className={checked ? classes.labelChecked : classes.label}>{title}</h6>}
                        // key={key}
                        />
                        <h6 className={classes.description} >
                            <span className={classes.descriptionColor}>Description: </span>
                            <span className={classes.content}>{`${description} `}</span>
                        </h6>
                    </Box>
                </Grid>
            </Paper>
        </Grid>
    )
}

export default CheckboxGlobal
