import React from 'react';
import {
     Box, Grid
} from '@material-ui/core';
//import { makeStyles } from '@material-ui/core/styles';
//import clsx from 'clsx';
import PropTypes from "prop-types";
// import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
// import CheckCircleIcon from '@material-ui/icons/CheckCircle';

function V5GlobalCheckbox(props) {
    const {
        boxClass,
        // checkedIconClass,
        // unCheckedIconClass,
        // state,
        // name,
        // isBoxComponentMargin,
          // handleChange,
        formControlLabelClass,
        key,
        label,

    } = props;

    return (
        // <>
        //     {
        //         isBoxComponentMargin ?
        //             (
        //                 <Box key={key} component="span" m={2}
        //                     className={boxClass} >
        //                     <FormControlLabel
        //                         control={
        //                             <Checkbox
        //                                 key={key}
        //                                 name={name}
        //                                 color="primary"
        //                                 checkedIcon={<CheckCircleIcon
        //                                     className={checkedIconClass}
        //                                 />}
        //                                 icon={<RadioButtonUncheckedIcon
        //                                     className={unCheckedIconClass}
        //                                 />}
        //                                 inputProps={{ 'aria-label': 'decorative checkbox' }}
        //                                 checked={state}
        //                                 disabled={!state}
        //                                 className={state === false ? "invisible-on-pc" : ""}
        //                             />
        //                         }
        //                         className={`${formControlLabelClass} in-active`}
        //                         label={label}
        //                         key={key}
        //                     />
        //                 </Box>
        //             )
        //             :
        //             (
        //                 <Box key={key}
        //                     className={boxClass}>
        //                     <FormControlLabel
        //                         control={
        //                             <Checkbox
        //                                 key={key}
        //                                 name={name}
        //                                 color="primary"
        //                                 checkedIcon={<CheckCircleIcon
        //                                     className={checkedIconClass}
        //                                 />}
        //                                 icon={<RadioButtonUncheckedIcon
        //                                     className={unCheckedIconClass}
        //                                 />}
        //                                 inputProps={{ 'aria-label': 'decorative checkbox' }}
        //                                 checked={state}
        //                                 disabled={!state}
        //                                 className={state === false ? "invisible-on-pc" : ""}
        //                             />
        //                         }
        //                         className={`${formControlLabelClass} in-active`}
        //                         label={label}
        //                         key={key}
        //                     />
        //                 </Box>
        //             )
        //     }
        // </>

        <Box key={key}
            className={boxClass}>
            <Grid
                className={`${formControlLabelClass} in-active`}
                key={key}
            >
                <p>{label}</p>
            </Grid>
        </Box>
    );
}

V5GlobalCheckbox.propTypes = {
    label: PropTypes.string.isRequired,
    classes: PropTypes.object.isRequired
}

V5GlobalCheckbox.defaultProps = {
    isBoxComponentMargin: true
};

export default V5GlobalCheckbox;