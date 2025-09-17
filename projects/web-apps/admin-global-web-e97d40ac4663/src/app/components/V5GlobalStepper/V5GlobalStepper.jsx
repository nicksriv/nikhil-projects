import React from 'react';
import {
    Stepper, Step, StepLabel
} from '@material-ui/core';
import PropTypes from "prop-types";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        "& .MuiStepConnector-active .MuiStepConnector-line": {
            borderColor: "#2C3E93"
        },
        "& .MuiStepConnector-completed .MuiStepConnector-line": {
            borderColor: "#2C3E93"
        },
        "& .MuiStepLabel-labelContainer .MuiStepLabel-label.MuiStepLabel-active": {
            color:'#2C3E93',
            fontWeight: "500"
        },
        "& .MuiStepLabel-labelContainer .MuiStepLabel-label.MuiStepLabel-completed": {
            color:'#2C3E93',
            fontWeight: "400"
        },
    },
    stepIconStyle: {
        "& .MuiSvgIcon-root":{
            fill:"#2C3E93",
        },
        "& .MuiStepIcon-text":{
            fill:"#000000"
        },
        "& .Mui-disabled .MuiStepLabel-iconContainer .MuiStepIcon-root": {
            fill:'#FFFFFF',
            display: "block",
            border: "1px solid #000000BC",
            opacity: 1,
            borderRadius: "13px",
            background: "#FFFFFF 0% 0% no-repeat padding-box"
        },
        "& .Mui-disabled .MuiStepLabel-iconContainer .MuiStepIcon-root .MuiStepIcon-text": {
            fill:'black',
            fontWeight: "400"
        }
    }
}));
function V5GlobalStepper(props) {
    const {
        steps,
        activeStep,
        //alternativeLabel,
        pageMode
    } = props;
    const classes = useStyles();
    return (
        <Stepper
            activeStep={activeStep}
            alternativeLabel
            className={`bg-inherit ${classes.root} ${pageMode === "add" || pageMode === "view"|| pageMode === "edit" ? classes.stepIconStyle : ""}`}>
            {steps.map((label, i) => (
                // (pageMode === "view" || pageMode === "edit") && i !== activeStep ?
                //     (
                //         <Step key={label} completed={true}>
                //             <StepLabel>{label}</StepLabel>
                //         </Step>
                //     )
                //     :
                    (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    )
            ))}
        </Stepper>
    );
}

V5GlobalStepper.propTypes = {
    steps: PropTypes.array.isRequired,
    activeStep: PropTypes.number.isRequired,
    alternativeLabel: PropTypes.bool
}

V5GlobalStepper.defaultProps = {
    alternativeLabel: false
};

export default V5GlobalStepper;