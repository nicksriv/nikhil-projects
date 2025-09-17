import React, { useEffect, useRef, useState } from 'react'
import {
    Button,
    ClickAwayListener,
    Grid,
    TextField,
    Tooltip,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import ActionsPopup from 'app/components/ActionPopup/ActionsPopup'
import history from 'helper/history.js'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { SNACKBAR_ERROR, SNACKBAR_SUCCESS } from 'app/redux/slices/snackbar'
import BackgroundCard from '../JobManagement/components/BackgroundCard'
import Loading from 'app/components/V5GlobalLoading/V5GlobalLoading'
import DisputeDetailCard from './components/DisputeDetailCard'
import {
    inreviewDisputeService,
    closedDisputeService,
    closedDisputeRemarkService,
} from 'app/redux/DisputeManagement/DisputeManagementService'
import ActionsModal from 'app/components/ActionModal/ActionsModal'
import globalConstants from 'helper/constants.js'
import { V5GlobalHeaderActionList } from 'app/components'

const disputeDetailsField = [
    {
        label: 'Dispute Refernce Number:',
        render: (disputeDetails) => disputeDetails?.disputeRefNo || 'NA',
    },
    {
        label: 'Dispute Title:',
        render: (disputeDetails) => disputeDetails?.disputeTitle || 'NA',
    },
    {
        label: 'Client Name:',
        render: (disputeDetails) => disputeDetails?.clientName || 'NA',
    },
    {
        label: 'Mobile:',
        render: (disputeDetails) => disputeDetails?.mobile || 'NA',
    },
    {
        label: 'Email:',
        render: (disputeDetails) => disputeDetails?.email || 'NA',
    },
    {
        label: 'Raised By:',
        render: (disputeDetails) => disputeDetails?.raisedBy || 'NA',
    },
    {
        label: 'Raised At:',
        render: (disputeDetails) => disputeDetails?.raisedAt || 'NA',
    },
    {
        label: 'Dispute Status:',
        render: (disputeDetails) => {
            return (
                globalConstants.disputeStatus[disputeDetails?.disputeStatus] ||
                'NA'
            )
        },
    },
    {
        label: 'Dispute Description:',
        render: (disputeDetails) => disputeDetails?.disputeDescription || 'NA',
    },

    {
        label: 'Closed Remark:',
        render: (disputeDetails) => disputeDetails?.closedRemark || 'NA',
    },
]

const RenderButton = ({ onClick }) => {
    return (
        <div id="transition-modal-description" className="flex justify-end">
            <Button
                variant="outlined"
                className="mx-1"
                size="small"
                onClick={onClick}
            >
                Confirm
            </Button>
        </div>
    )
}
function DisputeDetails() {
    const useStyles = makeStyles(() => ({
        bodyColor: {
            backgroundColor: 'green',
            paddingTop: '1rem',
        },
        tablePopupContainer: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            cursor: 'pointer',
        },
        popOverMenu: {
            boxShadow: '-1px 10px 20px lightgrey',
            width: '200px',
            padding: 4,
            zIndex: '10000',
            display: 'flex',
            flexDirection: 'column',
            '&::-webkit-scrollbar': {
                width: '0.4em',
            },
        },
        modalInputStyle: {
            width: '100%',
            marginBottom: 18,
        },
    }))
    const classes = useStyles()
    let { id } = useParams()
    const dispatch = useDispatch()
    const anchorRef = useRef(null)
    const [disputeDetailsData, setdisputeDetailsData] = useState({})
    const [isActionPopupOpen, setActionPopupOpen] = useState(false)
    const [isInreviewModalOpen, setIsInreviewModalOpen] = useState(false)
    const [isCloseModalOpen, setIsCloseModalOpen] = useState(false)
    const [closeStatusRemark, setCloseStatusRemark] = useState('')
    const { disputeDetails = {}, loading } = useSelector(
        (state) => state.disputeManagement
    )
    useEffect(() => {
        dispatch({
            type: 'getDisputeDetailsAction',
            payload: id,
        })
    }, [])
    useEffect(() => {
        setdisputeDetailsData(disputeDetails)
    }, [disputeDetails])
    const handleBack = (e) => {
        history.goBack()
    }
    const handleActionPopup = () => {
        setActionPopupOpen(!isActionPopupOpen)
    }
    const handleOnChange = (value, name, key = '') => {
        if (name === 'closeWork') {
            setCloseStatusRemark(value)
        }
    }
    const handleCloseDispute = async () => {
        if (closeStatusRemark) {
            try {
                const payload = {
                    id,
                }
                const response = await closedDisputeService(payload)
                if (response) {
                    try {
                        const payloadData = {
                            id,
                            remark: {
                                closedRemark: closeStatusRemark,
                            },
                        }

                        const response = await closedDisputeRemarkService(
                            payloadData
                        )
                        if (!response.error) {
                            dispatch(SNACKBAR_SUCCESS(response.message))
                            setIsCloseModalOpen(!isCloseModalOpen)
                            dispatch({
                                type: 'getDisputeDetailsAction',
                                payload: id,
                            })
                        }
                    } catch (error) {
                        dispatch(SNACKBAR_ERROR(error.message))
                        setIsCloseModalOpen(!isCloseModalOpen)
                    }
                }
                if (!response.error) {
                    dispatch(SNACKBAR_SUCCESS(response.message))
                }
            } catch (error) {
                dispatch(SNACKBAR_ERROR(error.message))
                setIsCloseModalOpen(!isCloseModalOpen)
            }
        } else {
            dispatch(SNACKBAR_ERROR('Close Remark Should Be Given'))
        }
    }

    const handleActionModalClose = (key) => {
        if (key === 'inreview') {
            setIsInreviewModalOpen(false)
        }
        if (key === 'closed') {
            setIsCloseModalOpen(false)
        }
    }

    const handleInReviewDispute = async () => {
        try {
            const res = await inreviewDisputeService({ id })
            dispatch(SNACKBAR_SUCCESS(res.message))
            if (res.message) {
                setIsInreviewModalOpen(false)
                dispatch({ type: 'getDisputeDetailsAction', payload: id })
            }
        } catch (error) {
            dispatch(SNACKBAR_ERROR(error.message))
            setIsInreviewModalOpen(false)
        }
    }

    let disputeDetailLength = Object.keys(disputeDetails).length
    if (loading) {
        return <Loading />
    }
    if (!disputeDetailLength) {
        return <Loading />
    }
    return (
        <>
            <V5GlobalHeaderActionList
                backIcon
                title={'Dispute Details'}
                iconsList={[
                    disputeDetails.disputeStatus === 'CLOSED' ? {} : 
                    {
                        iconType: 'more_vert',
                        tooltipTitle: 'More',
                        areaLabel: 'more verical',
                        iconComponent: 'span',
                        iconClickHandler: handleActionPopup,
                    },
                ]}
            />
               
                <Grid item className="flex items-center">
                    <div>
                        <ActionsPopup
                            width={200}
                            open={isActionPopupOpen}
                            onClose={() => handleActionPopup()}
                            anchorEl={anchorRef.current}
                        >
                            <ClickAwayListener
                                onClickAway={() => handleActionPopup()}
                            >
                                <div className={`${classes.popOverMenu}`}>
                                    <div
                                        className={classes.tablePopupContainer}
                                    >
                                        {disputeDetails.disputeStatus ===
                                        'NEW' ? (
                                            <Button
                                                style={{
                                                    justifyContent: 'left',
                                                }}
                                                className="w-full  mt-1 color-gray border-gray"
                                                onClick={() => {
                                                    setIsInreviewModalOpen(true)
                                                }}
                                            >
                                                INREVIEW
                                            </Button>
                                        ) : disputeDetails.disputeStatus ===
                                          'INREVIEW' ? (
                                            <Button
                                                style={{
                                                    justifyContent: 'left',
                                                }}
                                                className="w-full  mt-1 color-gray border-gray"
                                                onClick={() => {
                                                    setIsCloseModalOpen(true)
                                                }}
                                            >
                                                CLOSE
                                            </Button>
                                        ) : null}
                                    </div>
                                </div>
                            </ClickAwayListener>
                        </ActionsPopup>
                    </div>
                    <ActionsModal
                        customModal
                        actionModalOpen={isCloseModalOpen}
                        description={'Close Remark'}
                        buttonTitle1={'Yes'}
                        buttonTitle2={'No'}
                        handleActionModalClose={() =>
                            handleActionModalClose('closed')
                        }
                        handleButtonAction1={handleCloseDispute}
                        handleButtonAction2={() =>
                            handleActionModalClose('closed')
                        }
                    >
                        <div>
                            <TextField
                                multiline
                                label="Close remark"
                                rows={3}
                                maxRows={4}
                                value={closeStatusRemark}
                                placeholder="Type here"
                                variant="outlined"
                                style={{ width: '100%' }}
                                className={classes.modalInputStyle}
                                onChange={(e) =>
                                    handleOnChange(
                                        setCloseStatusRemark(
                                            e.target.value,
                                            'closeWork'
                                        )
                                    )
                                }
                            />
                        </div>
                        <RenderButton onClick={handleCloseDispute} />
                    </ActionsModal>
                    <ActionsModal
                        actionModalOpen={isInreviewModalOpen}
                        description={
                            'Are you sure you want to In Review this Dispute'
                        }
                        buttonTitle1={'Yes'}
                        buttonTitle2={'No'}
                        handleActionModalClose={() =>
                            handleActionModalClose('inreview')
                        }
                        handleButtonAction1={handleInReviewDispute}
                        handleButtonAction2={() =>
                            handleActionModalClose('inreview')
                        }
                    />
                </Grid>

            <BackgroundCard title={'Dispute Details'}>
                <Grid
                    container
                    spacing={1}
                    style={{
                        display: 'flex',
                    }}
                >
                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={9}
                        lg={10}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <DisputeDetailCard
                            data={disputeDetailsField}
                            cardDetails={disputeDetailsData}
                        />
                    </Grid>
                </Grid>
            </BackgroundCard>
        </>
    )
}

export default DisputeDetails
