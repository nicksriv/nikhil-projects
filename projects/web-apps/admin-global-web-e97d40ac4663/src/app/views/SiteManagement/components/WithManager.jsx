import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
    FormControl,
    Grid,
    IconButton,
    InputAdornment,
    TextField,
} from '@material-ui/core'
import EmailIcon from '@material-ui/icons/Email'
import PhoneIcon from '@material-ui/icons/Phone'
import DeleteIcon from '@material-ui/icons/Delete';
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'

const useStyles = makeStyles(() => ({
    cardContainer: {
        display: 'grid',
        placeItems: 'center',
        // marginTop: "10%",
        height: '100vh',
        gridTemplateRows: '0fr 0fr 0fr',
    },
    link: {
        textDecoration: 'none',
        color: '#2C3E93',
    },
    screenContainer: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        // border: '1px solid lightgray',
        backgroundColor: 'white',
        borderRadius: '3px',
        padding: '1rem',
    },
    screenTitle: {
        color: '#00000061',
        fontSize: '1rem',
    },
    iconColor: {
        color: "#999999 !important"
    },
    middleRow: {
        margin: "0.2rem 0"
    }
}))

function WithManager({ data, pageMode, handleDeleteIcon }) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { managers, siteDetails } = useSelector((state) => state.sites);
    
    function handleManagerDelete(managerId) {
        let filteredManager
        if (pageMode === "add") {
            filteredManager = managers.filter((manager) => manager.id !== managerId);
        } else if (pageMode === "edit") {
            filteredManager = siteDetails.managers.filter((manager) => manager.id !== managerId);
        }
        dispatch({
            type: "deleteManagerDetailsAction",
            payload: filteredManager
        })

    }

    return (
        <div className={`${classes.screenContainer}`}>
            {data.map((manager) => {
                return <>    <Grid
                    container
                    direction="row"
                    spacing="5"
                    className="min-h-120 w-full"
                >
                    <Grid item xs={10} sm={10} md={6} lg={4}>
                        <FormControl fullWidth>
                            <TextField
                                variant="outlined"
                                label="Emp ID"
                                name="empId"
                                type="text"
                                className={`${classes.root}`}
                                value={manager.id}
                                disabled={pageMode === "view" ? true : false}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={2} sm={2} md={6} lg={8}>
                        {pageMode !== "view" && <Grid item className="cursor-pointer text-light-gray" style={{ float: "right" }}>
                            <IconButton onClick={() => handleManagerDelete(manager.id)}>
                                <DeleteIcon className={classes.iconColor} />
                            </IconButton>
                        </Grid>}


                    </Grid>
                </Grid>
                    <Grid
                        container
                        direction="row"
                        spacing="5"
                        className={`min-h-120 w-full ${classes.middleRow}`}
                    >
                        <Grid item xs={12} sm={12} md={6} lg={4}>
                            <TextField
                                id="firstName"
                                name="firstName"
                                label="First Name"
                                type="text"
                                variant="outlined"
                                value={manager.firstName}
                                disabled={pageMode === "view" ? true : false}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={4}>
                            <TextField
                                id="middleName"
                                name="middleName"
                                label="Middle Name"
                                type="text"
                                variant="outlined"
                                value={manager.middleName}
                                disabled={pageMode === "view" ? true : false}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={4}>
                            <TextField
                                id="lastName"
                                name="lastName"
                                label="Last Name"
                                type="text"
                                variant="outlined"
                                value={manager.lastName}
                                disabled={pageMode === "view" ? true : false}
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                    <Grid
                        container
                        direction="row"
                        spacing="5"
                        className="min-h-120 w-full"
                    >
                        <Grid item xs={12} sm={12} md={6} lg={4}>
                            <TextField
                                id="contactNumber"
                                name="contactNumber"
                                label="Contact Number"
                                type="text"
                                value={manager.mobile}
                                disabled={pageMode === "view" ? true : false}
                                fullWidth
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <PhoneIcon
                                                fontSize="small"
                                                className={classes.iconColor}
                                            />
                                        </InputAdornment>
                                    ),
                                }}
                                required
                                InputLabelProps={{
                                    classes: {
                                        asterisk: 'text-error',
                                    },
                                }}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={4}>
                            <TextField
                                id="siteEmail"
                                name="siteEmail"
                                label="Site Email"
                                type="text"
                                fullWidth
                                value={manager.email}
                                disabled={pageMode === "view" ? true : false}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <EmailIcon
                                                fontSize="small"
                                                className={classes.iconColor}
                                            />
                                        </InputAdornment>
                                    ),
                                }}
                                variant="outlined"
                            />
                        </Grid>
                    </Grid>
                </>
            })}

        </div>
    )
}

export default WithManager
