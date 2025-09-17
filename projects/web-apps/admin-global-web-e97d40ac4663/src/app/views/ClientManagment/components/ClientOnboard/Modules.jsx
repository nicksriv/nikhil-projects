import React, { useEffect } from 'react'
import {
    Grid, CircularProgress
} from '@material-ui/core'
//import PropTypes from "prop-types";
import {
    V5GlobalFormFooter,
    V5GlobalCheckboxView,
} from '../../../../components'
import EmptyModulesView from './EmptyModulesView';
import history from 'helper/history.js';
import { useSelector } from 'react-redux';

// function RenderColumn(props) {
//     const { module, classes, pageMode, handleModules } = props

//     return (
//         <>
//             {pageMode === 'view' ? (
//                 <V5GlobalCheckboxView
//                     boxClass={
//                         module && module.checked
//                             ? classes.moduleBoxStyleCheck
//                             : classes.moduleBoxStyleUncheck
//                     }
//                     checkedIconClass={classes.styleCheckedIconStyle}
//                     unCheckedIconClass={classes.styleCheckIconStyle}
//                     formControlLabelClass={
//                         module && module.checked
//                             ? classes.moduleLabelCheckStyle
//                             : classes.moduleLabelUncheckStyle
//                     }
//                     key={module.id}
//                     name={module.id}
//                     label={module.name}
//                     state={module.checked}
//                     handleChange={handleModules}
//                     isBoxComponent={false}
//                     isBoxMargin={false}
//                     isBoxComponentMargin={false}
//                 />
//             ) : (
//                 <V5GlobalCheckbox
//                     boxClass={
//                         module && module.checked
//                             ? classes.moduleBoxStyleCheck
//                             : classes.moduleBoxStyleUncheck
//                     }
//                     checkedIconClass={classes.styleCheckedIconStyle}
//                     unCheckedIconClass={classes.styleCheckIconStyle}
//                     formControlLabelClass={
//                         module && module.checked
//                             ? classes.moduleLabelCheckStyle
//                             : classes.moduleLabelUncheckStyle
//                     }
//                     key={module.id}
//                     name={module.id}
//                     label={module.name}
//                     state={module.checked}
//                     handleChange={handleModules}
//                     isBoxComponentMargin={false}
//                 />
//             )}
//         </>
//     )
// }

function RenderColumn(props) {
    const { module, classes, handleModules } = props

    return (
            <V5GlobalCheckboxView
                boxClass={classes.moduleBoxStyleCheck}
                checkedIconClass={classes.styleCheckedIconStyle}
                unCheckedIconClass={classes.styleCheckIconStyle}
                formControlLabelClass={classes.moduleLabelCheckStyle}
                key={module.id}
                name={module.id}
                label={module.name}
                state={module.checked}
                handleChange={handleModules}
                isBoxComponent={false}
                isBoxMargin={false}
                isBoxComponentMargin={false}
            />
    )
}

function Modules(props) {
    const {
        modules,
        columns,
        // data,
        backArrowDisabled,
        nextArrowDisabled,
        cancelBtnDisabled,
        // saveAndContinueBtnDisabled,
        handleNextArrow,
        handleBackArrow,
        handleSaveAndContinue,
        classes,
        handleEmail,
        pageMode,
        showPassword,
        handleClickShowPassword,
        handleMouseDownPassword,
        //styleObj,
        setShowPassword,
        // clientCredentialDetails,
        // showSubmitPopUp,
        // clientGeneratedId,
        // clientPassword,
        // tableData,
        // ClientCredentialDetails,
        handleModules,
        // setShowPassword,
        handleCanceBtn,
        
        clientId,
        
        //shareMail,
        // clientUserName,
    } = props;
    const { apiLoading } = useSelector((state) => state.screenBuilder);

    const shareMail = (data) => { }

    // const classes = useStyles();
    const arr = modules.reduce(
        (acc, item) => {
            let group = acc.pop()
            if (group && group.length === 3) {
                acc.push(group)
                group = []
            }
            group.push(item)
            acc.push(group)
            return acc
        },
        [[]]
    )

    const createRole = () => {
        history.push('/role-management');
    }

    const createModule = () => {
        history.push('/screen-builder');
    }

    return (
        apiLoading ? 
            <CircularProgress
                size={24}
                className={
                    classes.buttonProgress
                }
            />
            :
            <div>
                <form>
                    <div className={'w-full mt-5'}>
                        {arr.some(v=>v.length > 0) && clientId?
                        <> 
                            <Grid
                                container
                                direction="row"
                                spacing="3"
                                className="pb-4 w-full"
                            >
                                <Grid item>
                                    <h5> Modules</h5>
                                </Grid>
                            </Grid>
                            {arr.map((group, i) => {
                                return (
                                    <Grid
                                        key={i}
                                        container
                                        direction="row"
                                        spacing="3"
                                        className="pb-4 w-full"
                                        // style={{ minHeight: '250px'}}
                                    >
                                        {group.map((m) => (
                                            <Grid item xs={12} sm={12} md={6} lg={4}>
                                                <RenderColumn
                                                    key={m.id}
                                                    module={m}
                                                    columns={columns}
                                                    pageMode={pageMode}
                                                    classes={classes}
                                                    handleModules={handleModules}
                                                />
                                            </Grid>
                                        ))}
                                    </Grid>
                                )
                            })
                        }
                        </>
                        :
                        <EmptyModulesView 
                            clientId={clientId}
                            pageMode={pageMode}
                            shareMail={shareMail}
                            value={"1234@wavelabs"}
                            showPassword={showPassword}
                            createRole={createRole}
                            createModule={createModule}
                            setShowPassword={setShowPassword}
                            handleClickShowPassword={handleClickShowPassword}
                            handleMouseDownPassword={handleMouseDownPassword} 
                            shareMail={handleEmail}
                            />
                        }
                        <div className="pt-12">
                            <V5GlobalFormFooter
                                isSubmit={false}
                                btnLabel={'Next'}
                                pageMode={pageMode}
                                backArrowDisabled={backArrowDisabled}
                                nextArrowDisabled={nextArrowDisabled}
                                cancelBtnDisabled={cancelBtnDisabled}
                                // saveAndContinueBtnDisabled={
                                //     saveAndContinueBtnDisabled
                                // }
                                saveAndContinueBtnDisabled={false}
                                handleNextArrow={handleNextArrow}
                                handleBackArrow={handleBackArrow}
                                handleSaveAndContinue={(e) =>
                                    handleSaveAndContinue(e, 'MODULES')
                                }
                                handleCanceBtn={handleCanceBtn}
                            />
                        </div>
                    </div>
                </form>
            </div>

    )
}

Modules.propTypes = {}

Modules.defaultProps = {}

export default Modules
