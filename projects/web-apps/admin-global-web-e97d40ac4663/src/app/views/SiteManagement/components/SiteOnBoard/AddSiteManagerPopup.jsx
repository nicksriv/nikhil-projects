import React, { useState } from 'react';
import { Button, Modal, TextField, FormControl, Grid, Paper, IconButton, Typography, InputAdornment, Icon } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles, ThemeProvider, createTheme } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/Phone';

const custom = createTheme({
    palette: {
        primary: {
            main: "#2C3E93"
        }
    },
})

const useStyles = makeStyles(({ ...theme }, custom) => ({
    root: {
        // '& .Mui-focused': {

        //     border: '1px solid #2C3E93',
        // },
        "& .Mui-focused": {
            borderColor: "purple"
        },

        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
            color: "purple"
        },

        "& .MuiInputLabel-outlined.Mui-focused": {
            color: "purple"
        }
    },
    header: {
        display: "flex",
        alignItems: "center",
        justifyContent: " space-between",
        width: "inherit"
    },
    headerText: {
        backgroundColor: "#2C3E93",
        padding: "0px 24px"
    },
    paper: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: '65rem',
        transform: 'translate(-50%, -50%)',
    },
    helperText: {
        // padding:0,
        // margin:0,
        position: 'absolute',
        right: "0.3rem",
        bottom: '0.2rem',

    },
    disabledBtn: {
        backgroundColor: "lightgray",
        border: "1px solid gray"
    },
    body: {
        padding: "24px"
    },
    iconColor: {
        color: "#ACADAD !important"
    },
    addBtn:{
        width:"6rem",
        marginLeft:"1rem"
    }

}))

function AddSiteManagerPopUp({ open, Close, pageMode }) {
    const classes = useStyles();
    const [empId, setEmpId] = useState("");
    const dispatch = useDispatch();
    const { clientIdForUsers } = useSelector((state) => state.users);
    const {  currentManager } = useSelector((state) => state.sites);

    const handleClose = () => {
        Close(!open);
    }
    const handleEmpId = (e) => {
        setEmpId(e.target.value)
    }
    const searchEmployee = () => {
        dispatch({
            type: "getManagerDetailsAction",
            payload: {
                clientId: clientIdForUsers,
                userId: empId
            }
        })
    }
    const addManager = () => {
        if (pageMode === "add") {
            dispatch({
                type: "setSiteFormDetailsAction",
                payload: {
                    name: "managers",
                    value: empId,
                }
            })
        }
        dispatch({
            type: "setManagerListAction",
            payload: {
                currentManager,
                pageMode
            }
        })
        dispatch({
            type: "resetCurrentManagerDetailsAction",
            payload: {
                firstName: '',
                lastName: '',
                middleName: '',
                email: '',
                mobile: ''
            }
        })
        Close(!open);
    }


    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <ThemeProvider theme={custom}>
                    <Paper elevation={3} className={classes.paper}>
                        <Grid container className={classes.headerText} >
                            <Grid item className={classes.header}>
                                <Typography variant="h6" align="left" >
                                    Add Site Manager
                                </Typography>
                                <IconButton align="right" onClick={handleClose}>
                                    <CloseIcon />
                                </IconButton>
                            </Grid>
                        </Grid>
                        <div className={classes.body}>
                            <Grid container direction="row" spacing="5" className='min-h-120 w-full mt-4'>
                                <Grid item xs={12} sm={12} md={6} lg={4}>
                                    <FormControl fullWidth >
                                        <TextField
                                            variant="outlined"
                                            label="Emp ID"
                                            name="empId"
                                            type="text"
                                            onChange={(e) => handleEmpId(e)}
                                            className={`${classes.root}`}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={searchEmployee}
                                                        >
                                                            <Icon>search</Icon>
                                                        </IconButton>
                                                    </InputAdornment>
                                                )
                                            }}
                                        />
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <Grid container direction="row" spacing="5" className='min-h-120 w-full'>
                                <Grid item xs={12} sm={12} md={6} lg={4}>
                                    <TextField
                                        id="firstName"
                                        name="firstName"
                                        label="First Name"
                                        type="text"
                                        variant="outlined"
                                        fullWidth
                                        disabled
                                        value={currentManager && currentManager.firstName}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={6} lg={4}>
                                    <TextField
                                        id="middleName"
                                        name="middleName"
                                        label="Middle Name"
                                        type="text"
                                        variant="outlined"
                                        fullWidth
                                        disabled
                                        value={currentManager && currentManager.middleName}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={6} lg={4}>
                                    <TextField
                                        id="lastName"
                                        name="lastName"
                                        label="Last Name"
                                        type="text"
                                        variant="outlined"
                                        fullWidth
                                        disabled
                                        value={currentManager && currentManager.lastName}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container direction="row" spacing="5" className='min-h-120 w-full'>
                                <Grid item xs={12} sm={12} md={6} lg={4}>
                                    <TextField
                                        id="contactNumber"
                                        name="contactNumber"
                                        label="Contact Number"
                                        type="text"
                                        value={currentManager && currentManager.mobile}
                                        fullWidth
                                        InputProps={{
                                            endAdornment: <InputAdornment position="end"><PhoneIcon fontSize="small" className={classes.iconColor} /></InputAdornment>,
                                        }}
                                        disabled
                                        required
                                        InputLabelProps={{
                                            classes: {
                                                asterisk: 'text-error'
                                            }
                                        }}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={6} lg={4}>
                                    <TextField
                                        id="siteEmail"
                                        name="siteEmail"
                                        label="Site Email"
                                        value={currentManager && currentManager.email}
                                        type="text"
                                        disabled
                                        fullWidth
                                        InputProps={{
                                            endAdornment: <InputAdornment position="end"><EmailIcon fontSize="small" className={classes.iconColor} /></InputAdornment>,
                                        }}
                                        variant="outlined"
                                    />
                                </Grid>
                            </Grid>
                            <Grid container justifyContent="flex-end">
                                <Grid item className="mr-2">
                                    <Button variant="outlined" className="color-primary border-primary" onClick={handleClose}>
                                        CANCEL
                                    </Button>
                                </Grid>
                                <Grid item >
                                    <Button variant="contained" color="primary" size="medium" className={classes.addBtn}
                                        disabled={!currentManager.firstName && !currentManager.lastName && !currentManager.mobile ? true : false}
                                        onClick={addManager}>
                                        ADD
                                    </Button>
                                </Grid>
                            </Grid>
                        </div>
                    </Paper>
                </ThemeProvider>
            </Modal>
        </div>
    )

}

export default AddSiteManagerPopUp;