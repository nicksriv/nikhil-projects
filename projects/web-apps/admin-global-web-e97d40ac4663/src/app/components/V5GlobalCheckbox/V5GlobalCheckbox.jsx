import React from 'react';
import {
    Checkbox, FormControlLabel, Box
} from '@material-ui/core';
//import { makeStyles } from '@material-ui/core/styles';
//import clsx from 'clsx';
import PropTypes from "prop-types";
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

function V5GlobalCheckbox(props) {
    const {
        boxClass,
        checkedIconClass,
        unCheckedIconClass,
        formControlLabelClass,
        key,
        name,
        label,
        state,
        handleChange,
        isBoxComponentMargin
    } = props;

    function handleBoxClick(e, state, name) {
        e.preventDefault();
        const obj = {
            target: {
                name: name,
                checked: !state
            }
        }
        handleChange(obj);
    }
    return (
        <>
            {
                isBoxComponentMargin ?
                    (
                        <Box key={key} component="span" m={2}
                            className={`${boxClass} cursor-pointer`}
                            onClick={(e) => handleBoxClick(e, state, name)
                            }
                        >
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        key={key}
                                        name={name}
                                        //style={{ pointerEvents: "auto" }}
                                        checkedIcon={<CheckCircleIcon
                                            className={checkedIconClass}
                                        />}
                                        icon={<RadioButtonUncheckedIcon
                                            className={unCheckedIconClass}
                                        />}
                                        inputProps={{ 'aria-label': 'decorative checkbox' }}
                                        //onChange={handleChange}
                                        checked={state}
                                    />
                                }
                                className={formControlLabelClass}
                                label={label}
                                key={key}
                            />
                        </Box >
                    )
                    :
                    (
                        <Box key={key}
                            className={`${boxClass} cursor-pointer`}
                            onClick={(e) => handleBoxClick(e, state, name)}
                        >
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        key={key}
                                        name={name}
                                        //style={{ pointerEvents: "auto" }}
                                        checkedIcon={<CheckCircleIcon
                                            className={checkedIconClass}
                                        />}
                                        icon={<RadioButtonUncheckedIcon
                                            className={unCheckedIconClass}
                                        />}
                                        inputProps={{ 'aria-label': 'decorative checkbox' }}
                                        //onChange={handleChange}
                                        checked={state}
                                    />
                                }
                                className={formControlLabelClass}
                                label={label}
                                key={key}
                            />
                        </Box>
                    )
            }
        </>
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