import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import CloseIcon from '@material-ui/icons/Close'
import { Button } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: 12,
        width: '40%',
    },
    closeIcon: {
        display: 'flex',
        flexDirection: 'row-reverse',
        padding: '4px',
        justifyContent: 'space-between',
    },
    buttonWrap: {
        display: 'flex',
        justifyContent: 'end',
    },
}))

const ActionsModal = ({
    actionModalOpen,
    description,
    buttonTitle1,
    buttonTitle2,
    handleActionModalClose,
    handleButtonAction1,
    handleButtonAction2,
    customModal,
    children,
}) => {
    const classes = useStyles()
    if (customModal) {
        return (
            <div>
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={classes.modal}
                    open={actionModalOpen}
                    onClose={() => handleActionModalClose()}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={actionModalOpen}>
                        <div className={classes.paper}>
                            <div className={classes.closeIcon}>
                                <CloseIcon
                                    onClick={() => handleActionModalClose()}
                                    className="cursor-pointer text-light-gray "
                                />
                                <div>
                                    <h5
                                        id="transition-modal-title"
                                        style={{
                                            lineHeight: '1.55rem',
                                            marginBottom: 16,
                                        }}
                                    >
                                        {description}
                                    </h5>
                                </div>
                            </div>

                            {children}
                        </div>
                    </Fade>
                </Modal>
            </div>
        )
    }
    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={actionModalOpen}
                onClose={() => handleActionModalClose()}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={actionModalOpen}>
                    <div className={classes.paper}>
                        <div className={classes.closeIcon}>
                            <CloseIcon
                                onClick={() => handleActionModalClose()}
                                className="cursor-pointer text-light-gray "
                            />
                            <div>
                                <h5
                                    id="transition-modal-title"
                                    style={{ lineHeight: '1.55rem' }}
                                >
                                    {description}
                                </h5>
                            </div>
                        </div>

                        <div
                            id="transition-modal-description"
                            className={classes.buttonWrap}
                        >
                            <Button
                                variant="outlined"
                                className="mx-1"
                                size="small"
                                onClick={() => handleButtonAction1()}
                            >
                                {buttonTitle1}
                            </Button>
                            <Button
                                variant="outlined"
                                className="mx-1"
                                size="small"
                                onClick={() => handleButtonAction2()}
                            >
                                {buttonTitle2}
                            </Button>
                        </div>
                    </div>
                </Fade>
            </Modal>
        </div>
    )
}

export default ActionsModal
