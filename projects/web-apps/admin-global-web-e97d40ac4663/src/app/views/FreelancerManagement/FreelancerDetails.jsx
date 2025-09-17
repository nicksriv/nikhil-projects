import React, { useEffect, useRef, useState } from 'react'
import {
    Button,
    ClickAwayListener,
    Grid,
    Box,
    Typography,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import ActionsPopup from 'app/components/ActionPopup/ActionsPopup'
import WorkDetailTimeLine from '../JobManagement/components/WorkDetailTimeLine'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import ActionsModal from 'app/components/ActionModal/ActionsModal'
import { SNACKBAR_ERROR, SNACKBAR_SUCCESS } from 'app/redux/slices/snackbar'
import BackgroundCard from '../JobManagement/components/BackgroundCard'
import { deactivateFreelancerService, activateFreelancerService } from "../../redux/FreelancerManagement/FreelancerManagementService"
import StarBorderIcon from '@material-ui/icons/StarBorder';
import Loading from 'app/components/V5GlobalLoading/V5GlobalLoading'
import RenderSkills from '../JobManagement/components/RenderSkills'
import { config } from 'helper/config.js'
import DetailsCard from 'app/components/DetailsCard/DetailsCard'
import StatsCard from 'app/components/StatsCard/StatsCard'
import { V5GlobalHeaderActionList } from 'app/components'

const profileDetailsField = [
    {
        label: 'First Name:',
        render: (freelancerDetails) => freelancerDetails?.firstName || 'NA',

    },
    {
        label: 'Last Name:',
        render: (freelancerDetails) => freelancerDetails?.lastName || 'NA',

    },
    {
        label: 'Email:',
        render: (freelancerDetails) => freelancerDetails?.email || 'NA',

    },
    {
        label: 'Mobile:',
        render: (freelancerDetails) => freelancerDetails?.mobile || 'NA',

    },
    {
        label: 'City:',
        render: (freelancerDetails) => freelancerDetails?.address.city || 'NA',
    },
    {
        label: 'State:',
        render: (freelancerDetails) => freelancerDetails?.address.state || 'NA',
    },
    {
        label: 'Location:',
        render: (freelancerDetails) => freelancerDetails?.address.location || 'NA',
    },
    {
        label: 'Country:',
        render: (freelancerDetails) => freelancerDetails?.address.country || 'NA',
    },
    {
        label: 'PinCode:',
        render: (freelancerDetails) => freelancerDetails?.address.pinCode || 'NA',
    },
    {
        label: 'Status:',
        render: (freelancerDetails) => freelancerDetails?.status || 'NA',
    }
]

const bankDetailsField = [
    {
        label: 'Account Holder Name:',
        render: (freelancerDetails) => freelancerDetails?.accountHolderName || 'NA',

    },
    {
        label: 'Account Number:',
        render: (freelancerDetails) => freelancerDetails?.accountNumber || 'NA',

    },
    {
        label: 'Bank Name:',
        render: (freelancerDetails) => freelancerDetails?.bankName || 'NA',

    },
    {
        label: 'Branch:',
        render: (freelancerDetails) => freelancerDetails?.branch || 'NA',

    },
    {
        label: 'IFSC Code:',
        render: (freelancerDetails) => freelancerDetails?.ifscCode || 'NA',

    },
]

const kycDetailsField = [
    {
        label: 'Aadhar No:',
        render: (freelancerDetails) => freelancerDetails?.adhaarNumber || 'NA',

    },
    {
        label: 'Pan No:',
        render: (freelancerDetails) => freelancerDetails?.panNumber || 'NA',
    }
]
const statsDetailField = [
    {
        label: 'Total Jobs',
        render: (freelancerStatsJobs) => freelancerStatsJobs?.totalJobs,
        icon: 'work',
    },
    {
        label: 'Completed Jobs',
        render: (freelancerStatsJobs) => freelancerStatsJobs?.totalCompletedJobs,
        icon: 'work_history',
    },
    {
        label: 'Ongoing Jobs',
        render: (freelancerStatsJobs) => freelancerStatsJobs?.totalInprogressJobs,
        icon: 'work',
    },

    {
        label: 'Cancelled Jobs',
        render: (freelancerStatsJobs) => freelancerStatsJobs?.totalCancelJobs,
        icon: 'work_off',
    },
    {
        label: 'Total Earned',
        render: (freelancerStatsJobs) => freelancerStatsJobs?.totalMoneyEarned,
        icon: 'monetization_on',
    },
    {
        label: 'Payment Received',
        render: (freelancerStatsJobs) => freelancerStatsJobs?.amountPaid,
        icon: 'monetization_on',
    },
    {
        label: 'Payment Pending',
        render: (freelancerStatsJobs) => freelancerStatsJobs?.totalDisputes,
        icon: 'monetization_on',
    },
    {
        label: 'Disputes',
        render: (freelancerStatsJobs) => freelancerStatsJobs?.totalDisputes,
        icon: 'record_voice_over',
    },
]

function FreelancerDetails() {
    let imageUrl = ''
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
    const [freelancerDetailsData, setfreelancerDetailsData] = useState({})
    const { freelancerDetails = {}, loading, freelancerStatsJobs = {} } = useSelector((state) => state.freelancerManagement)
    const { skillCategory, workDetails, profileImage, portfolioUrl,freelancerRating } = freelancerDetails;
    const [isActionPopupOpen, setActionPopupOpen] = useState(false)
    const [isDeactivateModalOpen, setIsDeactivatehModalOpen] = useState(false)
    const [isActivateModalOpen, setIsActivatehModalOpen] = useState(false)
    useEffect(() => {
        dispatch({
            type: 'getFreelancerDetailsAction',
            payload: id,
        })
    }, [id])


    useEffect(() => {
        dispatch({
            type: 'getFreelancerStatsJobsAction',
            payload: id,
        })
    }, [])

    useEffect(() => {
        setfreelancerDetailsData(freelancerDetails)
    }, [freelancerDetails])
    
    const handleActionPopup = () => {
        setActionPopupOpen(!isActionPopupOpen)
    }

    const handleActionModalClose = (key) => {
        if (key === 'deactivate') {
            setIsDeactivatehModalOpen(false)
        }
        if (key === 'activate') {
            setIsActivatehModalOpen(false)
        }

    }

    const handleDeactivateFreelancer = async () => {
        try {
            const res = await deactivateFreelancerService({ id })
            dispatch(SNACKBAR_SUCCESS(res.message))
            if (res.message) {
                setIsDeactivatehModalOpen(false)
                dispatch({ type: 'getFreelancerDetailsAction', payload: id })
            }
        } catch (error) {
            dispatch(SNACKBAR_ERROR(error.message))
            setIsDeactivatehModalOpen(false)
        }
    }

    const handleActivateFreelancer = async () => {
        try {
            const res = await activateFreelancerService({ id })
            dispatch(SNACKBAR_SUCCESS(res.message))
            if (res.message) {
                setIsActivatehModalOpen(false)
                dispatch({ type: 'getFreelancerDetailsAction', payload: id })
            }
        } catch (error) {
            dispatch(SNACKBAR_ERROR(error.message))
            setIsActivatehModalOpen(false)
        }
    }
    if (profileImage) {
        imageUrl = config.imageBaseUrl + profileImage
    }
    let freelancerDetailLength = Object.keys(freelancerDetails).length
    if(loading){
        return <Loading/>
    }
    if (!freelancerDetailLength) {
        return <Loading />
    }

    return (
        <>
        <V5GlobalHeaderActionList
                backIcon
                title={'Freelancer Details'}
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
                                        {console.log(freelancerDetails,'-------------')}
                                        {freelancerDetails?.basicDetails?.status === 'ACTIVE' ? (
                                            <Button
                                                style={{
                                                    justifyContent: 'left',
                                                }}
                                                className="w-full  mt-1 color-gray border-gray"
                                                onClick={() => {
                                                    setIsDeactivatehModalOpen(
                                                        true
                                                    )
                                                }}
                                            >
                                                Deactivate Freelancer
                                            </Button>
                                        ) : (
                                            <Button
                                                style={{
                                                    justifyContent: 'left',
                                                }}
                                                className="w-full  mt-1 color-gray border-gray"
                                                onClick={() => {
                                                    setIsActivatehModalOpen(
                                                        true
                                                    )
                                                }}
                                            >
                                                Activate Freelancer
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </ClickAwayListener>
                        </ActionsPopup>
                    </div>
                    <ActionsModal
                        actionModalOpen={isDeactivateModalOpen}
                        description={
                            'Are you sure you want to deactivate this freelancer'
                        }
                        buttonTitle1={'Yes'}
                        buttonTitle2={'No'}
                        handleActionModalClose={() =>
                            handleActionModalClose('deactivate')
                        }
                        handleButtonAction1={handleDeactivateFreelancer}
                        handleButtonAction2={() =>
                            handleActionModalClose('deactivate')
                        }
                    />

                    <ActionsModal
                        actionModalOpen={isActivateModalOpen}
                        description={
                            'Are you sure you want to activate this freelancer'
                        }
                        buttonTitle1={'Yes'}
                        buttonTitle2={'No'}
                        handleActionModalClose={() =>
                            handleActionModalClose('activate')
                        }
                        handleButtonAction1={handleActivateFreelancer}
                        handleButtonAction2={() =>
                            handleActionModalClose('activate')
                        }
                    />

            <BackgroundCard title={'Profile Details'}>
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
                        <DetailsCard
                            data={profileDetailsField}
                            cardDetails={freelancerDetailsData.basicDetails}
                        />

                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={2}
                        lg={2}
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        {imageUrl ? (
                            <img
                                style={{
                                    objectFit: 'contain',
                                    maxWidth: '99px',
                                    height: '99px',
                                    border: `1px solid #dbd8d8`,
                                    padding: 2,
                                    borderRadius: '50%',
                                    marginBottom: 10,
                                }}
                                src={imageUrl}
                                alt={'Logo'}
                            />
                        ) : (
                            <AccountCircleIcon
                                style={{
                                    fontSize: '6.188rem',
                                    color: '#286090',
                                }}
                            />
                        )}
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <p>{freelancerRating}4</p>
                            <StarBorderIcon
                                style={{ fill: 'yellow', marginLeft: '0.3rem' }}
                            />
                        </Box>
                    </Grid>
                </Grid>
            </BackgroundCard>
            <BackgroundCard title={'KYC Details'}>
                <DetailsCard
                    data={kycDetailsField}
                    cardDetails={freelancerDetailsData.kycDetail}
                />
            </BackgroundCard>
            {/* <FreelancerStatsCard freelancerStatsJobs={freelancerStatsJobs} /> */}
            <StatsCard
                data={statsDetailField}
                cardDetails={freelancerStatsJobs}
            />
            <BackgroundCard title={'Bank Details'}>
                <DetailsCard
                    data={bankDetailsField}
                    cardDetails={freelancerDetailsData.bankDetail}
                />
            </BackgroundCard>
            <BackgroundCard title={'Skills'}>
                <RenderSkills skillCategories={skillCategory} />
            </BackgroundCard>

            <BackgroundCard
                title="Freelancer Work Details"
                link
                linkText="View Portfolio"
                linkUrl={portfolioUrl ? config.imageBaseUrl + portfolioUrl : ''}
            >
                { workDetails && workDetails.length ? (
                    <WorkDetailTimeLine data={workDetails} />
                ) : (
                    <Typography variant='p'>No Work Details Available</Typography>
                )}
            </BackgroundCard>
        </>
    )
}

export default FreelancerDetails