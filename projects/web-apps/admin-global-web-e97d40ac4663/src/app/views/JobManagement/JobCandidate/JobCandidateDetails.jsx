import React, { useEffect, useRef, useState } from 'react'
import _get from 'lodash.get'
import {
    Button,
    ClickAwayListener,
    Grid,
    MenuItem,
    TextField,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'


import history from 'helper/history.js'

import ActionsPopup from 'app/components/ActionPopup/ActionsPopup'
import { useLocation, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import {
    updateCandidateNotesService,
    approveCandidateWorkService,
    rejectCandidateWorkService,
    updateCanidatePaymentStatusService,
    updatePayerRemarkService,
    updateCompleteJobService,
    getJobCandidateDetailService,
} from 'app/redux/JobManagement/JobManagementService'
import { SNACKBAR_ERROR, SNACKBAR_SUCCESS } from 'app/redux/slices/snackbar'

import BackgroundCard from '../components/BackgroundCard'

import DetailsCard from '../../../components/DetailsCard/DetailsCard'
import Loading from 'app/components/V5GlobalLoading/V5GlobalLoading'
import ModuleCard from 'app/components/ModuleCards/ModuleCard'
import ProfileHeader from 'app/components/ProfileHeader/ProfileHeader'

import ActionsModal from 'app/components/ActionModal/ActionsModal'
import globalConstants from 'helper/constants.js'
import { V5GlobalHeaderActionList } from 'app/components'
import { setCandidateDetails, setLoader } from 'app/redux/JobManagement/JobManagementSlice'
import { jobManagementParsers } from 'app/redux/JobManagement/JobManagementParser'

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

const JobCandidateDetails = () => {
    const workDetailField = [
        {
            label: 'Amount Paid:',
            render: (candidateDetails) =>
                `${candidateDetails?.amountPaid} USD` || 'NA',
        },
        {
            label: 'Total Earned:',
            render: (candidateDetails) =>
                `${candidateDetails?.totalEarned} USD` || 'NA',
        },
        {
            label: 'Payment Status:',
            render: (candidateDetails) => {
                return (
                    globalConstants.amountStatus[candidateDetails.amountStatus] ||
                    'NA'
                )
            },
        },
        {
            label: 'Payer Remark:',
            render: (candidateDetails) =>
                `${candidateDetails?.payerRemark}` || 'NA',
        },
        {
            label: 'Approve Remark:',
            render: (candidateDetails) =>
                `${candidateDetails?.jobApproverRemark}` || 'NA',
        },
        {
            label: 'Job Rating:',
            render: (candidateDetails) =>
                `${candidateDetails?.jobRating}` || 'NA',
        },
        {
            label: 'Job Rating Description:',
            render: (candidateDetails) =>
                `${candidateDetails?.jobRatingDescription}` || 'NA',
        },
        {
            label: 'Job Status:',
            render: (candidateDetails) => {
                return (
                    globalConstants.jobStatus[candidateDetails?.jobStatus] ||
                    'NA'
                )
            },
        },
        {
            label: 'Job Status Remark:',
            render: (candidateDetails) =>
                `${candidateDetails?.jobStatusRemark}` || 'NA',
        },
        {
            label: 'Job User Remark:',
            render: (candidateDetails) =>
                `${candidateDetails?.jobUserRemark}` || 'NA',
        },
    ]
    const qaWorkDetailField = [
        {
            label: 'Approve Remark:',
            render: (candidateDetails) =>
                `${candidateDetails?.jobApproverRemark}` || 'NA',
        },
        {
            label: 'Job Rating:',
            render: (candidateDetails) =>
                `${candidateDetails?.jobRating}` || 'NA',
        },
        {
            label: 'Job Rating Description:',
            render: (candidateDetails) =>
                `${candidateDetails?.jobRatingDescription}` || 'NA',
        },
        {
            label: 'Job Status:',
            render: (candidateDetails) => {
                return (
                    globalConstants.jobStatus[candidateDetails?.jobStatus] ||
                    'NA'
                )
            },
        },
        {
            label: 'Job Status Remark:',
            render: (candidateDetails) =>
                `${candidateDetails?.jobStatusRemark}` || 'NA',
        },
        {
            label: 'Job User Remark:',
            render: (candidateDetails) =>
                `${candidateDetails?.jobUserRemark}` || 'NA',
        },
    ]
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
    let { id, jobId } = useParams()
    const location = useLocation()
    const { state: userType } = location
    const dispatch = useDispatch()
    const anchorRef = useRef(null)
    const {
        candidateDetails,
        loading,
        freelancerDetails,
        vendorDetails,
        jobModules,
    } = useSelector((state) => state.jobManagement)
    const { clientId } = useSelector((state) => state.screenBuilder)
    const typeOfUser = localStorage.getItem("typeOfUser")
    const qaUser = typeOfUser === 'QUALITY_ASSURANCE'
    const {
        jobStatus,
        amountStatus,
        payerRemark,
        totalHoursWorked,
        userId,
        // modules,
    } = candidateDetails

    const jobCandidateActions = qaUser ? [
        {
            label: 'Update Note',
            onClick: () => handleModalToggle('note'),
            disabled: false,
        },
        {
            label: 'Approve Work',
            onClick: () => handleModalToggle('approveWork'),
            disabled: jobStatus === 'INREVIEW' ? false : true,
        },
        {
            label: 'Reject Work',
            onClick: () => handleModalToggle('rejectWork'),
            disabled: jobStatus === 'INREVIEW' ? false : true,
        }

    ] : [
        {
            label: 'Update Note',
            onClick: () => handleModalToggle('note'),
            disabled: false,
        },
        {
            label: 'Approve Work',
            onClick: () => handleModalToggle('approveWork'),
            disabled: jobStatus === 'INREVIEW' ? false : true,
        },
        {
            label: 'Reject Work',
            onClick: () => handleModalToggle('rejectWork'),
            disabled: jobStatus === 'INREVIEW' ? false : true,
        },
        {
            label: 'Update Payment',
            onClick: () => handleModalToggle('updatePaymentStatus'),
            disabled:
                jobStatus === 'CLOSED' && amountStatus === 'PENDING'
                    ? false
                    : true,
        },
        {
            label: 'Payment Remark',
            onClick: () => handleModalToggle('updatePaymentRemark'),
            disabled: payerRemark?.length ? false : true,
        },

    ];
    const [isActionPopupOpen, setActionPopupOpen] = useState(false)
    const [isNoteModalOpen, setIsNoteModalOpen] = useState(false)
    const [isApproveWorkModalOpen, setIsApproveWorkModalOpen] = useState(false)
    const [isRejectWorkModalOpen, setIsRejectWorkModalOpen] = useState(false)
    const [isPaymentStatusModalOpen, setIsPaymentStatusModalOpen] =
        useState(false)
    const [isPaymentRemarkModalOpen, setIsPaymentRemarkModalOpen] =
        useState(false)
    const [notes, setNotes] = useState('')
    const [approveWork, setApproveWork] = useState({
        jobApproverRemark: '',
        totalHoursWorked: '',
        jobRating: '',
        jobRatingDescription: '',
    })
    const [jobStatusRemark, setJobStatusRemark] = useState('')
    const [paymentStatus, setPaymentStatus] = useState({
        totalEarned: '',
        amountPaid: '',
        payerRemark: '',
    })
    const [payerRemarkState, setPayerRemarkState] = useState('')
     const getCandidateDetails = async () => {
         try {
             dispatch(setLoader(1))

             const payload = {
                 id,
                 jobId,
             }

             const res = await getJobCandidateDetailService(payload)

             const parsedData =
                 jobManagementParsers.jobCandidateDetailParser(res)

             dispatch(setCandidateDetails(parsedData))
             if (userType === 'Freelancer') {
                 dispatch({
                     type: 'getFreelancerDetailAction',
                     payload: { userId: res?.userId },
                 })
             }
             if (userType === 'Vendor') {
                 dispatch({
                     type: 'getVendorDetailAction',
                     payload: { userId: res?.userId },
                 })
             }

             dispatch(setLoader(0))
         } catch (error) {
             console.log('error', error)
             dispatch(setLoader(0))

         }
     }


    useEffect(() => {
        getCandidateDetails()
    }, [userType, dispatch, userId])

    useEffect(() => {

        if (clientId || candidateDetails.clientId) {
            dispatch({
                type: 'getJobModulesAction',
                payload: {
                    clientId: clientId ? clientId : candidateDetails?.clientId,
                    pageNumber: 0,
                    size: 10,
                    filter: {},
                    sortOrder: 'DESC',
                    sortBy: '',
                },
            })
        }
    }, [clientId, candidateDetails?.clientId])


    useEffect(() => {
        const {
            payerRemark,
            totalEarned,
            amountPaid,
            jobApproverRemark,
            jobRating,
            jobRatingDescription,
        } = candidateDetails
        setPayerRemarkState(payerRemark)
        setApproveWork({
            jobApproverRemark,
            totalHoursWorked,
            jobRating,
            jobRatingDescription,
        })
        setPaymentStatus({
            totalEarned,
            amountPaid,
            payerRemark,
        })
    }, [candidateDetails])

    const assignedModuleList = jobModules.filter((d) => {
        if (candidateDetails.modules !== null) {
            return _get(candidateDetails, 'modules', []).includes(d.id)
        }
    })

    const freelancerDetailsField = [
        {
            label: 'Freelancer  Name:',
            render: (freelancerDetails) =>
                `${freelancerDetails?.basicDetails?.firstName}` || 'NA',
        },
        {
            label: 'Last Name:',
            render: (freelancerDetails) =>
                `${freelancerDetails?.basicDetails?.lastName}` || 'NA',
        },
        {
            label: 'Email Id:',
            render: (freelancerDetails) =>
                `${freelancerDetails?.basicDetails?.email}` || 'NA',
        },
        {
            label: 'Mobile No:',
            render: (freelancerDetails) =>
                `${freelancerDetails?.basicDetails?.mobile}` || 'NA',
        },
        {
            label: 'User Type:',
            render: (freelancerDetails) =>
                `${freelancerDetails?.basicDetails?.mobile}` || 'NA',
        },
    ]
    const vendorDetailsField = [
        {
            label: 'Vendor Name:',
            render: (vendorDetails) => `${vendorDetails?.vendorName}` || 'NA',
        },
        {
            label: 'Vendor RefNo:',
            render: (vendorDetails) => `${vendorDetails?.vendorRefNo}` || 'NA',
        },
        {
            label: 'Location:',
            render: (vendorDetails) =>
                `${vendorDetails?.address?.location}` || 'NA',
        },
        {
            label: 'City:',
            render: (vendorDetails) =>
                `${vendorDetails?.address?.city}` || 'NA',
        },
        {
            label: 'State:',
            render: (vendorDetails) =>
                `${vendorDetails?.address?.state}` || 'NA',
        },
        {
            label: 'Country:',
            render: (vendorDetails) =>
                `${vendorDetails?.address?.country}` || 'NA',
        },
        {
            label: 'Pincode:',
            render: (vendorDetails) =>
                `${vendorDetails?.address?.pinCode}` || 'NA',
        },
    ]

    const handleActionPopup = () => {
        setActionPopupOpen(!isActionPopupOpen)
    }
    const handleModalToggle = (key) => {
        if (key === 'note') {
            setIsNoteModalOpen(!isNoteModalOpen)
        }
        if (key === 'approveWork') {
            setIsApproveWorkModalOpen(!isApproveWorkModalOpen)
        }
        if (key === 'rejectWork') {
            setIsRejectWorkModalOpen(!isRejectWorkModalOpen)
        }
        if (key === 'updatePaymentStatus') {
            setIsPaymentStatusModalOpen(!isPaymentStatusModalOpen)
        }
        if (key === 'updatePaymentRemark') {
            setIsPaymentRemarkModalOpen(!isPaymentRemarkModalOpen)
        }

    }

    const handleOnChange = (value, name, key = '') => {
        if (name === 'note') {
            setNotes(value)
        }
        if (name === 'approveWork') {
            setApproveWork((prev) => ({
                ...prev,
                [key]: value,
            }))
        }
        if (name === 'rejectWork') {
            setJobStatusRemark(value)
        }
        if (name === 'paymentStatus') {
            setPaymentStatus((prev) => ({
                ...prev,
                [key]: value,
            }))
        }
        if (name === 'updatePayerRemark') {
            setPayerRemarkState(value)
        }
    }
    const onContinueNotes = async () => {
        try {
            const payload = {
                jobId,
                id,
                notes: {
                    notes,
                },
            }
            const response = await updateCandidateNotesService(payload)
            if (!response.error) {
                dispatch(SNACKBAR_SUCCESS(response.message))
                setIsNoteModalOpen(!isNoteModalOpen)
            }
        } catch (error) {
            dispatch(SNACKBAR_ERROR(error.message))
            setIsNoteModalOpen(!isNoteModalOpen)
        }
    }
    const onApproveWork = async () => {
        try {
            const response = await approveCandidateWorkService({
                jobId,
                totalHoursWorked,
                id,
                approveWork,
            })
            if (!response.error) {
                dispatch(SNACKBAR_SUCCESS(response.message))
                setIsApproveWorkModalOpen(!isApproveWorkModalOpen)
                dispatch({
                    type: 'getJobCandidateDetailAction',
                    payload: { id, jobId },
                })
            }
        } catch (error) {
            dispatch(SNACKBAR_ERROR(error.message))
            setIsApproveWorkModalOpen(!isApproveWorkModalOpen)
        }
    }
    const onRejectWork = async () => {
        try {
            const response = await rejectCandidateWorkService({
                jobId,
                id,
                jobStatusRemark,
            })
            if (!response.error) {
                dispatch(SNACKBAR_SUCCESS(response.message))
                setIsRejectWorkModalOpen(!isRejectWorkModalOpen)
                dispatch({
                    type: 'getJobCandidateDetailAction',
                    payload: { id, jobId },
                })
            }
        } catch (error) {
            dispatch(SNACKBAR_ERROR(error.message))
            setIsRejectWorkModalOpen(!isRejectWorkModalOpen)
        }
    }
    const onUpdatePayment = async () => {
        try {
            const response = await updateCanidatePaymentStatusService({
                jobId,
                id,
                paymentStatus,
            })
            if (!response.error) {
                dispatch(SNACKBAR_SUCCESS(response.message))
                setIsPaymentStatusModalOpen(!isPaymentStatusModalOpen)
                dispatch({
                    type: 'getJobCandidateDetailAction',
                    payload: { id, jobId },
                })
            }
        } catch (error) {
            dispatch(SNACKBAR_ERROR(error.message))
            setIsPaymentStatusModalOpen(!isPaymentStatusModalOpen)
        }
    }
    const onUpdatePaymentRemark = async () => {
        try {
            const response = await updatePayerRemarkService({
                jobId,
                id,
                payerRemark: payerRemarkState,
            })
            if (!response.error) {
                dispatch(SNACKBAR_SUCCESS(response.message))
                setIsPaymentRemarkModalOpen(!isPaymentRemarkModalOpen)
                dispatch({
                    type: 'getJobCandidateDetailAction',
                    payload: { id, jobId },
                })
            }
        } catch (error) {
            dispatch(SNACKBAR_ERROR(error.message))
            setIsPaymentRemarkModalOpen(!isPaymentRemarkModalOpen)
        }
    }

    const handleModulePress = (moduleData) => {
        const { id: mid, subModules, name } = moduleData
        const pathname = `/job/${jobId}/candidateDetails/${id}/module/${mid}/subModules`
        history.push({
            pathname: pathname,
            state: {
                name,
                subModules,
            },
        })
    }
    const handleUserRedirection = () => {
        if (userType === 'Vendor') {
            history.push({
                pathname: `/vendor/vendorDetails/${userId}`,
            })
        } else {
            history.push({
                pathname: `/freelancer/freelancerDetails/${userId}`,
            })
        }
    }
    let candidateDetailLength = Object.keys(candidateDetails).length
    if (loading) {
        return <Loading />
    }
    if (!candidateDetailLength) {
        return <Loading />
    }
    return (
        <>
            <V5GlobalHeaderActionList
                backIcon
                title={'Candidate Details'}
                iconsList={[
                    {
                        iconType: 'more_vert',
                        tooltipTitle: 'More',
                        areaLabel: 'more verical',
                        iconComponent: 'span',
                        iconClickHandler: handleActionPopup,
                    },
                ]}
            />
            <Grid
                container
                spacing={2}
                alignItems="center"
                justifyContent="space-between"
                className="flex items-center pt-2"
            >
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
                                <div className={classes.tablePopupContainer}>
                                    {jobCandidateActions.map((ja, i) => {
                                        return (
                                            <Button
                                                disabled={ja.disabled}
                                                onClick={() => ja.onClick()}
                                                style={{
                                                    justifyContent: 'left',
                                                }}
                                                className="w-full  mt-1 color-gray border-gray"
                                            >
                                                {ja.label}
                                            </Button>
                                        )
                                    })}
                                </div>
                            </div>
                        </ClickAwayListener>
                    </ActionsPopup>
                </div>
                {/* Modals start here */}
                <ActionsModal
                    customModal
                    actionModalOpen={isNoteModalOpen}
                    description={'Enter Note'}
                    handleActionModalClose={() => handleModalToggle('note')}
                >
                    <div>
                        <TextField
                            multiline
                            rows={3}
                            maxRows={4}
                            label="Candidate Note"
                            placeholder="Type here"
                            variant="outlined"
                            className={classes.modalInputStyle}
                            value={notes}
                            onChange={(e) =>
                                handleOnChange(e.target.value, 'note')
                            }
                        />
                    </div>
                    <RenderButton onClick={onContinueNotes} />
                </ActionsModal>
                <ActionsModal
                    customModal
                    actionModalOpen={isApproveWorkModalOpen}
                    description={'Are you sure you want to approve this work?'}
                    handleActionModalClose={() =>
                        handleModalToggle('approveWork')
                    }
                >
                    <div>
                        <TextField
                            multiline
                            rows={3}
                            maxRows={4}
                            label="Approve Remark"
                            value={approveWork.jobApproverRemark}
                            placeholder="Type here"
                            variant="outlined"
                            className={classes.modalInputStyle}
                            onChange={(e) =>
                                handleOnChange(
                                    e.target.value,
                                    'approveWork',
                                    'jobApproverRemark'
                                )
                            }
                        />
                        <TextField
                            label="Total Hours Worked"
                            type="number"
                            value={approveWork.totalHoursWorked}
                            placeholder="Type here"
                            variant="outlined"
                            className={classes.modalInputStyle}
                            onChange={(e) =>
                                handleOnChange(
                                    e.target.value,
                                    'approveWork',
                                    'totalHoursWorked'
                                )
                            }
                        />
                        <TextField
                            label="Job Rating"
                            value={approveWork?.jobRating}
                            placeholder="Enter Rating Between 1-5"
                            variant="outlined"
                            select
                            className={classes.modalInputStyle}
                            onChange={(e) =>
                                handleOnChange(
                                    e.target.value,
                                    'approveWork',
                                    'jobRating'
                                )
                            }
                        >
                            <MenuItem value="0">0</MenuItem>
                            <MenuItem value="1">1</MenuItem>
                            <MenuItem value="2">2</MenuItem>
                            <MenuItem value="3">3</MenuItem>
                            <MenuItem value="4">4</MenuItem>
                            <MenuItem value="5">5</MenuItem>
                        </TextField>
                        <TextField
                            multiline
                            rows={3}
                            maxRows={4}
                            label="Rating Description"
                            value={approveWork.jobRatingDescription}
                            placeholder="Type here"
                            variant="outlined"
                            className={classes.modalInputStyle}
                            onChange={(e) =>
                                handleOnChange(
                                    e.target.value,
                                    'approveWork',
                                    'jobRatingDescription'
                                )
                            }
                        />
                    </div>
                    <RenderButton onClick={onApproveWork} />
                </ActionsModal>
                <ActionsModal
                    customModal
                    actionModalOpen={isRejectWorkModalOpen}
                    description={'Are you sure you want to reject this work?'}
                    handleActionModalClose={() =>
                        handleModalToggle('rejectWork')
                    }
                >
                    <div>
                        <TextField
                            multiline
                            label="Reject remark"
                            rows={3}
                            maxRows={4}
                            value={jobStatusRemark}
                            placeholder="Type here"
                            variant="outlined"
                            style={{ width: '100%' }}
                            className={classes.modalInputStyle}
                            onChange={(e) =>
                                setJobStatusRemark(e.target.value, 'rejectWork')
                            }
                        />
                    </div>
                    <div
                        id="transition-modal-description"
                        className="flex justify-end"
                    >
                        <Button
                            variant="outlined"
                            className="mx-1"
                            size="small"
                            onClick={() => onRejectWork()}
                        >
                            Confirm
                        </Button>
                    </div>
                </ActionsModal>
                <ActionsModal
                    customModal
                    actionModalOpen={isPaymentStatusModalOpen}
                    description={'Update payment status '}
                    handleActionModalClose={() =>
                        handleModalToggle('updatePaymentStatus')
                    }
                >
                    <div>
                        <TextField
                            value={paymentStatus.totalEarned}
                            type="number"
                            label="Total Earned"
                            placeholder="Type here"
                            variant="outlined"
                            className={classes.modalInputStyle}
                            onChange={(e) =>
                                handleOnChange(
                                    e.target.value,
                                    'paymentStatus',
                                    'totalEarned'
                                )
                            }
                        />
                        <TextField
                            label="Total Amound Paid"
                            value={paymentStatus.amountPaid}
                            placeholder="Type here"
                            variant="outlined"
                            type="number"
                            className={classes.modalInputStyle}
                            onChange={(e) =>
                                handleOnChange(
                                    e.target.value,
                                    'paymentStatus',
                                    'amountPaid'
                                )
                            }
                        />
                        <TextField
                            multiline
                            rows={3}
                            maxRows={4}
                            label="Payer Remark"
                            placeholder="Type here"
                            value={paymentStatus.payerRemark}
                            variant="outlined"
                            className={classes.modalInputStyle}
                            onChange={(e) =>
                                handleOnChange(
                                    e.target.value,
                                    'paymentStatus',
                                    'payerRemark'
                                )
                            }
                        />
                    </div>
                    <RenderButton onClick={onUpdatePayment} />
                </ActionsModal>
                <ActionsModal
                    customModal
                    actionModalOpen={isPaymentRemarkModalOpen}
                    description={'Do You want to update payment remark?'}
                    handleActionModalClose={() =>
                        handleModalToggle('updatePaymentRemark')
                    }
                >
                    <div>
                        <TextField
                            value={payerRemarkState}
                            placeholder="Type here"
                            variant="outlined"
                            multiline
                            rows={3}
                            maxRows={4}
                            className={classes.modalInputStyle}
                            onChange={(e) =>
                                handleOnChange(
                                    e.target.value,
                                    'updatePayerRemark'
                                )
                            }
                        />
                    </div>
                    <RenderButton onClick={onUpdatePaymentRemark} />
                </ActionsModal>

                {/* Modals end here */}
            </Grid>
            <BackgroundCard title={'Profile Details'}>
                <ProfileHeader
                    typeOfUser={typeOfUser}
                    basicDetailField={
                        userType === 'Vendor'
                            ? vendorDetailsField
                            : freelancerDetailsField
                    }
                    cardDetails={
                        userType === 'Vendor'
                            ? vendorDetails
                            : freelancerDetails
                    }
                    buttonText="View Profile"
                    handleButton={handleUserRedirection}
                    showImage
                />
            </BackgroundCard>
            <BackgroundCard title={'Work Details'}>
                <DetailsCard
                    data={qaUser ? qaWorkDetailField : workDetailField}
                    cardDetails={candidateDetails}
                />
            </BackgroundCard>
            <BackgroundCard title={'Job Modules'}>
                <Grid container xs={12} sm={12} md={2} lg={12} direction="row">
                    {assignedModuleList.length ? (
                        assignedModuleList.map((moduleData, i) => {
                            return (
                                <Grid item>
                                    <ModuleCard
                                        moduleData={moduleData}
                                        handleOnModulePress={() =>
                                            handleModulePress(moduleData)
                                        }
                                    />
                                </Grid>
                            )
                        })
                    ) : (
                        <div>No Modules Available!</div>
                    )}
                </Grid>
            </BackgroundCard>
        </>
    )
}

export default JobCandidateDetails
