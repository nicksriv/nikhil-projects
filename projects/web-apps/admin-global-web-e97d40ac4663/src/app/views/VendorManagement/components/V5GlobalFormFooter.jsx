import React from 'react'
import {
    Grid,
    //TextField,
    Button,
    // FormControlLabel,
    // Switch,
    // InputLabel,
    // IconButton,
    // ButtonGroup,
    Box,
} from '@material-ui/core'
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft'
import ArrowRightIcon from '@material-ui/icons/ArrowRight'
import PropTypes from 'prop-types'
import {
    makeStyles,
    // ThemeProvider, createTheme
} from '@material-ui/core/styles'

function V5GlobalFormFooter(props) {
    const {
        isSubmit,
        pageMode,
        backArrowDisabled,
        nextArrowDisabled,
        cancelBtnDisabled,
        saveAndContinueBtnDisabled,
        //  setSubmitBtnDisable,
        handleNextArrow,
        handleBackArrow,
        handleSaveAndContinue,
        handleCanceBtn,
        handleSubmit,
        btnLabel,
        customFooter,
        footerActions,
    } = props

    const useStyles = makeStyles((theme, custom) => ({
        activeBtn: {
            color: '#2C3E93',
        },
    }))

    const classes = useStyles()
    return (
        <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
        >
            <Grid item>
                <Button
                    variant="outlined"
                    disabled={backArrowDisabled}
                    size="small"
                    onClick={handleBackArrow}
                    style={{
                        maxWidth: '24px',
                        maxHeight: '24px',
                        minWidth: '24px',
                        minHeight: '24px',
                    }}
                >
                    <ArrowLeftIcon
                        className={!backArrowDisabled ? classes.activeBtn : ''}
                    />
                </Button>
                <Box component="span" m={1}>
                    <Button
                        variant="outlined"
                        disabled={nextArrowDisabled}
                        size="small"
                        onClick={handleNextArrow}
                        style={{
                            maxWidth: '24px',
                            maxHeight: '24px',
                            minWidth: '24px',
                            minHeight: '24px',
                        }}
                    >
                        <ArrowRightIcon
                            className={
                                !nextArrowDisabled ? classes.activeBtn : ''
                            }
                        />
                    </Button>
                </Box>
            </Grid>
            {customFooter ? (
                <>
                    <Grid
                        item
                        justifyContent="flex-end"
                        className="flex"
                        lg={6}
                        xs={12}
                        sm={6}
                    >
                        {footerActions
                            ? footerActions.map((action) => {
                                  return (
                                      <Button
                                          variant={action.variant}
                                          //   style={action.style}
                                          style={
                                              action.disabled === true
                                                  ? {
                                                        pointerEvents: 'none',
                                                    }
                                                  : action.style
                                          }
                                          onClick={action.onClick}
                                          disabled={action.disabled}
                                      >
                                          {action.label}
                                      </Button>
                                  )
                              })
                            : null}
                    </Grid>
                </>
            ) : (
                <>
                    {pageMode !== 'view' && (
                        <Grid
                            item
                            justifyContent="space-between"
                            className="flex"
                            alignItems="center"
                        >
                            {cancelBtnDisabled ? (
                                <Button
                                    variant="outlined"
                                    className="color-primary"
                                    style={{
                                        maxWidth: '91px',
                                        maxHeight: '35px',
                                        minWidth: '91px',
                                        minHeight: '35px',
                                        border: '1px solid #2C3E93',
                                    }}
                                    onClick={() => handleCanceBtn(1)}
                                >
                                    CANCEL
                                </Button>
                            ) : (
                                <Button
                                    variant="outlined"
                                    className="color-primary"
                                    style={{
                                        maxWidth: '91px',
                                        maxHeight: '35px',
                                        minWidth: '91px',
                                        minHeight: '35px',

                                        border: '1px solid #2C3E93',
                                    }}
                                    onClick={() => handleCanceBtn(2)}
                                >
                                    CANCEL
                                </Button>
                            )}

                            <Box component="span" m={1}>
                                {saveAndContinueBtnDisabled ? (
                                    <Button
                                        variant="contained"
                                        disabled
                                        //style={{ maxWidth: '91px', maxHeight: '35px', minWidth: '91px', minHeight: '35px' }}
                                    >
                                        {btnLabel
                                            ? 'Next'
                                            : isSubmit
                                            ? 'SUBMIT'
                                            : 'SAVE & CONTINUE'}
                                    </Button>
                                ) : (
                                    <Button
                                        variant="contained"
                                        className="bg-primary text-black font-medium"
                                        //style={{ maxWidth: '91px', maxHeight: '35px', minWidth: '91px', minHeight: '35px' }}
                                        onClick={
                                            isSubmit
                                                ? handleSubmit
                                                : handleSaveAndContinue
                                        }
                                    >
                                        {btnLabel
                                            ? 'Next'
                                            : isSubmit
                                            ? 'SUBMIT'
                                            : 'SAVE & CONTINUE'}
                                    </Button>
                                )}
                            </Box>
                        </Grid>
                    )}
                </>
            )}
        </Grid>
    )
}

V5GlobalFormFooter.propTypes = {
    backArrowDisabled: PropTypes.bool,
    nextArrowDisabled: PropTypes.bool,
    cancelBtnDisabled: PropTypes.bool,
    saveAndContinueBtnDisabled: PropTypes.bool,
    handleNextArrow: PropTypes.func,
    handleBackArrow: PropTypes.func,
}

V5GlobalFormFooter.defaultProps = {}

export default V5GlobalFormFooter
