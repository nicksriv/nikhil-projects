import React, { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import {
    Button,
    ClickAwayListener,
    Typography,
    Grid,
    Modal,
    Box,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { V5GlobalHeaderActionList } from 'app/components'
import BackgroundCard from '../JobManagement/components/BackgroundCard'
import DetailCard from '../../components/DetailsCard/DetailsCard'
import ProfileHeader from '../../components/ProfileHeader/ProfileHeader'
import ActionsPopup from 'app/components/ActionPopup/ActionsPopup'
import {
    deactivateClientService,
    activateClientService,
} from 'app/redux/ClientManagement/clientManagementService'
import { SNACKBAR_ERROR, SNACKBAR_SUCCESS } from 'app/redux/slices/snackbar'
import ActionsModal from 'app/components/ActionModal/ActionsModal'
import Loading from 'app/components/V5GlobalLoading/V5GlobalLoading'
import history from 'helper/history.js'
import ModuleCard from './components/ModuleCard'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline'
import CancelRoundedIcon from '@material-ui/icons/CancelRounded'
import { config } from 'helper/config.js'

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
    inActiveBtn: {
        color: '#BF334C !important',
        fontSize: '13px',
        border: '1px solid #C13C54',
        zIndex: '1',
        padding: '0.1rem 0.2rem',
        width: '73px',
        backgroundColor: '#EAD9DD',
    },
    activeBtn: {
        color: '#2C3E93 !important',
        fontSize: '13px',
        padding: '0.1rem .2rem',
        width: '73px',
        border: '1px solid #2C3E93',
        backgroundColor: '#daedf4',
    },
}))

const spocDetailField = [
    {
        label: 'First Name:',
        render: (clientDetails) => clientDetails?.admin?.firstName || 'NA',
    },
    {
        label: 'Last Name:',
        render: (clientDetails) => clientDetails?.admin?.lastName || 'NA',
    },
    {
        label: 'Mobile No:',
        render: (clientDetails) => clientDetails?.admin?.mobile || 'NA',
    },
    {
        label: 'Email:',
        render: (clientDetails) => clientDetails?.admin?.email || 'NA',
    },
]

const ClientDetails = () => {
    const { isProd } = config
    //..ONBOARDING ENDPOINT
    const ONBOARDING_API_ENDPOINT = isProd
        ? config.production.api_endpoint
        : config.development.api_endpoint
    const ONBOARDING_APIVERSION = 'api/v1'

    const classes = useStyles()
    const { id } = useParams()
    const dispatch = useDispatch()
    const anchorRef = useRef(null)
    const [isActionPopupOpen, setActionPopupOpen] = useState(false)
    const [isActivatePopupOpen, setIsActivatePopupOpen] = useState(false)
    const [isDeActivatePopupOpen, setIsDeActivatePopupOpen] = useState(false)
    const hiddenImageInput = useRef(null)
    const [isBackgroundImageModalOpen, setIsBackgroundImageModalOpen] =
        useState(false)
    const { clientModulesList = [] } = useSelector(
        (state) => state.screenBuilder
    )
    const {
        clientDetails = {},
        loading,
        clientModules = [],
        assignQualityAssurances = [],
    } = useSelector((state) => state.clients)
    const { editTheme, editWorkFlow, status } = clientDetails

    const data = [
        {
            title: 'EDIT THEME CONFIGURATION',
            key: 'editTheme',
            description:
                'This will affects the background colors and fonts for modules created through Screen builder for the end uses.',
        },
        {
            title: 'EDIT WORKFLOW CONFIGURATION',
            key: 'editWorkFlow',
            description:
                'This will allow client to update workflow for the all modules created through screen builder.',
        },
    ]
    const basicDetailField = [
        {
            label: 'Client Name:',
            render: (clientDetails) => `${clientDetails?.clientName}` || 'NA',
        },
        {
            label: 'Head Office:',
            render: (clientDetails) =>
                `${clientDetails?.headOfficeName}` || 'NA',
        },
        {
            label: 'Address:',
            render: (clientDetails) => `${clientDetails?.address}` || 'NA',
        },
        {
            label: 'Status:',
            render: (clientDetails) => `${clientDetails?.status}` || 'NA',
            // {
            //     return <Button variant="outlined" className={`${clientDetails.status === "ACTIVE" ? classes.activeBtn : classes.inActiveBtn}`} >{clientDetails?.status || 'NA'}</Button>
            // }
        },
        {
            label: 'Opacity:',
            render: (clientDetails) => `${clientDetails?.opacity}` || 'NA',
        },
        {
            label: 'Background Image:',
            render: (clientDetails) =>
                clientDetails?.backgroundImageId ? (
                    <>
                        <p
                            onClick={handleBackgroundImageModal}
                            style={{
                                color: 'blue',
                                textDecoration: 'underLine',
                                fontSize: 14,
                                cursor: 'pointer',
                                margin: 0,
                            }}
                        >
                            View
                        </p>
                    </>
                ) : (
                    'NA'
                ),
        },
    ]
    const assignQualityAssurancesField = [
        {
            label: 'QA Name:',
            render: (assignQualityAssurances) =>
                `${assignQualityAssurances?.name}` || 'NA',
        },
        {
            label: 'Email:',
            render: (assignQualityAssurances) =>
                `${assignQualityAssurances?.email}` || 'NA',
        },
        {
            label: 'Mobile:',
            render: (assignQualityAssurances) =>
                `${assignQualityAssurances?.mobile}` || 'NA',
        },
        {
            label: 'Status:',
            render: (assignQualityAssurances) => {
                return (
                    <Button
                        variant="outlined"
                        className={`${
                            assignQualityAssurances.qualityControllerStatus ===
                            'ACTIVE'
                                ? classes.activeBtn
                                : assignQualityAssurances.qualityControllerStatus ===
                                  'INACTIVE'
                                ? classes.inActiveBtn
                                : null
                        }`}
                    >
                        {assignQualityAssurances?.qualityControllerStatus ||
                            'NA'}
                    </Button>
                )
            },
        },
    ]
    useEffect(() => {
        dispatch({
            type: 'getClientDetailsByIdAction',
            payload: { clientId: id },
        })

        dispatch({
            type: 'getClientModulesAction',
            payload: { id },
        })
        dispatch({
            type: 'getAssignedQualityAssuranceAction',
            payload: {clientId:id },
        })
    }, [])

    const clientActions = [
        {
            label:
                status === 'ACTIVE' ? 'Deactivate Client' : 'Activate Client',
            onClick: () =>
                status === 'ACTIVE'
                    ? setIsDeActivatePopupOpen(true)
                    : setIsActivatePopupOpen(true),
            disabled: false,
        },
    ]
    const handleEditClick = () => {
        history.push(`/client/edit?id=${id}`)
    }

    const handleActionPopup = () => {
        setActionPopupOpen(!isActionPopupOpen)
    }
    const handleActionModalClose = (key) => {
        if (key === 'activate') {
            setIsActivatePopupOpen(false)
        }
        if (key === 'deactivate') {
            setIsDeActivatePopupOpen(false)
        }
    }

    const handleDeactivateClient = async () => {
        try {
            const res = await deactivateClientService({ id })
            dispatch(SNACKBAR_SUCCESS(res.message))
            if (res.message) {
                setIsDeActivatePopupOpen(false)
                dispatch({
                    type: 'getClientDetailsByIdAction',
                    payload: { clientId: id },
                })
            }
        } catch (error) {
            dispatch(SNACKBAR_ERROR(error.message))
            setIsDeActivatePopupOpen(false)
        }
    }

    const handleActivateClient = async () => {
        try {
            const res = await activateClientService({ id })
            dispatch(SNACKBAR_SUCCESS(res.message))
            if (res.message) {
                setIsActivatePopupOpen(false)
                dispatch({
                    type: 'getClientDetailsByIdAction',
                    payload: { clientId: id },
                })
            }
        } catch (error) {
            dispatch(SNACKBAR_ERROR(error.message))
            setIsActivatePopupOpen(false)
        }
    }
    const onUploadImageClick = (event) => {
        hiddenImageInput.current.click()
    }

    const handleBackgroundImageModal = () => {
        setIsBackgroundImageModalOpen(!isBackgroundImageModalOpen)
    }
    if (
        !clientDetails ||
        !clientModulesList ||
        !assignQualityAssurances ||
        loading === 'start'
    ) {
        return <Loading />
    }
    return (
        <>
            <V5GlobalHeaderActionList
                backIcon
                title={'Client Details'}
                iconsList={[
                    {
                        iconType: 'edit_pencil',
                        tooltipTitle: 'Edit Client',
                        areaLabel: 'edit client',
                        iconComponent: 'span',
                        iconClickHandler: handleEditClick,
                    },
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
                    <ClickAwayListener onClickAway={() => handleActionPopup()}>
                        <div className={`${classes.popOverMenu}`}>
                            <div className={classes.tablePopupContainer}>
                                {clientActions.map((ja, i) => {
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
            <ActionsModal
                actionModalOpen={isActivatePopupOpen}
                description={'Are you sure you want to activate this client'}
                buttonTitle1={'Yes'}
                buttonTitle2={'No'}
                handleActionModalClose={() =>
                    handleActionModalClose('activate')
                }
                handleButtonAction1={handleActivateClient}
                handleButtonAction2={() => handleActionModalClose('activate')}
            />
            <ActionsModal
                actionModalOpen={isDeActivatePopupOpen}
                description={'Are you sure you want to deactivate this client'}
                buttonTitle1={'Yes'}
                buttonTitle2={'No'}
                handleActionModalClose={() =>
                    handleActionModalClose('deactivate')
                }
                handleButtonAction1={handleDeactivateClient}
                handleButtonAction2={() => handleActionModalClose('deactivate')}
            />
            <Modal
                open={isBackgroundImageModalOpen}
                onClose={handleBackgroundImageModal}
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                closeAfterTransition
            >
                <Box
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        backgroundColor: '#ffff',
                        border: '2px solid #000',
                        boxShadow: 24,
                        padding: `7px 4px 4px 4px`,
                    }}
                >
                    <img
                        style={{
                            width: '400px',
                            height: '400px',
                            objectFit: 'contain',
                        }}
                        src={`${ONBOARDING_API_ENDPOINT}${ONBOARDING_APIVERSION}/files/${clientDetails?.backgroundImageId}`}
                        alt="background"
                    />
                </Box>
            </Modal>

            <BackgroundCard title={'Basic Details'}>
                <ProfileHeader
                    basicDetailField={basicDetailField}
                    cardDetails={clientDetails}
                    buttonText="Upload Image"
                    handleButton={onUploadImageClick}
                    showImage
                />
            </BackgroundCard>

            <BackgroundCard title={'SPOC Details'}>
                <DetailCard
                    data={spocDetailField}
                    cardDetails={clientDetails}
                />
            </BackgroundCard>

            <BackgroundCard title={'Modules'}>
                <Grid container spacing={3}>
                    {clientModulesList.map((module) => {
                        return <ModuleCard module={module.name} />
                    })}
                </Grid>
            </BackgroundCard>
            <BackgroundCard title={'Access Privilage'}>
                {data.map((privilege) => {
                    return (
                        <div className="mb-4">
                            <Typography
                                variant="p"
                                style={{ fontWeight: 'bold' }}
                            >
                                {privilege.title}
                                {privilege.key === 'editTheme' ? (
                                    editTheme ? (
                                        <span
                                            style={{
                                                position: 'relative',
                                                top: '0.3rem',
                                                left: '0.3rem',
                                            }}
                                        >
                                            <CheckCircleOutlineIcon
                                                style={{ color: 'green' }}
                                            />
                                        </span>
                                    ) : (
                                        <span
                                            style={{
                                                position: 'relative',
                                                top: '0.3rem',
                                                left: '0.3rem',
                                            }}
                                        >
                                            <CancelRoundedIcon
                                                style={{ color: 'red' }}
                                            />
                                        </span>
                                    )
                                ) : null}

                                {privilege.key === 'editWorkFlow' ? (
                                    editWorkFlow ? (
                                        <span
                                            style={{
                                                position: 'relative',
                                                top: '0.3rem',
                                                left: '0.3rem',
                                            }}
                                        >
                                            <CheckCircleOutlineIcon
                                                style={{ color: 'green' }}
                                            />
                                        </span>
                                    ) : (
                                        <span
                                            style={{
                                                position: 'relative',
                                                top: '0.3rem',
                                                left: '0.3rem',
                                            }}
                                        >
                                            <CancelRoundedIcon
                                                style={{ color: 'red' }}
                                            />
                                        </span>
                                    )
                                ) : null}
                            </Typography>
                            <br />
                            <Typography variant="p">
                                {privilege.description}
                            </Typography>
                        </div>
                    )
                })}
            </BackgroundCard>
            <BackgroundCard title={'Assigned QA'}>
                {assignQualityAssurances.map((assignQualityAssurance) => {
                    return (
                        <div
                            style={{ borderBottom: '1px solid  #cccccc' }}
                            className="pb-3 pt-3"
                        >
                            <DetailCard
                                data={assignQualityAssurancesField}
                                cardDetails={assignQualityAssurance}
                            />
                        </div>
                    )
                })}
            </BackgroundCard>
        </>
    )
}

export default ClientDetails
