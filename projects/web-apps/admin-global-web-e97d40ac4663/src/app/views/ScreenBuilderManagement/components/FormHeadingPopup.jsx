import { Box, Modal, TextField, Button } from '@material-ui/core';
import React from 'react';
import { makeStyles } from "@material-ui/core/styles";

function FormHeadingPopup(props) {
    const {
        open,
        charecterLimit,
        popupHeading,
        inputLabel,
        inputValue,
        inputName,
        handleTitleText,
        handleSave,
        handlePopUpClose,
        isRequired,
        errorState } = props;

    const useStyles = makeStyles((theme) => ({
        helperText: {
            marginRight: "3%",
            textAlign: "right"
        },
        cancelBtn: {
            width: "6rem"
        }
    }));
    const classes = useStyles();
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 300,
        bgcolor: 'background.paper',
       // border: '2px solid #000',
        boxShadow: 24,
        p: 3,
        border: 'none !important',
        borderRadius: "2px"
    };

    return (
        <div>
            <Modal
                open={open}
                onClose={handlePopUpClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                style={{backgroundColor:"rgba(0,0,0,0.6)"}}
            >
                <Box sx={style}>
                    <h5 className='font-normal'>{popupHeading}</h5>
                    <TextField
                        FormHelperTextProps={{
                            className: classes.helperText
                        }}
                        inputProps={{
                            maxlength: charecterLimit
                        }}
                        id="outlined-basic"
                        label={inputLabel}
                        value={inputValue}
                        name={inputName}
                        variant="outlined"
                        className="mt-5 w-full"
                        onChange={(e) => handleTitleText(e)}
                        required={isRequired}
                        InputLabelProps={{
                            classes: {
                                asterisk: `${isRequired ? 'text-error' : ''}`,
                                className: classes.input,
                            }
                        }}
                        error={(errorState && errorState[inputName] && errorState[inputName].error) || inputValue.length === charecterLimit ? true : ""}
                        helperText={`${inputValue.length} / ${charecterLimit}`}
                    />
                    <div className="flex items-center mt-8 float-right ">
                        <Button size='small' className={`mr-5 font-normal color-primary border-primary ${classes.cancelBtn}`} variant="text" onClick={handlePopUpClose}>Cancel</Button>
                        <Button disabled={inputValue ? false : true} variant="contained" color="primary" onClick={(e) => handleSave(e)}>Save</Button>
                    </div>
                </Box>
            </Modal>
        </div>
    )
}

export default FormHeadingPopup;
