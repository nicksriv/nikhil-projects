import React, { useState } from 'react';
import {
    makeStyles,
    // ThemeProvider, createTheme 
} from '@material-ui/core/styles';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import LocalPhoneIcon from '@material-ui/icons/LocalPhone';
import { Grid, InputAdornment, MenuItem, TextField, Chip } from '@material-ui/core';
import { V5GlobalFormFooter,Multiselect} from 'app/components';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import DisabledView from 'app/components/EmptyView/DisabledView';
import { setFilteredLocationEmpty } from 'app/redux/UserManagement/userManagementSlice';
import MultipleDates from 'app/components/MultipleDate/MultipleDates';



const useStyles = makeStyles((theme) => ({
    paper: {
        backgroundColor: 'white',
        width: '98%',
        height: 'auto',
        borderLeft: '4px solid #2C3E93',
        borderRadius: '3px',
        position: 'relative',
        boxShadow: ' 2px 3px rgba(0, 0, 0, 0.1)',
        marginBottom: '1.5rem',
        paddingBottom: "5rem",
        flex: 1,
        marginTop: '4rem'
    },
    paperlast: {
        width: '98%',
        height: 'auto',
        backgroundColor: 'white',
        boxShadow: '0 0 0 1px rgba(0,0,0,0.05)',
        position: 'relative',
        paddingBottom: "2rem"
    },
    paperBottom: {
        borderTop: '0.5px solid rgba(0,0,0,0.1)',
        width: '98%',
        height: '3rem',
        position: 'absolute',
        bottom: 0,
        marginTop: "15rem"
    },
    paperBottomlast: {
        borderTop: '0.5px solid rgba(0,0,0,0.1)',
        position: 'absoute',
        bottom: 0,
        marginTop: '2rem',
    },

    icon: {
        position: 'absolute',
        bottom: '0.5rem',
        right: '1rem',
        color: '#00000061',
        cursor: 'pointer',
    },
    iconDisabled: {
        position: 'absolute',
        bottom: '0.5rem',
        right: '1rem',
        color: '#0000001F',
    },
    phoneIcon: {
        color: '#E1E1E0',
    },
    disabledInput: {
        "& .MuiInputBase-root.Mui-disabled": {
            color: "#000000BC"
        }
    },
    disabledInputLabel: {
        "& .MuiFormLabel-root.Mui-disabled": {
            color: "#000000BC"
        }
    },
    root:{
        // "&.MuiTextField-root":{
        //     // backgroundColor:"green",
        //     border:"100px !important"
        // },
        // "& .Mui-focused": {
        //     color: "tomato", 
        //     fontWeight: "bold",
        //     borderColor:"transparent"
        //   },
    }
    
}));

// const custom = createTheme({
//     palette: {
//         primary: {
//             main: "#2C3E93"
//         }
//     },
// });              


function MappedLocation(props) {
    const {
        pageMode,
        pageSource,
        backArrowDisabled,
        nextArrowDisabled,
        cancelBtnDisabled,
        saveAndContinueBtnDisabled,
        handleNextArrow,
        handleBackArrow,
        handleSaveAndContinue,
        handleCanceBtn,
    } = props;

    const classes = useStyles();
    const [editRecordId, setEditRecordId] = useState('');
    const [editStoreId, setStoreId] = useState(null);

    const [days, setDays] = useState([]);
    const [dates, setDates] = useState("");
    const [editDays, setEditDays] = useState([]);
    const [editDates, setEditDates] = useState("");
    const [chips, setChips] = useState([]);
    const [editChips, setEditChips] = useState([]);
    const [errorMessage,setErrorMessage] = useState('')

    const [editingLocation, setEditingLocation] = useState(false);
    
    const { clientStores, mappedLocations, filteredMappedLocation, id, activeStep ,weekDays} = useSelector((state) => state.users);
    const dispatch = useDispatch();
    const addMappedLocation = () => {
        let hasDuplicateLocation = false;
        mappedLocations.forEach((location) => {
            if (JSON.stringify(location.siteId) === JSON.stringify(filteredMappedLocation.siteId)) {
                hasDuplicateLocation = true;
            }

        });

        if (!mappedLocations.includes(filteredMappedLocation) && !hasDuplicateLocation) {
            dispatch({
                type: "setMappedLocationDetailsAction",
                payload: {
                    name: '',
                    value: '',
                    filtredLocation: {...filteredMappedLocation, days, dates: chips}
                },
            });
            dispatch({
                type: setFilteredLocationEmpty.type,
            });
            setDays([])
            setDates("")
            setChips([])
        }
    }



    const selectLocationId = (e) => {
        const { name, value } = e.target;
        let hasDuplicateLocation = false;

        mappedLocations.forEach((location) => {
            if (JSON.stringify(location.id) === JSON.stringify(value)) {
                hasDuplicateLocation = true;
            }

        });

        if (!hasDuplicateLocation) {
            dispatch({
                type: "setSelectedMappedLocationDetailAction",
                payload: {
                    name,
                    value,
                },
            });
        } 
    }

    const EditLocationId = (e, storeId) => {
        const { value } = e.target;
        setStoreId(value);
        
        // const uniqueLocations = [...mappedLocations].map(l => {
        //     if (storeId === l.siteId) {
        //         return {
        //             ...l,
        //             siteId: value
        //         }
        //     }
        //     return l
        // })
        
        // if (!mappedLocations.includes(filteredMappedLocation)) {
        //     dispatch({
        //         type: "setMappedLocationDetailsAction",
        //         payload: {
        //             name: '',
        //             value: '',
        //             filtredLocation: uniqueLocations

        //         },
        //     });
        // }
    }

    const handleDelete = (siteId) => {
        let remainingLocations = mappedLocations.filter(location => location.siteId !== siteId);
        let deletedLocations = mappedLocations.filter(location => location.siteId === siteId);
        dispatch({
            type: "setMappedLocationDetailsAction",
            payload: {
                name: '',
                value: '',
                filtredLocation: remainingLocations
            },
        });
        dispatch({
            type: 'putUserLocationDetailsByIdAction',
            payload: {
                mappedLocations: remainingLocations,
                id: id,
                activeStep: activeStep - 1,
                deletedLocations: deletedLocations,

            },
        })
    }

    const handleEdit = (siteId, days, dates) => {
        setEditingLocation(true);
        setStoreId(siteId);
        setEditRecordId(siteId);
        setEditDates('');
        setEditChips(dates);
        setEditDays(days);
    }

    const handleSave = (siteId) => {
        const uniqueLocations = [...mappedLocations].map(l => {
            if (siteId === l.siteId) {
                return {
                    ...l,
                    siteId: editStoreId,
                    days: editDays,
                    dates: editChips,
                }
            }
            return l
        })
        
        if (!mappedLocations.includes(filteredMappedLocation)) {
            dispatch({
                type: "setMappedLocationDetailsAction",
                payload: {
                    name: '',
                    value: '',
                    filtredLocation: uniqueLocations

                },
            });
        }
        console.log({ uniqueLocations, mappedLocations });
        
        setEditingLocation(false);
        setStoreId('');
        setEditRecordId('');
        setEditDates('');
        setEditChips([]);
        setEditDays([]);
    }

    const handleDayChange = (event) => {
        setDays(event.target.value)
    }
    const handleDayEditChange = (e) => {
        setEditDays(e.target.value);
    }

    const handleDateChange = (e) => {
        setDates(e.target.value);
    }
    const handleDateEditChange = (e) => {
        setEditDates(e.target.value);
    }
    
    const handleValidation = (value) => {
        let isValid = 1;
        let message = "";

        const dateRegex = /^([0]?[1-9]|[1|2][0-9]|[3][0|1])[-]([0]?[1-9]|[1][0-2])[-]([0-9]{4})$/;
        if (!dateRegex.test(value)) {
            message = "Please Enter in format dd-mm-yyyy ";
            isValid = 0;
        }
        return { isValid, message };
    }
     
    const addDate = (e, mode = "") => {
        if (e.key === 'Enter') {
            setErrorMessage('')
            const valid = handleValidation(e.target.value);
            if (valid.isValid) {
            //    return message
            setErrorMessage(valid.message)
            }
            else{
                if (mode === "EDIT_MODE") {
                    let newDate = [...editChips];
                    newDate.push(editDates);
                    setEditChips(newDate);
                    setEditDates("");
                } else {
                    let newDate = [...chips];
                    newDate.push(dates);
                    setChips(newDate);
                    setDates("");
                }
                
            }
        }
    };

    const removeDate = (item, mode = "") => {
        if (mode === "EDIT_MODE") {
            let removeitem = [...editChips];
            const itemIndex = removeitem.indexOf(item);
            if(itemIndex > -1){
                removeitem.splice(itemIndex,1)
            }
            setEditChips(removeitem)
        } else {
            let removeitem = [...chips];
            const itemIndex = removeitem.indexOf(item);
            if(itemIndex > -1){
                removeitem.splice(itemIndex,1)
            }
            setChips(removeitem)
        }
    }

    const activeSites = clientStores;
    return (
        <div>
            {/* <ThemeProvider theme={custom}> */}
            <form>
                {pageMode !== "view" &&
                    <div style={{ width: "98%" }} className={classes.paper}>
                        <Grid container className="w-full" spacing="5">
                            <Grid item xs={12} sm={12} md={6} lg={4}>
                                <TextField
                                    onChange={(e) => selectLocationId(e)}
                                    id="storeId"
                                    name="storeId"
                                    label="Location ID"
                                    placeholder="eg: STR0010"
                                    value={filteredMappedLocation.id === undefined ? "" : filteredMappedLocation.id}
                                    select
                                    variant="outlined"
                                    required
                                    disabled={pageMode === "view" ? true : false}
                                    className="ml-5 pr-8 w-full"
                                    InputLabelProps={{
                                        classes: {
                                            asterisk: 'text-error',
                                        },
                                    }}
                                    SelectProps={{
                                        MenuProps: {
                                            anchorOrigin: {
                                                vertical: "bottom",
                                                horizontal: "left"
                                            },
                                            getContentAnchorEl: null
                                        }
                                    }}
                                >
                                    {
                                        activeSites.map((store) => {
                                            return <MenuItem value={store.id} key={store.id} id={store.siteId}>
                                                {store.siteId}
                                            </MenuItem>
                                        })
                                    }


                                </TextField>
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={8}>
                                <TextField

                                    disabled
                                    value={filteredMappedLocation?.siteId ? filteredMappedLocation.address : ''}
                                    id="address"
                                    name="address"
                                    label="Address"
                                    type="text"
                                    variant="outlined"
                                    className="ml-5 pr-8 w-full"
                                />
                            </Grid>
                        </Grid>

                        <Grid container spacing="5" className="mt-5" >
                            <Grid item xs={12} sm={12} md={6} lg={4}>
                                <TextField
                                    disabled
                                    value={filteredMappedLocation?.siteId ? filteredMappedLocation.managers.map((details) => details.id) : ''}
                                    id="storeManagerId"
                                    name="storeManagerId"
                                    label="Store Manager Emp ID"
                                    type="text"
                                    variant="outlined"
                                    className="ml-5 pr-8 w-full"
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={4}>
                                <TextField
                                    disabled
                                    value={filteredMappedLocation?.siteId ? filteredMappedLocation.managers.map((details) => details.firstName + " " + details.lastName) : ''}
                                    id="storeManagerName"
                                    name="storeManagerName"
                                    label="Store Head Emp Name"
                                    type="text"
                                    variant="outlined"
                                    className="ml-5 pr-8 w-full"
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={4}>
                                <TextField
                                    disabled
                                    value={filteredMappedLocation?.siteId ? filteredMappedLocation.managers.map((manager) => manager.mobile) : ''}
                                    id="storeManagerMobile"
                                    name="storeManagerMobile"
                                    label="Mobile Number"
                                    type="text"
                                    variant="outlined"
                                    className="ml-5 pr-8 w-full"

                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <LocalPhoneIcon
                                                    className={classes.phoneIcon}
                                                />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={4} className='ml-5'>
                                <Multiselect
                                label="Availibility Days"
                                roles={weekDays}
                                roleName={days}
                                handleRoleChange={handleDayChange}

                                />
                                </Grid>
                                <Grid item xs={12} sm={6} md={6} lg={4}>
                                    <MultipleDates
                                        chipsData={chips}
                                        value={dates}
                                        placeholder="Enter Availibility Dates (DD/MM/YYYY)"
                                        onChange={handleDateChange}
                                        onKeyPress={addDate}
                                        onChipDelete={removeDate}
                                        helperText={errorMessage}
                                       
                                    />
                                </Grid>
                                
                        </Grid>

                        <div className={classes.paperBottom}>
                            {filteredMappedLocation?.siteId ? (
                                <AddCircleIcon
                                    className={classes.icon}
                                    onClick={addMappedLocation}
                                />
                            ) : (
                                <AddCircleIcon className={classes.iconDisabled} />
                            )}
                        </div>
                    </div>}

                {
                    pageMode === "view" && mappedLocations.length === 0 &&
                    <DisabledView
                        imgSrc="/assets/images/No Data Illustration-disabled.svg"
                        title="No Location have been Added yet."
                        textSize="h1"
                    />
                }

                {mappedLocations && mappedLocations.length > 0 ? mappedLocations.map((location) => {
                    return <div className={`mt-1 mb-8 ${classes.paperlast}`}>
                        <form>
                            <Grid container spacing="5" className='mt-1'>
                                <Grid item xs={12} sm={12} md={6} lg={4}>
                                    <TextField
                                        disabled={editingLocation && editRecordId === location.siteId ? false : true}
                                        value={editingLocation && editRecordId === location.siteId ? editStoreId : location.siteId}
                                        id="storeId"
                                        name="storeId"
                                        label="Location ID"
                                        select
                                        onChange={(e) => EditLocationId(e, location.siteId)}
                                        variant="outlined"
                                        required
                                        //className="ml-5 pr-8 w-full"
                                        className={`ml-5 pr-8 w-full
                            ${pageMode === "view" ?
                                                `${classes.disabledInput} ${classes.disabledInputLabel}`
                                                : `${classes.root}`}`}
                                        InputLabelProps={{
                                            classes: {
                                                asterisk: 'text-error',
                                            },
                                        }}
                                        SelectProps={{
                                            MenuProps: {
                                                anchorOrigin: {
                                                    vertical: "bottom",
                                                    horizontal: "left"
                                                },
                                                getContentAnchorEl: null
                                            }
                                        }}
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        {editingLocation && editRecordId === location.siteId ?
                                            activeSites.map((store) => {
                                                return <MenuItem value={store.siteId} key={store.id} id={store.siteId}>
                                                    {store.siteId}
                                                </MenuItem>
                                            }) : <MenuItem value={location.siteId}>
                                                {location.siteId}
                                            </MenuItem>
                                        }


                                    </TextField>
                                </Grid>
                                <Grid item xs={12} sm={12} md={6} lg={8}>
                                    <TextField
                                        disabled
                                        value={location?.address ? location.address : ""}
                                        id="address"
                                        name="address"
                                        label="Address"
                                        type="text"
                                        variant="outlined"
                                        className="ml-5 pr-8 w-full"
                                    />
                                </Grid>
                            </Grid>
                            <Grid container spacing="5" className="mt-4">
                                <Grid item xs={12} sm={12} md={6} lg={4}>
                                    <TextField
                                        disabled
                                        value={location?.managers.map((details) => details.id)}
                                        id="storeManagerId"
                                        name="storeManagerId"
                                        label="Store Manager Emp ID"
                                        type="text"
                                        variant="outlined"
                                        className="ml-5 pr-8 w-full"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={6} lg={4}>
                                    <TextField
                                        disabled
                                        value={location?.managers.map((details) => details.firstName + " " + details.lastName)}
                                        id="storeManagerName"
                                        name="storeManagerName"
                                        label="Store Head Emp Name"
                                        type="text"
                                        variant="outlined"
                                        className="ml-5 pr-8 w-full"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={6} lg={4}>
                                    <TextField
                                        disabled
                                        value={location?.managers.map((details) => details.mobile)}
                                        id="storeManagerMobile"
                                        name="storeManagerMobile"
                                        label="Mobile Number"
                                        type="text"
                                        variant="outlined"
                                        className="ml-5 pr-8 w-full"
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <LocalPhoneIcon
                                                        className={
                                                            classes.phoneIcon
                                                        }
                                                    />
                                                </InputAdornment>
                                            ),
                                        }}

                                    />
                                </Grid>

                                <Grid item xs={12} sm={12} md={6} lg={4}
                                    className='ml-5'
                                >
                                    <Multiselect
                                        label="Availibility Days"
                                        disabled={editingLocation && editRecordId === location.siteId ? false : true}
                                        roles={weekDays}
                                        roleName={editingLocation && location.siteId === editRecordId ? editDays : (location.days || []) }
                                        handleRoleChange={handleDayEditChange}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6} md={6} lg={4}>
                                    <MultipleDates
                                        disabled={editingLocation && editRecordId === location.siteId ? false : true}
                                        chipsData={editingLocation && location.siteId === editRecordId ? editChips : (location.dates || []) }
                                        value={editDates}
                                        placeholder="Enter Availibility Dates (DD-MM-YYYY)"
                                        onChange={handleDateEditChange}
                                        onKeyPress={(e) => addDate(e, 'EDIT_MODE')}
                                        onChipDelete={(e) => removeDate(e, 'EDIT_MODE')}
                                        helperText={errorMessage}
                                       
                                    />
                                </Grid>
                                
                            </Grid>
                        </form>
                        {
                            pageMode !== "view" &&
                            (
                                <div
                                    className={`${classes.paperBottomlast} ml-0 pb-4 mt-5 `}
                                >
                                    <div className={classes.icon}>
                                        <DeleteIcon className="mr-5 mt-5" onClick={() => handleDelete(location.siteId)} />
                                        {editRecordId && editRecordId === location.siteId ? (
                                            <SaveIcon className="ml-5" onClick={() => handleSave(location.siteId)} /> 
                                        ) : (
                                            <EditIcon className="ml-5" onClick={() => handleEdit(location.siteId, location.days, location.dates)} />
                                        )}
                                    </div>
                                </div>
                            )
                        }
                    </div>
                }) : null}
                <div className="pt-25 mt-25">
                    <V5GlobalFormFooter
                        isSubmit={false}
                        pageMode={pageMode}
                        backArrowDisabled={backArrowDisabled}
                        nextArrowDisabled={nextArrowDisabled}
                        cancelBtnDisabled={cancelBtnDisabled}
                        saveAndContinueBtnDisabled={saveAndContinueBtnDisabled}
                        handleNextArrow={handleNextArrow}
                        handleBackArrow={handleBackArrow}
                        handleSaveAndContinue={(e) => handleSaveAndContinue(e, pageSource.MAPPED)}
                        handleCanceBtn={handleCanceBtn}
                    />
                </div>

            </form>
            {/* </ThemeProvider> */}
        </div>
    )
}

export default MappedLocation
