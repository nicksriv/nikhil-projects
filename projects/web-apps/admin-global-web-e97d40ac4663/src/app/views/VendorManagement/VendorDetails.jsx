import React, { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Button, ClickAwayListener, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { V5GlobalHeaderActionList } from 'app/components'
import BackgroundCard from '../JobManagement/components/BackgroundCard'
import DetailCard from '../../components/DetailsCard/DetailsCard'
import RenderSkills from '../JobManagement/components/RenderSkills'
import ProfileHeader from '../../components/ProfileHeader/ProfileHeader'
import ActionsPopup from 'app/components/ActionPopup/ActionsPopup'
import {
    activateVendorService,
    deActivateVendorService,
    uploadVendorLogoService,
    uploadVendorPortfolioService,
} from 'app/redux/VendorManagement/VendorManagementService'
import { SNACKBAR_ERROR, SNACKBAR_SUCCESS } from 'app/redux/slices/snackbar'
import ActionsModal from 'app/components/ActionModal/ActionsModal'
import Loading from 'app/components/V5GlobalLoading/V5GlobalLoading'
import { config } from 'helper/config.js'
import history from 'helper/history.js'
import { setShowVendorDetailsPopup } from 'app/redux/VendorManagement/VendorManagementSlice'
import VendorCredentialSideDrawer from './VendorCredentialSideDrawer'
import StatsCard from 'app/components/StatsCard/StatsCard'

const basicDetailField = [
    {
        label: 'Vendor Name:',
        render: (vendorDetails) => `${vendorDetails?.vendorName}` || 'NA',
    },
    {
        label: 'Vendor Status:',
        render: (vendorDetails) => `${vendorDetails?.status}` || 'NA',
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
        render: (vendorDetails) => `${vendorDetails?.address?.city}` || 'NA',
    },
    {
        label: 'State:',
        render: (vendorDetails) => `${vendorDetails?.address?.state}` || 'NA',
    },
    {
        label: 'Country:',
        render: (vendorDetails) => `${vendorDetails?.address?.country}` || 'NA',
    },
    {
        label: 'Pincode:',
        render: (vendorDetails) => `${vendorDetails?.address?.pinCode}` || 'NA',
    },
]

const bankDetailField = [
    {
        label: 'Acount Holder Name:',
        render: (vendorDetails) =>
            vendorDetails?.bankDetail?.accountHolderName || 'NA',
    },
    {
        label: 'Account Number:',
        render: (vendorDetails) =>
            vendorDetails?.bankDetail?.accountNumber || 'NA',
    },
    {
        label: 'Bank Name:',
        render: (vendorDetails) => vendorDetails?.bankDetail?.bankName || 'NA',
    },
    {
        label: 'IFSC Code:',
        render: (vendorDetails) => vendorDetails?.bankDetail?.ifscCode || 'NA',
    },
    {
        label: 'Branch Name:',
        render: (vendorDetails) => vendorDetails?.bankDetail?.branch || 'NA',
    },
]
const spocDetailField = [
    {
        label: 'Name:',
        render: (vendorDetails) => vendorDetails?.spocDetail?.name || 'NA',
    },
    {
        label: 'Designation:',
        render: (vendorDetails) =>
            vendorDetails?.spocDetail?.designation || 'NA',
    },
    {
        label: 'Email:',
        render: (vendorDetails) => vendorDetails?.spocDetail?.email || 'NA',
    },
    {
        label: 'Mobile:',
        render: (vendorDetails) => vendorDetails?.spocDetail?.mobile || 'NA',
    },
]
const statsDetailField = [
    {
        label: 'Total Jobs',
        render: (vendorStats) => vendorStats?.totalJobs,
        icon: 'work',
    },
    {
        label: 'Completed Jobs',
        render: (vendorStats) => vendorStats?.totalCompletedJobs,
        icon: 'work_history',
    },
    {
        label: 'Ongoing Jobs',
        render: (vendorStats) => vendorStats?.totalInprogressJobs,
        icon: 'work',
    },

    {
        label: 'Cancelled Jobs',
        render: (vendorStats) => vendorStats?.totalCancelJobs,
        icon: 'work_off',
    },
    {
        label: 'Total Earned',
        render: (vendorStats) => vendorStats?.totalMoneyEarned,
        icon: 'monetization_on',
    },
    {
        label: 'Payment Received',
        render: (vendorStats) => vendorStats?.amountPaid,
        icon: 'monetization_on',
    },
    {
        label: 'Payment Pending',
        render: (vendorStats) => vendorStats?.totalDisputes,
        icon: 'monetization_on',
    },
    {
        label: 'Disputes',
        render: (vendorStats) => vendorStats?.totalDisputes,
        icon: 'record_voice_over',
    },
]
const VendorDetails = () => {
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
    const { id } = useParams()
    const dispatch = useDispatch()
    const anchorRef = useRef(null)

    const [isActionPopupOpen, setActionPopupOpen] = useState(false)
    const [isActivatePopupOpen, setIsActivatePopupOpen] = useState(false)
    const [isDeActivatePopupOpen, setIsDeActivatePopupOpen] = useState(false)
    const [selectedProfileImage, setSelectedProfileImage] = useState(null)
    const [selectedPortfolioFile, setSelectedPortfolioFile] = useState(null)
    const hiddenImageInput = useRef(null)
    const poftfolioInput = useRef(null)
    const typeOfUser = localStorage.getItem('typeOfUser')
    const { vendorDetails, loading, showVendorDetailsPopup, vendorStats } =
        useSelector((state) => state.vendorManagement)
    const { skillCategory, status, workDetails, vendorRefNo, portfolioUrl } =
        vendorDetails

    useEffect(() => {
        dispatch({
            type: 'getVendorDetailsAction',
            payload: id,
        })
    }, [])
    useEffect(() => {
        dispatch({
            type: 'getVendorStatsAction',
            payload: {
                vendorId: id,
            },
        })
    }, [])
    const vendorActions = [
        {
            label:
                status === 'ACTIVE' ? 'Deactivate Vendor' : 'Activate Vendor',
            onClick: () =>
                status === 'ACTIVE'
                    ? setIsDeActivatePopupOpen(true)
                    : setIsActivatePopupOpen(true),
            disabled: false,
        },
        {
            label: 'Info',
            onClick: () => handleInfoClick(),
            disabled: false,
        },
    ]
    const handleEditClick = () => {
        const pathname = `/vendor/vendorEdit/${id}`
        history.push({
            pathname: pathname,
        })
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

    const handleActivateVendor = async () => {
        try {
            const res = await activateVendorService(id)
            dispatch(SNACKBAR_SUCCESS(res.message))
            if (res.message) {
                setIsActivatePopupOpen(false)
                dispatch({
                    type: 'getVendorDetailsAction',
                    payload: id,
                })
            }
        } catch (error) {
            dispatch(SNACKBAR_ERROR(error.message))
            setIsActivatePopupOpen(false)
        }
    }
    const handleDeactivateVendor = async () => {
        try {
            const res = await deActivateVendorService(id)
            if (res.message) {
                dispatch(SNACKBAR_SUCCESS(res.message))
                setIsDeActivatePopupOpen(false)
                dispatch({
                    type: 'getVendorDetailsAction',
                    payload: id,
                })
            }
        } catch (error) {
            dispatch(SNACKBAR_ERROR(error.message))
            setIsDeActivatePopupOpen(false)
        }
    }
    const handleInfoClick = () => {
        dispatch({ type: 'getVendorCredentialAction', payload: { id } })
        dispatch({ type: setShowVendorDetailsPopup.type, payload: true })
        setActionPopupOpen(!isActionPopupOpen)
    }

    const onUploadImageClick = (event) => {
        hiddenImageInput.current.click()
    }
    const onPortfolioIconClick = (event) => {
        poftfolioInput.current.click()
    }
    const handleProfileImage = (event) => {
        const selectedImage = event.target.files[0]
        setSelectedProfileImage(selectedImage)
        handleProfileImageValidation(selectedImage)
    }
    const handleProfileImageValidation = (selectedImage) => {
        var filePath = selectedImage.name
        var allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i

        if (!allowedExtensions.exec(filePath)) {
            dispatch(
                SNACKBAR_ERROR('Invalid file type please upload JPG,JPEG,PNG')
            )
            setSelectedProfileImage(null)
            return false
        } else {
            handleProfileImageService(selectedImage)
        }
    }

    const handleProfileImageService = async (selectedImage) => {
        try {
            const formData = new FormData()
            formData.append('image', selectedImage, selectedImage.name)
            const res = await uploadVendorLogoService({
                id,
                vendorRefNo,
                formData,
            })
            if (!res.error) {
                dispatch(SNACKBAR_SUCCESS(res.message))
                dispatch({
                    type: 'getVendorDetailsAction',
                    payload: id,
                })
            }
        } catch (error) {
            dispatch(SNACKBAR_ERROR(error.message))
        }
    }

    const handlePortfolioFile = async (event) => {
        const selectedFile = event.target.files[0]
        setSelectedPortfolioFile(selectedFile)

        handlePortfolioFileValidation(selectedFile)
    }
    const handlePortfolioFileValidation = (selectedFile) => {
        var filePath = selectedFile.name
        var allowedExtensions = /(\.pdf|\.ppt)$/i

        if (!allowedExtensions.exec(filePath)) {
            dispatch(SNACKBAR_ERROR('Invalid file type please upload PDF,PPT'))
            return false
        } else {
            handlePortfolioFileService(selectedFile)
        }
    }
    const handlePortfolioFileService = async (selectedFile) => {
        try {
            const formData = new FormData()
            formData.append('portfolio', selectedFile, selectedFile.name)
            const res = await uploadVendorPortfolioService({
                id,
                vendorRefNo,
                formData,
            })
            if (!res.error) {
                dispatch(SNACKBAR_SUCCESS(res.message))
                dispatch({
                    type: 'getVendorDetailsAction',
                    payload: id,
                })
            }
        } catch (error) {
            dispatch(SNACKBAR_ERROR(error.message))
        }
    }
    let vendorDetailsLength = Object.keys(vendorDetails).length
    if (loading) {
        return <Loading />
    }
    if (!vendorDetailsLength) {
        return <Loading />
    }
    return (
        <>
            <V5GlobalHeaderActionList
                backIcon
                title={'Vendor Details'}
                iconsList={[
                    {
                        iconType: 'edit_pencil',
                        tooltipTitle: 'Edit Vendor',
                        areaLabel: 'edit vendor',
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
                <VendorCredentialSideDrawer
                    showVendorDetailsPopup={showVendorDetailsPopup}
                />
                <ActionsPopup
                    width={200}
                    open={isActionPopupOpen}
                    onClose={() => handleActionPopup()}
                    anchorEl={anchorRef.current}
                >
                    <ClickAwayListener onClickAway={() => handleActionPopup()}>
                        <div className={`${classes.popOverMenu}`}>
                            <div className={classes.tablePopupContainer}>
                                {vendorActions.map((ja, i) => {
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
                description={'Are you sure you want to activate this vendor'}
                buttonTitle1={'Yes'}
                buttonTitle2={'No'}
                handleActionModalClose={() =>
                    handleActionModalClose('activate')
                }
                handleButtonAction1={handleActivateVendor}
                handleButtonAction2={() => handleActionModalClose('activate')}
            />
            <ActionsModal
                actionModalOpen={isDeActivatePopupOpen}
                description={'Are you sure you want to deactivate this vendor'}
                buttonTitle1={'Yes'}
                buttonTitle2={'No'}
                handleActionModalClose={() =>
                    handleActionModalClose('deactivate')
                }
                handleButtonAction1={handleDeactivateVendor}
                handleButtonAction2={() => handleActionModalClose('deactivate')}
            />

            <BackgroundCard title={'Basic Details'}>
                <input
                    type="file"
                    accept=".png, .jpg, .jpeg"
                    alt="img"
                    onChange={handleProfileImage}
                    ref={hiddenImageInput}
                    style={{ display: 'none' }}
                />

                <ProfileHeader
                    basicDetailField={basicDetailField}
                    cardDetails={vendorDetails}
                    buttonText="Upload Image"
                    handleButton={onUploadImageClick}
                    showButton
                    showImage
                />
            </BackgroundCard>
            <StatsCard data={statsDetailField} cardDetails={vendorStats} />
            <BackgroundCard title={'Bank Details'}>
                <DetailCard
                    data={bankDetailField}
                    cardDetails={vendorDetails}
                />
            </BackgroundCard>
            <BackgroundCard title={'SPOC Details'}>
                <DetailCard
                    data={spocDetailField}
                    cardDetails={vendorDetails}
                />
            </BackgroundCard>
            <BackgroundCard title={'Technologies'}>
                <RenderSkills skillCategories={skillCategory} />
            </BackgroundCard>
            <BackgroundCard
                title={'Work Highlights'}
                link
                linkText="View Portfolio"
                linkUrl={portfolioUrl ? config.imageBaseUrl + portfolioUrl : ''}
                icon
                iconText={'Upload Portfolio'}
                iconClick={onPortfolioIconClick}
            >
                <input
                    type="file"
                    accept=".pdf,.ppt"
                    onChange={handlePortfolioFile}
                    ref={poftfolioInput}
                    style={{ display: 'none' }}
                />
                <Typography variant="p">{workDetails ? workDetails : `Work Highlights Not Available`} </Typography>
            </BackgroundCard>
        </>
    )
}

export default VendorDetails
