import React from 'react';
// import {
//     Grid, Box, Paper
// } from '@material-ui/core';
// import PropTypes from "prop-types";
import { V5GlobalFormFooter } from '../../../../components';
import CheckboxGlobal from './CheckBox';

function AccessPrivilege(props) {
    const {
        backArrowDisabled,
        nextArrowDisabled,
        cancelBtnDisabled,
        submitBtnDisabled,
        // setSubmitBtnDisable,
        // classes,
        handleNextArrow,
        handleBackArrow,
        handleSaveAndContinue,
        modules,
        pageMode,
        handleAccessPrivilegeChange,
        handleSubmit,
        // setCancelBtnDisabled,
        handleCanceBtn
    } = props;
    const data =[
        {
            title:"EDIT THEME CONFIGURATION",
            key:"editTheme",
            description:"This will affects the background colors and fonts for modules created through Screen builder for the end uses."
        },
        {
            title:"EDIT WORKFLOW CONFIGURATION",
            key:"editWorkFlow",
            description:"This will allow client to update workflow for the all modules created through screen builder."
        }
    ]

    return (
        <div className="mt-7">
            <form>
                {/* {
                    modules && modules.map((module, i) => (
                        module.checked &&
                        <Paper className={`${classes.paper} mb-4`}>
                                <Grid container direction="row" spacing="3" className='items-center'>
                                <Box component="span" m={2} className="flex-size">
                                    <h4 className="ml-5">{module.name}</h4>
                                </Box>
                                {
                                    pageMode === "view" ?
                                        (
                                            <>
                                                <V5GlobalCheckboxView
                                                    boxClass={module && module.view ? classes.accessPrivilegeBoxStyleCheck_View : classes.accessPrivilegeBoxStyleUnCheck_View}
                                                    checkedIconClass={classes.styleCheckedIconStyle}
                                                    unCheckedIconClass={classes.styleCheckIconStyle}
                                                    formControlLabelClass={module && module.view ? classes.moduleLabelCheckStyle : classes.moduleLabelUncheckStyle}
                                                    key={module.id}
                                                    name={module.id}
                                                    label={'View'}
                                                    state={module.view}
                                                    handleChange={(e) => handleAccessPrivilegeChange(e, 'view')}

                                                />
                                                <V5GlobalCheckboxView
                                                    boxClass={module && module.editTheme ? classes.accessPrivilegeBoxStyleCheck_Theme : classes.accessPrivilegeBoxStyleUncheck_Theme}
                                                    checkedIconClass={classes.styleCheckedIconStyle}
                                                    unCheckedIconClass={classes.styleCheckIconStyle}
                                                    formControlLabelClass={module && module.editTheme ? classes.moduleLabelCheckStyle : classes.moduleLabelUncheckStyle}
                                                    key={module.id}
                                                    name={module.id}
                                                    label={'Edit Theme Configuration'}
                                                    state={module.editTheme}
                                                    handleChange={(e) => handleAccessPrivilegeChange(e, 'editTheme')}
                                                />
                                                <V5GlobalCheckboxView
                                                    boxClass={module && module.editWorkFlow ? classes.accessPrivilegeBoxStyleCheck_Workflow : classes.accessPrivilegeBoxStyleUncheck_Workflow}
                                                    checkedIconClass={classes.styleCheckedIconStyle}
                                                    unCheckedIconClass={classes.styleCheckIconStyle}
                                                    formControlLabelClass={module && module.editWorkFlow ? classes.moduleLabelCheckStyle : classes.moduleLabelUncheckStyle}
                                                    key={module.id}
                                                    name={module.id}
                                                    label={'Edit Workflow Configuration'}
                                                    state={module.editWorkFlow}
                                                    handleChange={(e) => handleAccessPrivilegeChange(e, 'editWorkFlow')}
                                                />
                                            </>
                                        )
                                        :
                                        (
                                            <>
                                                <V5GlobalCheckbox
                                                    boxClass={module && module.view ? classes.accessPrivilegeBoxStyleCheck_View : classes.accessPrivilegeBoxStyleUnCheck_View}
                                                    checkedIconClass={classes.styleCheckedIconStyle}
                                                    unCheckedIconClass={classes.styleCheckIconStyle}
                                                    formControlLabelClass={module && module.view ? classes.moduleLabelCheckStyle : classes.moduleLabelUncheckStyle}
                                                    key={module.id}
                                                    name={module.id}
                                                    label={'View'}
                                                    state={module.view}
                                                    handleChange={(e) => handleAccessPrivilegeChange(e, 'view')}

                                                />
                                                <V5GlobalCheckbox
                                                    boxClass={module && module.editTheme ? classes.accessPrivilegeBoxStyleCheck_Theme : classes.accessPrivilegeBoxStyleUncheck_Theme}
                                                    checkedIconClass={classes.styleCheckedIconStyle}
                                                    unCheckedIconClass={classes.styleCheckIconStyle}
                                                    formControlLabelClass={module && module.editTheme ? classes.moduleLabelCheckStyle : classes.moduleLabelUncheckStyle}
                                                    key={module.id}
                                                    name={module.id}
                                                    label={'Edit Theme Configuration'}
                                                    state={module.editTheme}
                                                    handleChange={(e) => handleAccessPrivilegeChange(e, 'editTheme')}
                                                />
                                                <V5GlobalCheckbox
                                                    boxClass={module && module.editWorkFlow ? classes.accessPrivilegeBoxStyleCheck_Workflow : classes.accessPrivilegeBoxStyleUncheck_Workflow}
                                                    checkedIconClass={classes.styleCheckedIconStyle}
                                                    unCheckedIconClass={classes.styleCheckIconStyle}
                                                    formControlLabelClass={module && module.editWorkFlow ? classes.moduleLabelCheckStyle : classes.moduleLabelUncheckStyle}
                                                    key={module.id}
                                                    name={module.id}
                                                    label={'Edit Workflow Configuration'}
                                                    state={module.editWorkFlow}
                                                    handleChange={(e) => handleAccessPrivilegeChange(e, 'editWorkFlow')}
                                                />
                                            </>
                                        )
                                }
                            </Grid>
                        </Paper>
                    ))
                } */}
                {
                    data && data.map((item)=>
                        <CheckboxGlobal
                            pageMode={pageMode}
                            modules={modules}
                            key={item.key}
                            name={item.key}
                            title={item.title}
                            description={item.description}
                            handleCheck={handleAccessPrivilegeChange}
                        />
                    )
                }
                
                <div className='pt-12'>
                    <V5GlobalFormFooter
                        isSubmit={true}
                        pageMode={pageMode}
                        backArrowDisabled={backArrowDisabled}
                        nextArrowDisabled={nextArrowDisabled}
                        cancelBtnDisabled={cancelBtnDisabled}
                        saveAndContinueBtnDisabled={submitBtnDisabled}
                        saveAndContinueBtnDisabled={false}
                        handleNextArrow={handleNextArrow}
                        handleBackArrow={handleBackArrow}
                        handleSaveAndContinue={handleSaveAndContinue}
                        handleSubmit={handleSubmit}
                        handleCanceBtn={handleCanceBtn}
                    />
                </div>
            </form>
        </div>
    );
}

AccessPrivilege.propTypes = {

}

AccessPrivilege.defaultProps = {

};

export default AccessPrivilege;