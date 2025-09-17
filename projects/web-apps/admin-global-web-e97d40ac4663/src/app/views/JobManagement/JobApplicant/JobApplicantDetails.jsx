import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    Grid,
    Button,
    Tooltip,
    TextField,
    Typography,
    Chip,
} from '@material-ui/core'

import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import CheckIcon from '@material-ui/icons/Check'
import CloseIcon from '@material-ui/icons/Close'
import { useLocation, useParams } from 'react-router-dom'

import history from 'helper/history.js'
import ActionsModal from '../../../components/ActionModal/ActionsModal'
import BackgroundCard from '../components/BackgroundCard'
import Loading from 'app/components/V5GlobalLoading/V5GlobalLoading'
import RecenWorkTable from '../components/RecenWorkTable'
import {
    appproveApplicantService,
    rejectApplicantService,
} from 'app/redux/JobManagement/JobManagementService'
import { SNACKBAR_ERROR, SNACKBAR_SUCCESS } from 'app/redux/slices/snackbar'
import RenderSkills from '../components/RenderSkills'
import { setInitialState } from 'app/redux/JobManagement/JobManagementSlice'
import WorkDetailTimeLine from '../components/WorkDetailTimeLine'
import { config } from 'helper/config.js'
import ProfileHeader from 'app/components/ProfileHeader/ProfileHeader'
import { V5GlobalHeaderActionList } from 'app/components'

const JobApplicantDetails = () => {
    let { id, jobId } = useParams()
    const location = useLocation()
    const { state: userType } = location
    const dispatch = useDispatch()
    const [isAcceptModalOpen, setIsAcceptModalOpen] = useState(false)
    const [isRejectModalOpen, setIsRejectModalOpen] = useState(false)
    const [applicantRejectRemark, setApplicantRejectRemark] = useState('')
    const typeOfUser = localStorage.getItem('typeOfUser')
    const {
        applicantDetails,
        applicantRecentWorkList,
        freelancerDetails,
        vendorDetails,
        loading,
    } = useSelector((state) => state.jobManagement)
    const { jobApplicationStatus, userId } = applicantDetails
    const {
        skillCategory,
        workDetails,
        profileImage = '',
        portfolioUrl,
    } = userType === 'Vendor' ? vendorDetails : freelancerDetails
    console.log(userType)

    useEffect(() => {
        dispatch({ type: 'getApplicantDetailsAction', payload: { id, jobId } })
    }, [])

    useEffect(() => {
        if (userId && userType === 'Freelancer') {
            dispatch({
                type: 'getFreelancerDetailAction',
                payload: { userId },
            })
        }
        if (userId && userType === 'Vendor') {
            dispatch({
                type: 'getVendorDetailAction',
                payload: { userId },
            })
        }
    }, [userType, dispatch, userId])

    useEffect(() => {
        dispatch({
            type: 'getApplicantRecentWorkAction',
            payload: {
                userId,
                userType:userType.toUpperCase(),
            },
        })
    }, [userType, dispatch, userId])

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

    const handleBack = (e) => {
        history.goBack()
        dispatch({ type: setInitialState })
    }
    const handleModalOpen = (key) => {
        if (key === 'accept') {
            setIsAcceptModalOpen(true)
        }
        if (key === 'reject') {
            setIsRejectModalOpen(true)
        }
    }
    const handleModalClose = (key) => {
        if (key === 'accept') {
            setIsAcceptModalOpen(false)
        }
        if (key === 'reject') {
            setIsRejectModalOpen(false)
        }
    }
    const handleApplicantRejectRemark = (value) => {
        setApplicantRejectRemark(value)
    }
    const onApplicantAccept = async () => {
        try {
            const response = await appproveApplicantService({
                jobId,
                id,
            })
            if (!response.error) {
                dispatch(SNACKBAR_SUCCESS(response.message))
                setIsAcceptModalOpen(false)
                dispatch({
                    type: 'getApplicantDetailsAction',
                    payload: { id, jobId },
                })
            }
        } catch (error) {
            dispatch(SNACKBAR_ERROR(error.message))
            setIsAcceptModalOpen(false)
        }
    }
    const onApplicantReject = async () => {
        try {
            const res = await rejectApplicantService({
                jobId,
                id,
                note: applicantRejectRemark,
            })
            if (!res.error) {
                dispatch(SNACKBAR_SUCCESS(res.message))
                setIsRejectModalOpen(false)
                dispatch({
                    type: 'getApplicantDetailsAction',
                    payload: { id, jobId },
                })
            }
        } catch (error) {
            dispatch(SNACKBAR_ERROR(error.message))
            setIsRejectModalOpen(false)
        }
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
    let applicantDetailsLength = Object.keys(applicantDetails).length    
    if (loading) {
        return <Loading />
    }
    if (!applicantDetailsLength) {
        return <Loading />
    }
    return (
        <>
            <Grid
                container
                spacing={2}
                alignItems="center"
                justifyContent="space-between"
                className="flex items-center pt-2 px-2"
            >
                <V5GlobalHeaderActionList
                backIcon
                title={'Applicant Details'}
            />  
                <Grid
                    item
                    xs
                    alignItems="center"
                    justifyContent="flex-end"
                    className="flex items-center"
                >
                    <Button
                        disa
                        variant="outlined"
                        color="primary"
                        endIcon={<CheckIcon />}
                        size="small"
                        onClick={() => handleModalOpen('accept')}
                        disabled={
                            ['APPROVED', 'REJECTED', 'CANCELLED'].includes(
                                jobApplicationStatus
                            )
                                ? true
                                : false
                        }
                    >
                        Approve
                    </Button>
                    <Button
                        variant="outlined"
                        color="secondary"
                        endIcon={<CloseIcon />}
                        size="small"
                        onClick={() => handleModalOpen('reject')}
                        className="ml-2"
                        disabled={
                            ['APPROVED', 'REJECTED', 'CANCELLED'].includes(
                                jobApplicationStatus
                            )
                                ? true
                                : false
                        }
                    >
                        Reject
                    </Button>
                </Grid>
                <ActionsModal
                    actionModalOpen={isAcceptModalOpen}
                    description={
                        'Are you sure you want to accept this applicant'
                    }
                    buttonTitle1={'Yes'}
                    buttonTitle2={'No'}
                    handleActionModalClose={() => handleModalClose('accept')}
                    handleButtonAction1={() => onApplicantAccept()}
                    handleButtonAction2={() => handleModalClose('accept')}
                />
                <ActionsModal
                    customModal
                    actionModalOpen={isRejectModalOpen}
                    description={'Enter User Remark'}
                    handleActionModalClose={() => handleModalClose('reject')}
                >
                    <div className="mb-4">
                        <TextField
                            placeholder="Type here"
                            variant="outlined"
                            style={{ width: '100%' }}
                            onChange={(e) =>
                                handleApplicantRejectRemark(e.target.value)
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
                            onClick={() => onApplicantReject()}
                        >
                            Confirm
                        </Button>
                    </div>
                </ActionsModal>
            </Grid>
            <BackgroundCard title="Profile Details">
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
            <BackgroundCard
                title={userType === 'Vendor' ? 'Technologies' : 'Skills'}
            >
                <RenderSkills skillCategories={skillCategory} />
            </BackgroundCard>
            {userType === 'Vendor' ? (
                <>
                    <BackgroundCard
                        title="Vendor Work Details"
                        linkText="View Portfolio"
                        linkUrl={`${config.imageBaseUrl}${portfolioUrl}`}
                    >
                        <Typography variant="p">{workDetails}</Typography>
                    </BackgroundCard>
                </>
            ) : (
                <BackgroundCard
                    title="Freelancer Work Details"
                    linkText="View Resume"
                    linkUrl={
                        portfolioUrl ? config.imageBaseUrl + portfolioUrl : ''
                    }
                >
                    <WorkDetailTimeLine data={workDetails} />
                </BackgroundCard>
            )}

            <BackgroundCard title={'Recent Work'}>
                <RecenWorkTable rowData={applicantRecentWorkList} />
            </BackgroundCard>
        </>
    )
}

export default JobApplicantDetails
