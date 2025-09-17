import React, { useState, useEffect, useRef } from 'react'
import _get from 'lodash.get'
import { useDispatch, useSelector } from 'react-redux'
import {
    Grid,
    Chip,
    Button,
    ClickAwayListener,
    Dialog,
} from '@material-ui/core'
import Tooltip from '@material-ui/core/Tooltip'
import EditIcon from '@material-ui/icons/Edit'
import ToggleOffIcon from '@material-ui/icons/ToggleOff'
import ToggleOnIcon from '@material-ui/icons/ToggleOn'
import CloseIcon from '@material-ui/icons/Close'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import { useParams } from 'react-router-dom'
import RichTextEditor from 'react-rte'

import { makeStyles } from '@material-ui/core/styles'

import history from 'helper/history.js'

import BackgroundCard from './components/BackgroundCard'
import DetailsCard from '../../components/DetailsCard/DetailsCard'
import ActionsPopup from '../../components/ActionPopup/ActionsPopup'
import ActionsModal from '../../components/ActionModal/ActionsModal'
import MultiSelectSearch from 'app/components/Multiselect/MultiSelectSearch'
import Loading from 'app/components/V5GlobalLoading/V5GlobalLoading'
import {
    unPublishJobService,
    mapJobModulesService,
    publishJobService,
    updateCompleteJobService
} from 'app/redux/JobManagement/JobManagementService'

import { SNACKBAR_ERROR, SNACKBAR_SUCCESS } from 'app/redux/slices/snackbar'
import RenderSkills from './components/RenderSkills'
import globalConstants from 'helper/constants.js'
import { V5GlobalHeaderActionList } from 'app/components'


const basicDetailsField = [
    {
        label: 'Job Title:',
        render: (jobDetails) => jobDetails.jobTitle,
    },
    {
        label: 'Job Short Description:',
        render: (jobDetails) => jobDetails.jobShortDescription,
    },
    {
        label: 'Job Status:',
        render: (jobDetails) => {
            return globalConstants.publishStatus[jobDetails.publishStatus] || 'NA'
        },
    },
]
const otherDetailsField = [
    {
        label: 'Job Type:',
        render: (jobDetails) => {
            return globalConstants.jobType[jobDetails.jobType] || 'NA'
        },
    },
    {
        label: 'Project Type:',
        render: (jobDetails) => {
            return globalConstants.projectType[jobDetails.projectType] || 'NA'
        },
    },
    {
        label: 'Experience:',
        render: (jobDetails) => {
            return (
                globalConstants.experienceLevel[jobDetails.experienceLevel] ||
                'NA'
            )
        },
    },
    {
        label: 'Visibility Type:',
        render: (jobDetails) => {
            return (
                globalConstants.visibilityType[jobDetails?.jobVisibility?.visibilityType] ||
                'NA'
            )
        },
    },
    {
        label: 'Visibility Value:',
        render: (jobDetails) =>
            jobDetails?.jobVisibility?.visibilityValue.join() || 'NA',
    },
    {
        label: 'Visibility To:',
        render: (jobDetails) =>
            jobDetails?.jobVisibility?.visibleToVendor || 'NA',
    },
    {
        label: 'City:',
        render: (jobDetails) => jobDetails?.address?.city || 'NA',
    },
    {
        label: 'Country:',
        render: (jobDetails) => jobDetails?.address?.country || 'NA',
    },
    {
        label: 'State:',
        render: (jobDetails) => jobDetails?.address?.state || 'NA',
    },
    {
        label: 'Location:',
        render: (jobDetails) => jobDetails?.address?.location || 'NA',
    },
    {
        label: 'Pincode:',
        render: (jobDetails) => jobDetails?.address?.pinCode || 'NA',
    },
    {
        label: 'Gps:',
        render: (jobDetails) =>
            `${jobDetails?.locationGps?.lat}/${jobDetails?.locationGps?.lng} (lat/lng)` ||
            'NA',
    },
]

const billindTimingField = [
    {
        label: 'Rate:',
        render: (jobDetails) => `${jobDetails?.billing?.number} USD` || 'NA',
    },
    {
        label: 'Billing Type:',
        render: (jobDetails) => {
            return (
                globalConstants.type[jobDetails?.billing?.type] ||
                'NA'
            )
        },
    },
    {
        label: 'Total Hour Require:',
        render: (jobDetails) =>
            `${jobDetails?.jobTiming?.hourRequired} hrs` || 'NA',
    },
    {
        label: 'Hour Require Per:',
        render: (jobDetails) => jobDetails?.jobTiming?.hourRequired || 'NA',
    },
    {
        label: 'Duration of Work Type:',
        render: (jobDetails) =>
            jobDetails?.jobTiming?.durationOfWorkType || 'NA',
    },
    {
        label: 'Duration of Work:',
        render: (jobDetails) => jobDetails?.jobTiming?.durationOfWork || 'NA',
    },
    {
        label: 'Shift Start Time:',
        render: (jobDetails) => jobDetails?.jobTiming?.shiftStartTime || 'NA',
    },
    {
        label: 'Shift End Time:',
        render: (jobDetails) => jobDetails?.jobTiming?.shiftEndTime || 'NA',
    },
    {
        label: 'Job Days:',
        render: (jobDetails) => jobDetails?.jobTiming?.jobDays.join() || 'NA',
    },
]
const qaBillingTimingField = [
    {
        label: 'Total Hour Require:',
        render: (jobDetails) =>
            `${jobDetails?.jobTiming?.hourRequired} hrs` || 'NA',
    },
    {
        label: 'Hour Require Per:',
        render: (jobDetails) => jobDetails?.jobTiming?.hourRequired || 'NA',
    },
    {
        label: 'Duration of Work Type:',
        render: (jobDetails) =>
            jobDetails?.jobTiming?.durationOfWorkType || 'NA',
    },
    {
        label: 'Duration of Work:',
        render: (jobDetails) => jobDetails?.jobTiming?.durationOfWork || 'NA',
    },
    {
        label: 'Shift Start Time:',
        render: (jobDetails) => jobDetails?.jobTiming?.shiftStartTime || 'NA',
    },
    {
        label: 'Shift End Time:',
        render: (jobDetails) => jobDetails?.jobTiming?.shiftEndTime || 'NA',
    },
    {
        label: 'Job Days:',
        render: (jobDetails) => jobDetails?.jobTiming?.jobDays.join() || 'NA',
    },
]
const JobDetails = () => {
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
    }))
    const { jobDetails, loading, clientId } = useSelector((state) => state.jobManagement)
    let prefillObject = jobDetails
    const { modulesList } = useSelector((state) => state.roles)
    const anchorRef = useRef(null)
    const classes = useStyles()
    const [draftToggle, setDraftToggle] = useState(false)

    const [isActionPopupOpen, setActionPopupOpen] = useState(false)
    const [isUnpulishModalOpen, setIsUnpulishModalOpen] = useState(false)
    const [isPublishModalOpen, setIsPublishModalOpen] = useState(false)
    const [isJobDescriptionDialogOpen, setisJobDescriptionDialogOpen] =
        useState(false)
    const [isAssignModuleModalOpen, setIsAssignModuleModalOpen] =
        useState(false)
    const [isCompleteJobModalOpen, setIsCompleteJobModalOpen] = useState(false)

    const [assignJobModulesList, setAssignJobModulesList] = useState([])
    const [jobDetailsData, setjobDetailsData] = useState({})

    const convertToRichTextEditorContent = () =>
        RichTextEditor.createValueFromString(
            jobDetailsData.jobDescription,
            'html'
        )

    const [jobDescription, setJobDescription] = useState(
        convertToRichTextEditorContent('')
    )
    const dispatch = useDispatch()
    let { id } = useParams()
    const typeOfUser = localStorage.getItem('typeOfUser')

    useEffect(() => {
        setjobDetailsData(jobDetails)
    }, [jobDetails])

    useEffect(() => {
        if (jobDetailsData && jobDetailsData.jobDescription) {
            setJobDescription(
                convertToRichTextEditorContent(jobDetailsData.jobDescription)
            )
            return
        }
        setJobDescription(RichTextEditor.createEmptyValue())
        // }
    }, [jobDetails, jobDetailsData])

    useEffect(() => {
        dispatch({ type: 'getJobDetailAction', payload: id })
    }, [])
    useEffect(() => {
        if (clientId || jobDetails?.clientId) {
            dispatch({
                type: 'getUserModulesAction',
                payload: {
                    clientId: clientId ? clientId : jobDetails?.clientId,
                },
            })
        }
    }, [clientId, jobDetails?.clientId])

    useEffect(() => {
        if (draftToggle) {
            if (jobDetails?.jobDraftJson) {
                prefillObject = JSON.parse(
                    jobDetails.jobDraftJson.replaceAll('\\"', '"')
                )
                setjobDetailsData(prefillObject)
            }
        } else {
            setjobDetailsData(prefillObject)
        }
    }, [draftToggle])

    const handleAssignJobModuleClick = () => {
        // if (jobDetails.modules !== null) {
        const selectedModulesData = modulesList.filter((d) =>
            _get(jobDetails, 'modules', []).includes(d.id)
        )
        setAssignJobModulesList(selectedModulesData)
        // }
        setIsAssignModuleModalOpen(true)
    }

    const jobActions = [
        {
            label: 'Assign job module',
            onClick: handleAssignJobModuleClick,
        },
        {
            label:
                jobDetails?.publishStatus === 'UNPUBLISH'
                    ? 'Publish job'
                    : jobDetails.publishStatus === 'DRAFT'
                        ? 'Publish Job'
                        : 'Unpublish job',
            onClick:
                jobDetails?.publishStatus === 'UNPUBLISH'
                    ? () => setIsPublishModalOpen(true)
                    : jobDetails.publishStatus === 'DRAFT'
                        ? () => setIsPublishModalOpen(true)
                        : () => setIsUnpulishModalOpen(true),
        },
        {
            label: 'Complete Job',
            onClick: () => { setIsCompleteJobModalOpen(!isCompleteJobModalOpen) },
        },
    ]

    const handleBack = (e) => {
        history.goBack()
    }

    const handleEditIcon_View = (e) => {
        const pathname = `/job/editJob/${id}`
        history.push({
            pathname: pathname,
        })
    }
    const handleDraftToggle = () => {
        setDraftToggle(!draftToggle)
    }

    const handleActionModalClose = (key) => {
        if (key === 'jobModule') {
            setIsAssignModuleModalOpen(false)
        }
        if (key === 'publishJob') {
            setIsPublishModalOpen(false)
        }
        if (key === 'unpublished') {
            setIsUnpulishModalOpen(false)
        }
        if (key === 'completeJob') {
            setIsCompleteJobModalOpen(!isCompleteJobModalOpen)
        }
    }
    const handlePublishJob = async () => {
        try {
            const res = await publishJobService({ id, clientId })
            dispatch(SNACKBAR_SUCCESS(res.message))
            if (res.message) {
                setIsPublishModalOpen(false)
                dispatch({ type: 'getJobDetailAction', payload: id })
            }
        } catch (error) {
            dispatch(SNACKBAR_ERROR(error.message))
            setIsPublishModalOpen(false)
        }
    }
    const handleUnpublishJob = async () => {
        try {
            const res = await unPublishJobService({ id })
            dispatch(SNACKBAR_SUCCESS(res.message))
            if (res.message) {
                setIsUnpulishModalOpen(false)
                dispatch({ type: 'getJobDetailAction', payload: id })
            }
        } catch (error) {
            dispatch(SNACKBAR_ERROR(error.message))
            setIsUnpulishModalOpen(false)
        }
    }
    const onUpdateCompleteJobService = async () => {
        try {

            const response = await updateCompleteJobService({ jobId: id })
            if (!response.error) {
                dispatch(SNACKBAR_SUCCESS(response.message))
                setIsCompleteJobModalOpen(!setIsCompleteJobModalOpen)
                dispatch({ type: 'getJobDetailAction', payload: id })
            }
        } catch (error) {
            dispatch(SNACKBAR_ERROR(error.message))
            setIsCompleteJobModalOpen(!setIsCompleteJobModalOpen)
        }
    }

    const handleJobModuleChange = (e, value) => {
        setAssignJobModulesList(value)
    }

    const handleJobDescriptionDialog = () => {
        setisJobDescriptionDialogOpen(!isJobDescriptionDialogOpen)
    }

    const onJobModuleSubmit = async () => {
        try {
            const payload = {
                modules: assignJobModulesList.map((d) => d.id),
            }
            const res = await mapJobModulesService({ id, payload })
            dispatch(SNACKBAR_SUCCESS(res.message))
            if (res.message) {
                setIsAssignModuleModalOpen(false)
                dispatch({ type: 'getJobDetailAction', payload: id })
            }
        } catch (error) {
            dispatch(SNACKBAR_ERROR(error.message))
            setIsAssignModuleModalOpen(false)
        }
    }

    const { skillCategories, deliverables, highlights } = jobDetailsData
    const selectedModulesData = modulesList.filter((d) => {
        if (jobDetails.modules !== null) {
            return _get(jobDetails, 'modules', []).includes(d.id)
        }
    })


    if (loading) {
        return <Loading />
    }
    let jobDetailsLength = Object.keys(jobDetails).length
    if (!jobDetailsLength) {
        return <Loading />
    }

    return (
        <>
            <Grid
                container
                spacing={2}
                alignItems="center"
                justifyContent="space-between"
                className="flex items-center pt-2"
            >
                <V5GlobalHeaderActionList
                    backIcon
                    title={'Job Details'}
                />
                <Grid item className="flex items-center">


                    {jobDetails.jobDraftJson && typeOfUser !== "QUALITY_ASSURANCE" ? (
                        draftToggle ? (
                            <Tooltip title="Published job">
                                <ToggleOnIcon
                                    className="cursor-pointer mx-1"
                                    color="primary"
                                    fontSize="large"
                                    onClick={handleDraftToggle}
                                />
                            </Tooltip>
                        ) : (
                            <Tooltip title="Drafted job">
                                <ToggleOffIcon
                                    className="cursor-pointer text-light-gray mx-2"
                                    fontSize="large"
                                    onClick={handleDraftToggle}
                                />
                            </Tooltip>
                        )
                    ) : null}

                    {typeOfUser !== "QUALITY_ASSURANCE" ?

                        <div>
                            <Tooltip title="Edit job">
                                <EditIcon
                                    className="cursor-pointer text-light-gray mx-2"
                                    fontSize="medium"
                                    onClick={handleEditIcon_View}
                                />
                            </Tooltip>
                            <Tooltip title="More">
                                <MoreVertIcon
                                    className="cursor-pointer text-light-gray mx-2"
                                    fontSize="medium"
                                    onClick={() => setActionPopupOpen(true)}
                                />
                            </Tooltip> </div> : null
                    }
                    <div>
                        <ActionsPopup
                            width={200}
                            open={isActionPopupOpen}
                            onClose={() => setActionPopupOpen(false)}
                            anchorEl={anchorRef.current}
                        >
                            <ClickAwayListener
                                onClickAway={() => setActionPopupOpen(false)}
                            >
                                <div className={`${classes.popOverMenu}`}>
                                    <div
                                        className={classes.tablePopupContainer}
                                    >
                                        {jobActions.map((ja, i) => {
                                            return (
                                                <Button
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
                        <Dialog
                            id="transition-modal-description"
                            fullScreen
                            fullWidth
                            maxWidth="lg"
                            open={isJobDescriptionDialogOpen}
                            scroll="paper"
                            onClose={() => handleJobDescriptionDialog()}
                        >
                            <Grid
                                item
                                xs={12}
                                sm={12}
                                md={6}
                                lg={12}
                                className="p-2"
                            >
                                <div className="flex justify-end">
                                    <CloseIcon
                                        className="cursor-pointer text-light-gray my-2"
                                        onClick={() =>
                                            handleJobDescriptionDialog()
                                        }
                                    />
                                </div>
                                <div>
                                    <RichTextEditor
                                        value={jobDescription}
                                        // toolbarConfig={toolbarConfig}
                                        disabled
                                    />
                                </div>
                            </Grid>
                        </Dialog>
                        <ActionsModal
                            customModal
                            actionModalOpen={isAssignModuleModalOpen}
                            description={'Assign Job module'}
                            handleActionModalClose={() =>
                                handleActionModalClose('jobModule')
                            }
                        >
                            <div className="mb-4">
                                <MultiSelectSearch
                                    value={assignJobModulesList ?? []}
                                    label={'Job modules'}
                                    placeholder={'Search job modules'}
                                    listArray={modulesList}
                                    onChange={(e, value) =>
                                        handleJobModuleChange(e, value)
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
                                    onClick={() => onJobModuleSubmit()}
                                >
                                    Confirm
                                </Button>
                            </div>
                        </ActionsModal>
                        <ActionsModal
                            actionModalOpen={isUnpulishModalOpen}
                            description={
                                'Are you sure you want to unpublished this job'
                            }
                            buttonTitle1={'Yes'}
                            buttonTitle2={'No'}
                            handleActionModalClose={() =>
                                handleActionModalClose('unpublished')
                            }
                            handleButtonAction1={handleUnpublishJob}
                            handleButtonAction2={() =>
                                handleActionModalClose('unpublished')
                            }
                        />
                        <ActionsModal
                            actionModalOpen={isPublishModalOpen}
                            description={
                                'Are you sure you want to publish this job'
                            }
                            buttonTitle1={'Yes'}
                            buttonTitle2={'No'}
                            handleActionModalClose={() =>
                                handleActionModalClose('publishJob')
                            }
                            handleButtonAction1={handlePublishJob}
                            handleButtonAction2={() =>
                                handleActionModalClose('publishJob')
                            }
                        />
                        <ActionsModal
                            actionModalOpen={isCompleteJobModalOpen}
                            description={'Are you sure you want to complete this job'}
                            buttonTitle1={'Yes'}
                            buttonTitle2={'No'}
                            handleActionModalClose={() =>
                                handleActionModalClose('completeJob')
                            }
                            handleButtonAction1={() => onUpdateCompleteJobService()}
                            handleButtonAction2={() => handleActionModalClose('completeJob')}
                        />
                    </div>
                </Grid>
            </Grid>

            <BackgroundCard title={'Basic Details'}>
                <DetailsCard
                    data={basicDetailsField}
                    basicDetails={true}
                    highlights={highlights}
                    deliverables={deliverables}
                    handleJobDescriptionDialog={handleJobDescriptionDialog}
                    cardDetails={jobDetailsData}
                />
            </BackgroundCard>
            <BackgroundCard title={'Other Details'}>
                <DetailsCard
                    data={otherDetailsField}
                    cardDetails={jobDetailsData}
                />
            </BackgroundCard>
            <BackgroundCard title={'Billing & Timing'}>
                <DetailsCard
                    data={typeOfUser === 'QUALITY_ASSURANCE' ? qaBillingTimingField : billindTimingField}
                    cardDetails={jobDetailsData}
                />
            </BackgroundCard>
            <BackgroundCard title={'Skills'}>
                <RenderSkills skillCategories={skillCategories} />
            </BackgroundCard>
            <BackgroundCard title={'Job Mapped Modules'}>
                {!selectedModulesData.length
                    ? null
                    : selectedModulesData.map((md, item) => (
                        <Chip
                            label={md.name}
                            size="small"
                            color="#FFFFFF"
                            variant="outlined"
                            className="m-1"
                        />
                    ))}
            </BackgroundCard>
        </>
    )
}

export default JobDetails
