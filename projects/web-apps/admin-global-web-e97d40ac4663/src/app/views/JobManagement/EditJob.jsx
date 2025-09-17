import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'

import history from 'helper/history.js'

import { V5GlobalHeaderActionList, V5GlobalStepper } from 'app/components'
import JobSummary from './components/ManageJob/JobSummary'
import JobSetting from './components/ManageJob/JobSetting'
import BillingTiming from './components/ManageJob/BillingTiming'
import RichTextEditor from 'react-rte'
import { updateJobService } from 'app/redux/JobManagement/JobManagementService'
import { SNACKBAR_ERROR, SNACKBAR_SUCCESS } from 'app/redux/slices/snackbar'
import { useParams } from 'react-router-dom'
import BackgroundCard from './components/BackgroundCard'
import _get from 'lodash.get'
import V5GlobalFormFooter from '../VendorManagement/components/V5GlobalFormFooter'
//..Functions
//....USER ONBOARD STEPS
function getSteps() {
    return ['Job Summary', 'Job Setting', 'Billing & Timing']
}
const pageSource = {
    JOB_SUMMARY: 'JOB_SUMMARY',
    JOB_SETTING: 'JOB_SETTING',
    BILLING_TIMING: 'BILLING_TIMING',
}

const useStyles = makeStyles((theme) => ({
    stickyHeader: {
        position: 'sticky',
        top: '0rem',
        backgroundColor: '#f5f5f5',
        zIndex: '100',
        paddingTop: '1rem',
    },
}))

const EditJob = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const steps = getSteps()
    const styleObj = {
        textFieldWidth: 'w-full',
    }

    //....LOCAL STATES
    const {
        jobDetails,
        activeStep,
        formBtnStates,
        weekDays,
        skillsList,
        countries,
    } = useSelector((state) => state.jobManagement)
    const [pageMode, setPageMode] = React.useState('')
    const [backArrowDisabled, setBackArrowDisabled] = React.useState(true)
    const [nextArrowDisabled, setNextArrowDisabled] = React.useState(false)
    const [days, setDays] = useState([])
    const [deliverableChip, setDeliverableChip] = useState([])
    const [highlightsChip, setHighlightsChip] = useState([])
    const [jobDescription, setJobDescription] = useState('')
    const [newJobDescription, setNewJobDescription] = useState('')
    const [isVisibilityValueEnable, setIsVisibilityValueEnable] =
        useState(false)

    const [jobSummary, setJobSummary] = useState({
        jobTitle: '',
        jobShortDescription: '',
        highlights: [],
        deliverables: [],
        skills: [],
    })
    const [jobSetting, setJobSetting] = useState({
        jobType: '',
        projectType: '',
        experienceLevel: '',
        visibilityType: '',
        visibilityValue: [],
        isVisibleToFreelancer: '',
        isVisibleToVendor: '',
        location: '',
        city: '',
        state: '',
        country: '',
        pinCode: '',
        lat: '',
        lng: '',
    })
    const [jobBillingTiming, setJobBillingTiming] = useState({
        number: '',
        type: '',
        hourRequired: '',
        hourRequiredPer: '',
        durationOfWork: '',
        durationOfWorkType: '',
        jobDays: [],
        shiftStartTime: '09:00',
        shiftEndTime: '18:00',
    })

    const { clientId } = useSelector((state) => state.screenBuilder)

    let { id } = useParams()

    useEffect(() => {
        var elmntToView = document.getElementById('sectionId')
        elmntToView.scrollIntoView()
    }, [activeStep])
    useEffect(() => {
        dispatch({ type: 'getJobDetailAction', payload: id })
    }, [])
    useEffect(() => {
        dispatch({ type: 'getSkillsListAction' })
    }, [])

    useEffect(() => {
        if (activeStep === 0) {
            setBackArrowDisabled(true)
            setNextArrowDisabled(false)
        } else if (activeStep === 1) {
            setBackArrowDisabled(false)
            setNextArrowDisabled(false)
        } else if (activeStep === 2) {
            setBackArrowDisabled(false)
            setNextArrowDisabled(true)
        } else {
            setBackArrowDisabled(false)
        }
    }, [activeStep])
    const getSkillId = jobSummary?.skills?.map((item) => item.id)

    useEffect(() => {
        if (jobDetails) {
            handlePrefilledData(jobDetails)
        }
    }, [jobDetails, jobDetails.jobDescription])

    const handlePrefilledData = () => {
        let prefillObject = jobDetails
        console.log(prefillObject)
        if (_get(jobDetails, 'jobDraftJson', '')) {
            prefillObject = JSON.parse(
                jobDetails.jobDraftJson.replaceAll('\\"', '"')
            )
        }
        const {
            jobTitle,
            jobShortDescription,
            jobDescription,
            highlights,
            deliverables,
            skills,
            skillCategories,
            jobType,
            projectType,
            experienceLevel,
            address,
            jobTiming,
            jobVisibility,
            locationGps,
            billing,
        } = prefillObject

        let skillsArray = []
        const renderSkills = skillCategories?.map((sk) => {
            return sk.skills?.map((s) => {
                skillsArray.push(s)
                return skillsArray
            })
        })

        setJobSummary((prev) => ({
            ...prev,
            jobTitle,
            jobShortDescription,
            skills: skillsArray,
        }))
        setJobDescription(jobDescription)
        setJobSetting((prev) => ({
            ...prev,
            jobType,
            projectType,
            experienceLevel,
            city: address?.city,
            country: address?.country,
            location: address?.location,
            pinCode: address?.pinCode,
            state: address?.state,
            lat: locationGps?.lat,
            lng: locationGps?.lng,
            visibilityType: jobVisibility?.visibilityType,
            visibilityValue: jobVisibility?.visibilityValue,
            isVisibleToFreelancer: jobVisibility?.isVisibleToFreelancer,
            isVisibleToVendor: jobVisibility?.isVisibleToVendor,
        }))
        setJobBillingTiming((pre) => ({
            ...pre,
            number: billing?.number,
            type: billing?.type,
            hourRequired: jobTiming?.hourRequired,
            hourRequiredPer: jobTiming?.hourRequiredPer,
            durationOfWork: jobTiming?.durationOfWork,
            durationOfWorkType: jobTiming?.durationOfWorkType,
            jobDays: jobTiming?.jobDays,
            shiftStartTime: jobTiming?.shiftStartTime,
            shiftEndTime: jobTiming?.shiftEndTime,
        }))
        if (deliverables) {
            setDeliverableChip(deliverables)
        }
        if (highlights) {
            setHighlightsChip(highlights)
        }
    }

    const handleInputChange = (key, name, value, e) => {
        if (key === 'jobSummary') {
            setJobSummary((prev) => ({
                ...prev,
                [name]: value,
            }))
        }
        if (key === 'jobSetting') {
            if (name === 'visibilityType') {
                setIsVisibilityValueEnable(value === 'WORLDWIDE' ? true : false)
                setJobSetting((prev) => ({
                    ...prev,
                    visibilityValue: [],
                }))
            }
            setJobSetting((prev) => ({
                ...prev,
                [name]: value,
            }))
        }
        if (key === 'jobBillingTiming') {
            setJobBillingTiming((prev) => ({
                ...prev,
                [name]: value,
            }))
        }
    }
    const handlejobDescription = (event, editor) => {
        const data = editor.getData()
        setJobDescription(data)
    }
    const onEditorReady = (editor) => {
        setJobDescription(jobDescription + ' ')
        // setNewJobDescription(jobDescription)
    }
    const editDeliverables = (e, mode = '') => {
        if (e.key === 'Enter') {
            let newChipData = [...deliverableChip]
            newChipData.push(jobSummary.deliverables)
            setDeliverableChip(newChipData)
            jobSummary.deliverables = ''
            setJobSummary(jobSummary)
        }
    }
    const removeDeliverables = (item, mode = '') => {
        let removeitem = [...deliverableChip]
        const itemIndex = removeitem.indexOf(item)
        if (itemIndex > -1) {
            removeitem.splice(itemIndex, 1)
        }
        setDeliverableChip(removeitem)
    }
    const editHighlights = (e, mode = '') => {
        if (e.key === 'Enter') {
            let newChipData = [...highlightsChip]
            newChipData.push(jobSummary.highlights)
            setHighlightsChip(newChipData)
            jobSummary.highlights = ''
            setJobSummary(jobSummary)
        }
    }

    const removeHighlights = (item, mode = '') => {
        let removeitem = [...highlightsChip]
        const itemIndex = removeitem.indexOf(item)
        if (itemIndex > -1) {
            removeitem.splice(itemIndex, 1)
        }
        setHighlightsChip(removeitem)
    }

    const handleBack = (e) => {
        history.goBack()
    }

    //....HANDLE NEXT ARROW FOOTER OF THE PAGES
    const handleNextArrow = () => {
        dispatch({
            type: 'setActiveStepAction',
            payload: { activeStep: activeStep + 1 },
        })
    }
    //....HANDLE BACK ARROW FOOTER OF THE PAGES
    const handleBackArrow = () => {
        dispatch({
            type: 'setActiveStepAction',
            payload: { activeStep: activeStep - 1 },
        })
    }

    const generatePayload = () => {
        return {
            clientId: clientId,
            jobTitle: jobSummary.jobTitle,
            jobShortDescription: jobSummary.jobShortDescription,
            jobDescription: jobDescription,
            highlights: highlightsChip,
            deliverables: deliverableChip,
            jobType: jobSetting.jobType,
            projectType: jobSetting.projectType,
            experienceLevel: jobSetting.experienceLevel,
            jobVisibility: {
                visibilityType: jobSetting.visibilityType,
                visibilityValue: jobSetting.visibilityValue,
                isVisibleToFreelancer: jobSetting.isVisibleToFreelancer,
                isVisibleToVendor: jobSetting.isVisibleToVendor,
            },
            skills: getSkillId,
            locationGps: {
                lat: jobSetting.lat,
                lng: jobSetting.lng,
            },
            address: {
                location: jobSetting.location,
                city: jobSetting.city,
                state: jobSetting.state,
                country: jobSetting.country,
                pinCode: jobSetting.pinCode,
            },
            jobTiming: {
                hourRequired: jobBillingTiming.hourRequired,
                hourRequiredPer: jobBillingTiming.hourRequiredPer,
                durationOfWork: jobBillingTiming.durationOfWork,
                durationOfWorkType: jobBillingTiming.durationOfWorkType,
                jobDays: jobBillingTiming.jobDays,
                shiftStartTime: jobBillingTiming.shiftStartTime,
                shiftEndTime: jobBillingTiming.shiftEndTime,
            },
            billing: {
                number: jobBillingTiming.number,
                type: jobBillingTiming.type,
            },
        }
    }

    const handleSaveDraft = async () => {
        try {
            const payload = generatePayload()
            payload['publishStatus'] = 'DRAFT'
            const res = await updateJobService({ id, payload })
            if (!res.error) {
                dispatch(SNACKBAR_SUCCESS(res.message))
                dispatch({ type: 'getJobDetailAction', payload: id })
                handleBack()
            }
        } catch (error) {
            dispatch(SNACKBAR_ERROR(error.message))
        }
    }

    const validatePublishActionState = () => {
        let invalidFieldCount = 0
        const payload = generatePayload()

        const stringFields = [
            'jobTitle',
            'jobShortDescription',
            'jobDescription',
            'jobType',
            'projectType',
            'experienceLevel',
        ]
        const arrayFields = ['deliverables', 'highlights', 'skills']
        const objectFiled = [
            'address',
            'locationGps',
            // 'jobVisibility',
            'billing',
            // 'jobTiming',
        ]

        Object.keys(payload).forEach((field) => {
            //checking for mandatory keys(feilds)
            if (stringFields.includes(field) || arrayFields.includes(field)) {
                //checking the length for string and array
                if (payload[field] && !payload[field].length) {
                    invalidFieldCount++
                }
            }

            //checking in objects
            if (objectFiled.includes(field)) {
                const keys = Object.keys(payload[field])
                const isValid = keys.filter((x) => {
                    if (Array.isArray(payload[field][x])) {
                        if (!payload[field][x].length) {
                            invalidFieldCount++
                        }
                        return null
                    }
                    return !payload[field][x]
                })
                const length = isValid.length
                invalidFieldCount = invalidFieldCount + length
            }
        })

        return invalidFieldCount !== 0
    }

    const handlePublishJob = async () => {
        try {
            const payload = generatePayload()
            payload['publishStatus'] = 'PUBLISHED'
            const res = await updateJobService({ id, payload })
            if (!res.error) {
                dispatch(SNACKBAR_SUCCESS(res.message))
                dispatch({ type: 'getJobDetailAction', payload: id })
                handleBack()
            }
        } catch (error) {
            dispatch(SNACKBAR_ERROR(error.message))
        }
    }
    const footerActions = [
        {
            label: 'DISCARD',
            variant: 'outlined',
            disabled: false,
            onClick: handleBack,
            style: {
                border: '1px solid #2C3E93',
                color: '#2C3E93 ',
                marginRight: 10,
            },
        },
        {
            label: 'SAVE DRAFT',
            variant: 'outlined',
            disabled: false,
            onClick: handleSaveDraft,
            style: {
                color: '#2C3E93',
                fontSize: '13px',
                border: '1px solid #2C3E93',
                backgroundColor: '#daedf4',
                marginRight: 10,
            },
        },
        {
            label: 'PUBLISH',
            variant: 'outlined',
            disabled: validatePublishActionState(),
            onClick: handlePublishJob,
            style: {
                color: 'white',
                fontSize: '13px',
                border: '1px solid #2C3E93',
                backgroundColor: '#2C3E93',
            },
        },
    ]
    console.log(jobSummary.skills, 'edit jobbbb')
    return (
        <Grid id="sectionId">
            <div className="analytics m-sm-30">
                <div className={classes.stickyHeader}>
                    <Grid
                        container
                        spacing={2}
                        justify="space-between"
                        className="flex items-center pt-2"
                    >
                        <V5GlobalHeaderActionList
                            backIcon
                            title={'Edit Job'}
                        />
                    </Grid>
                    <Grid item className="m-center" xs={12} sm={12} md={8}>
                        <V5GlobalStepper
                            steps={steps}
                            activeStep={activeStep}
                            alternativeLabel={true}
                            pageMode={pageMode}
                        />
                    </Grid>
                    <BackgroundCard>
                        <Grid item>
                            {activeStep === 0 && (
                                <JobSummary
                                    styleObj={styleObj}
                                    pageSource={pageSource}
                                    backArrowDisabled={backArrowDisabled}
                                    nextArrowDisabled={nextArrowDisabled}
                                    cancelBtnDisabled={
                                        formBtnStates.jobSummary
                                            .cancelBtnDisabled
                                    }
                                    saveAndContinueBtnDisabled={
                                        formBtnStates.jobSummary
                                            .saveAndContinueBtnDisabled
                                    }
                                    handleNextArrow={handleNextArrow}
                                    handleBackArrow={handleBackArrow}
                                    handleInputChange={handleInputChange}
                                    formValues={jobSummary}
                                    skillsList={skillsList}
                                    deliverableChip={deliverableChip}
                                    highlightsChip={highlightsChip}
                                    handleDeliverables={editDeliverables}
                                    removeDeliverables={removeDeliverables}
                                    handleHighlights={editHighlights}
                                    removeHighlights={removeHighlights}
                                    handlejobDescription={handlejobDescription}
                                    jobDescription={jobDescription}
                                    onEditorReady={onEditorReady}
                                />
                            )}
                            {activeStep === 1 && (
                                <JobSetting
                                    styleObj={styleObj}
                                    handleInputChange={handleInputChange}
                                    formValues={jobSetting}
                                    isVisibilityValueEnable={
                                        isVisibilityValueEnable
                                    }
                                    countries={countries}
                                />
                            )}
                            {activeStep === 2 && (
                                <BillingTiming
                                    styleObj={styleObj}
                                    days={days}
                                    setDays={setDays}
                                    weekDays={weekDays}
                                    handleInputChange={handleInputChange}
                                    formValues={jobBillingTiming}
                                />
                            )}
                            <Grid
                                item
                                xs={12}
                                sm={12}
                                md={8}
                                lg={12}
                                className="mt-4"
                            >
                                <V5GlobalFormFooter
                                    backArrowDisabled={backArrowDisabled}
                                    nextArrowDisabled={nextArrowDisabled}
                                    handleNextArrow={handleNextArrow}
                                    handleBackArrow={handleBackArrow}
                                    handleCanceBtn={handleBack}
                                    footerActions={footerActions}
                                    customFooter
                                />
                            </Grid>
                        </Grid>
                    </BackgroundCard>
                </div>
            </div>
        </Grid>
    )
}

export default EditJob
