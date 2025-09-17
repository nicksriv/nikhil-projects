import { Grid, MenuItem, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
//import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import React from 'react';
import { V5GlobalFormFooter } from '../../../../components';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    root: {
        "& .MuiInputLabel-root": {
            color: "#00000099",
            fontWeight: "400"
        },
        "& .MuiFormLabel-root.Mui-focused": {
            color: "#1976d2"
        }
    },
    paper: {
        width: '100%',
        height: '15rem',
        borderRadius: '3px',
        position: 'relative',
        marginBottom: '5rem',
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        marginRight: "10rem",
        marginTop: "3rem"
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
}))

// const custom = createTheme({
//     palette: {
//         primary: {
//             main: "#2C3E93"
//         }
//     },
// });

function validateUserInputValues(fieldName, fieldValue) {
    let isValid = false
    const alphaNumericRegx = '^[A-Z]{4}0[A-Z0-9]{6}$'
    const onlyNumbersRegex = '^d{9,18}$'
    const onlyAlbhabetsRegex = /^[A-Za-z]+$/

    switch (fieldName) {
        case 'ifsccode':
            //..Allow Alphabets and numeric values only
            if (fieldValue === '' || fieldValue.trim().match(alphaNumericRegx)) {
                isValid = true
            }
            break
        case 'accountNumber':
            //..
            if (fieldValue === '' || fieldValue.trim().match(onlyNumbersRegex)) {
                isValid = true
            }
            break
        case 'branchName':
            //..Allow Alphabets only
            if (
                fieldValue === '' ||
                fieldValue.trim().match(onlyAlbhabetsRegex)
            ) {
                isValid = true
            }
            break

        default:
            isValid = true
            break
    }
    return isValid
}

function BankDetails(props) {
    const {
        // formValues,
        // states,
        // cities,
        pageMode,
        //pageSource,
        //genders,
        handleInputChange,
        //handleStatusChange,
        backArrowDisabled,
        nextArrowDisabled,
        cancelBtnDisabled,
        saveAndContinueBtnDisabled,
        handleNextArrow,
        handleBackArrow,
        //handleSaveAndContinue,
        handleCanceBtn,
        //styleObj,
        errorState,
        //handleDate,
        //errors,
        //touched,
        handleSubmit,
        //handleChange,
        // isValid,
        // setFieldValue,
        // validateField,
        // setFieldTouched
    } = props;
    const classes = useStyles();
    const { bankMaster, userBankDetails,
        isBasicDetailsSaved,
        isEmploymentDetailsSaved,
        isMappedLocationSaved, mappedLocations } = useSelector((state) => state.users);
    return (
        <div>
            {/* <ThemeProvider theme={custom}> */}


            <from>
                <div className={`${classes.paper} w-full`}>
                    <Grid container spacing="5" className='w-full'>
                        <Grid item xs={12} sm={12} md={6} lg={4}>
                            <TextField
                                id="bankName"
                                name="bankName"
                                label="Bank Name"
                                select
                                variant="outlined"
                                value={userBankDetails.bankName}
                                onChange={handleInputChange}
                                className={`w-full
                            ${pageMode === "view" ?
                                        `${classes.disabledInput} ${classes.disabledInputLabel}`
                                        : `${classes.root}`}`}
                                disabled={pageMode === "view" ? true : false}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {bankMaster.map((bank) => {
                                    return < MenuItem value={bank} key={bank} >
                                        {bank}
                                    </MenuItem>
                                })}
                            </TextField>
                        </Grid>
                    </Grid>
                    <Grid container spacing="4" className="mt-5 w-full">
                        <Grid item xs={12} sm={12} md={6} lg={4}>
                            <TextField
                                id="ifscCode"
                                name="ifscCode"
                                label="IFSC Code"
                                value={userBankDetails.ifscCode}
                                onChange={handleInputChange}
                                type="text"
                                variant="outlined"
                                className={`w-full
                            ${pageMode === "view" ?
                                        `${classes.disabledInput} ${classes.disabledInputLabel}`
                                        : `${classes.root}`}`}
                                disabled={pageMode === "view" ? true : false}
                                error={errorState
                                    && errorState.userBankDetails
                                    && errorState.userBankDetails.ifscCode
                                    && errorState.userBankDetails.ifscCode.error}
                                helperText={errorState
                                    && errorState.userBankDetails
                                    && errorState.userBankDetails.ifscCode
                                    && errorState.userBankDetails.ifscCode.error
                                    && errorState.userBankDetails.ifscCode.errorMsg}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={4}>
                            <TextField
                                id="accountNumber"
                                name="accountNumber"
                                label="Account Number"
                                value={userBankDetails.accountNumber}
                                onChange={handleInputChange}
                                type="text"
                                variant="outlined"
                                className={`w-full
                                ${pageMode === "view" ?
                                        `${classes.disabledInput} ${classes.disabledInputLabel}`
                                        : `${classes.root}`}`}
                                disabled={pageMode === "view" ? true : false}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={4}>
                            <TextField
                                id="branchName"
                                name="branchName"
                                label="Branch Name"
                                value={userBankDetails.branchName}
                                onChange={handleInputChange}
                                type="text"
                                variant="outlined"
                                className={`w-full
                            ${pageMode === "view" ?
                                        `${classes.disabledInput} ${classes.disabledInputLabel}`
                                        : `${classes.root}`}`}
                                disabled={pageMode === "view" ? true : false}
                            />
                        </Grid>
                    </Grid>
                </div>
                <V5GlobalFormFooter
                    isSubmit={true}
                    pageMode={pageMode}
                    backArrowDisabled={backArrowDisabled}
                    nextArrowDisabled={nextArrowDisabled}
                    cancelBtnDisabled={cancelBtnDisabled}
                    //saveAndContinueBtnDisabled={saveAndContinueBtnDisabled}
                    saveAndContinueBtnDisabled={pageMode === "add" ? (isBasicDetailsSaved &&
                        isEmploymentDetailsSaved &&
                        isMappedLocationSaved) ? false : true : pageMode === "edit" && !isMappedLocationSaved ? true : false}
                    handleNextArrow={handleNextArrow}
                    handleBackArrow={handleBackArrow}
                    handleSubmit={handleSubmit}
                    handleCanceBtn={handleCanceBtn}
                />
            </from>
            {/* </ThemeProvider> */}
        </div>
    )
}

export default BankDetails
