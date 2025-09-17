import React, { useState, useEffect } from 'react'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { makeStyles } from "@material-ui/core/styles";
import { capitalize } from 'helper/utils';
import CircleUnchecked from "@material-ui/icons/RadioButtonUnchecked";
import CircleCheckedFilled from "@material-ui/icons/CheckCircle";
import { Button, Checkbox, Chip, FormControlLabel, Grid, TextField } from '@material-ui/core';
import history from 'helper/history.js';
import queryString from 'query-string';
import DisabledView from 'app/components/EmptyView/DisabledView';
import V5GlobalFooterButtons from 'app/components/V5GlobalFooterButtons/V5GlobalFooterButtons.jsx'
import { useDispatch, useSelector } from 'react-redux'; 
import { ConfirmationDialog } from 'app/components';

function Role() {

    const useStyles = makeStyles((theme) => ({
        root: {
            "& .MuiFormControlLabel-label": {
                color: "#000000BC" // or black
            },
            "& .MuiChip-label": {
                color: "#00000061"
            },
            "& .MuiChip-outlined": {
                backgroundColor: "white",
                height: "1.8rem"
            }
        },
        stickyHeader: {
            position: "sticky",
            top: "0rem",
            backgroundColor: "#f5f5f5",
            zIndex: "100",
            paddingTop: "1rem"
        },
        actvBtn: {
            backgroundColor: "#E5F2F0",
            color: "#2C3E93",
            border: "1px solid #2C3E93",
            padding: "0 0 0 1rem",
            margin: "0 0.5rem",
            height: "2rem",
        },
        inctvBtn: {
            backgroundColor: "#EBD9DC",
            border: "1px solid #B10021",
            padding: "0 0 0 1rem",
            height: "2rem",
            margin: "0 0.5rem",
            color: "#B10021"
        },
        button: {
            padding: "0 0 0 1rem",
            margin: "0 0.5rem",
            height: "2rem",
            backgroundColor: "white"
        },
        textBox: {
            width: "37rem"
        },
        statusControl: {
            marginLeft: "12rem",
            color: "light-gray"
        },
        helperText: {
            textAlign: "right"
        }
    }));

    const [pageMode, setPageMode] = useState("");
    const [showDeletePopup, setshowDeletePopup] = useState(false);

    const classes = useStyles();
    const { roleDetails, saveAndContinueBtnDisabled } = useSelector((state) => state.roles);
    const { clientIdForUserLogo } = useSelector((state) => state.users);
    const dispatch = useDispatch();

    useEffect(() => {
        const parsedQS = queryString.parse(window.location.search);
        const { pathname } = window.location;
        let currentMode = pathname.replace("/role/", "").trim();
        setPageMode(pathname.replace("/role/", "") && pathname.replace("/role/", "").trim());
        if (currentMode === "add") {
            dispatch({
                type: "setRoleDetailsAction",
                payload: {
                    name: "status",
                    value: "ACTIVE",
                }
            })
        }

        if (parsedQS && parsedQS.id) {
            dispatch({
                type: "getIndividualRoleAction",
                payload: {
                    id: parsedQS.id
                }
            })
        }
    }, []);

    //....VALIDATE ROLE DESCRIPTION INPUT VALUES
    function validateRoleInputValues(fieldName, fieldValue) {
        let isValid = false;
        const regexOnlyAlphabetsWithSpaces = /^[a-zA-z]+([\s][a-zA-Z]+)*$/;
        switch (fieldName) {
            case 'name':
            case 'description':
                //..Allow Alphabets only along with spaces
                if (
                    fieldValue === '' ||
                    fieldValue.trim().match(regexOnlyAlphabetsWithSpaces)
                ) {
                    isValid = true;
                }
                break
            default:
                isValid = true;
                break
        }
        return isValid
    }
    const handleBack = () => {
        history.push('/role-management');
    }
    const handleInputChange = (e, status) => {
        const { name, value } = e.target;
        if (!validateRoleInputValues(name, value)) return
        if (status) {
            dispatch({
                type: "setRoleDetailsAction",
                payload: {
                    name: "status",
                    value: status,
                }
            })
        } else {
            dispatch({
                type: "setRoleDetailsAction",
                payload: {
                    name: name,
                    value: value
                }
            })
        }
    }
    const saveData = () => {
        const parsedQS = queryString.parse(window.location.search);
        if (pageMode === "edit") {
            dispatch({
                type: "setIndividualRoleAction",
                payload: {
                    id: parsedQS.id,
                    roleDetails: roleDetails
                }
            })
            history.push('/role-management')
        } else {
            let requestBody = {...roleDetails, clientId: clientIdForUserLogo}
            dispatch({
                type: "setRoleAction",
                payload: {
                    roleDetails: requestBody
                }
            })
            history.push('/role-management')
        }
    }
    const handleCancel = () => {
        setshowDeletePopup(true);
    }
    const confirmDelete = () => {
        history.push('/role-management')
    }
    return (
        <Grid className={`pb-15 ${classes.root}`}>
            <div className="analytics m-sm-30">
                <div className={classes.stickyHeader}>
                    <Grid container spacing={2} justify="space-between" className="flex items-center pt-2">
                        <Grid item className="flex">
                            <ArrowBackIcon onClick={handleBack} className="cursor-pointer mt-2 text-light-gray" />
                            <h1 className="ml-10px">{pageMode && capitalize(pageMode)} Role</h1>
                        </Grid>
                    </Grid>
                </div>
                <Grid className="mt-8 flex items-center" container lg={12}>
                    <Grid lg={6}>
                        <TextField
                            FormHelperTextProps={{
                                className: classes.helperText
                            }}
                            type="text"
                            label="Role Name"
                            variant="outlined"
                            name="name"
                            InputLabelProps={{
                                shrink: true,
                                classes: {
                                    asterisk: 'text-error'
                                }
                            }}
                            value={roleDetails && roleDetails.name}
                            onChange={handleInputChange}
                            disabled={pageMode === "view" && true}
                            className={`${classes.textBox} ml-8`}
                            helperText={`${roleDetails.name.length} / 50`}
                            error={roleDetails.name.length > 50 && true}
                        />
                    </Grid>
                    <Grid lg={6}>
                        {pageMode !== "view" ? <FormControlLabel
                            FormHelperTextProps={{
                                className: classes.helperText
                            }}
                            value="status"
                            name="status"
                            label="Status:"
                            labelPlacement="start"
                            size="small"
                            className={classes.statusControl}
                            control={
                                <>
                                    <Button variant="outlined" size="small"
                                        onClick={(e) => handleInputChange(e, "INACTIVE")}
                                        name="status"
                                        className={roleDetails.status === "INACTIVE" ? classes.inctvBtn : classes.button}
                                    >
                                        INACTIVE
                                        <Checkbox
                                            name="INACTIVE"
                                            icon={<CircleUnchecked />}
                                            checked={roleDetails.status === "INACTIVE" ? true : false}
                                            checkedIcon={<CircleCheckedFilled style={{ color: "#B10021" }} />}
                                        />
                                    </Button>

                                    <Button variant="outlined" size="small"
                                        onClick={(e) => handleInputChange(e, "ACTIVE")}
                                        name="status"
                                        className={roleDetails.status === "ACTIVE" ? classes.actvBtn : classes.button}
                                    >
                                        ACTIVE
                                        <Checkbox color='primary' name="ACTIVE"
                                            icon={<CircleUnchecked />}
                                            checked={roleDetails.status === "ACTIVE" ? true : false}
                                            checkedIcon={<CircleCheckedFilled />}
                                        />
                                    </Button>
                                </>
                            }
                        /> : <FormControlLabel
                            FormHelperTextProps={{
                                className: classes.helperText
                            }}
                            value="status"
                            name="status"
                            label="Status:"
                            labelPlacement="start"
                            size="small"
                            className={classes.statusControl}
                            control={
                                <>
                                    {roleDetails.status === "INACTIVE" ? <Button variant="outlined" size="small"
                                        name="status"
                                        className={roleDetails.status === "INACTIVE" ? classes.inctvBtn : classes.button}
                                    >
                                        INACTIVE
                                        <Checkbox
                                            name="INACTIVE"
                                            icon={<CircleUnchecked />}
                                            checked={roleDetails.status === "INACTIVE" ? true : false}
                                            checkedIcon={<CircleCheckedFilled style={{ color: "#B10021" }} />}
                                        />
                                    </Button> : <Button variant="outlined" size="small"
                                        name="status"
                                        className={roleDetails.status === "ACTIVE" ? classes.actvBtn : classes.button}
                                    >
                                        ACTIVE
                                        <Checkbox color='primary' name="ACTIVE"
                                            icon={<CircleUnchecked />}
                                            checked={roleDetails.status === "ACTIVE" ? true : false}
                                            checkedIcon={<CircleCheckedFilled />}
                                            />
                                    </Button>}

                                </>
                            }
                        />}

                    </Grid>
                </Grid>
                <Grid className="mt-4" lg={12}>
                    <TextField
                        FormHelperTextProps={{
                            className: classes.helperText
                        }}
                        label="Description (optional)"
                        multiline
                        value={roleDetails && roleDetails.description}
                        className="w-full ml-8 pr-8"
                        name="description"
                        disabled={pageMode === "view" && true}
                        rows={3}
                        onChange={handleInputChange}
                        variant="outlined"
                        helperText={`${roleDetails.description.length} / 250`}
                        error={roleDetails.description.length > 250 && true}

                    />
                </Grid>

            </div>
            <Grid lg={12} className="ml-5 pr-8 mb-5">
                <h5 className="ml-11 text-black mb-5 font-medium">Assigned Modules</h5>
                {roleDetails && roleDetails.modules?.length > 0 ? <div className='flex flex-wrap ml-9'>
                    {
                        roleDetails.modules.map((module) => <Chip key={module.id} label={module.name} variant='outlined' className='mx-1 mt-2' />)
                    }
                </div> : <DisabledView
                        isLeftAligned={true}
                    imgSrc="/assets/images/No Data Illustration-gray.svg"
                    title="Roles will be assigned and managed through screen builder while configuring a module."
                />}

            </Grid>
            {pageMode !== "view" && <Grid className='mr-3 pt-5 position-bottom-right mb-5'>
                <V5GlobalFooterButtons outlinedButtonText="Cancel" solidButtonText="Save" isDisabled={pageMode === "edit" && roleDetails.name.length < 50 && roleDetails.description.length < 250 && roleDetails.name.length !== 0 ? false : roleDetails.name.length > 50 || roleDetails.description.length > 250 ? true : saveAndContinueBtnDisabled} saveData={saveData} handleCancel={handleCancel} />
            </Grid>}
            <ConfirmationDialog
                open={showDeletePopup}
                onConfirmDialogClose={() => setshowDeletePopup(false)}
                text={`Are you sure to discard the changes ?`}
                onYesClick={confirmDelete}
            />
        </Grid>
    )
}

export default Role
