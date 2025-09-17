import React, { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import {
    Button,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { V5GlobalHeaderActionList } from 'app/components'
import BackgroundCard from '../JobManagement/components/BackgroundCard'
import DetailCard from '../../components/DetailsCard/DetailsCard'
import ProfileHeader from '../../components/ProfileHeader/ProfileHeader'
import Loading from 'app/components/V5GlobalLoading/V5GlobalLoading'
import history from 'helper/history.js'
import RenderRoles from './components/RenderRoles'
import globalConstants from 'helper/constants.js'

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



const UserDetails = () => {
    const basicDetailField = [
        {
            label: 'First Name:',
            render: (userBasicDetails) => `${userBasicDetails?.firstName !== null && userBasicDetails?.firstName !== undefined && userBasicDetails?.firstName !== "" ? userBasicDetails?.firstName : 'NA'}`,
        },
        {
            label: 'Last Name:',
            render: (userBasicDetails) => `${userBasicDetails?.lastName !== null && userBasicDetails?.lastName !== undefined && userBasicDetails?.lastName !== "" ? userBasicDetails?.lastName : 'NA'}`,

        },
        {
            label: 'Email:',
            render: (userBasicDetails) => `${userBasicDetails?.personalEmail !== null && userBasicDetails?.personalEmail !== undefined && userBasicDetails?.personalEmail !== "" ? userBasicDetails?.personalEmail : 'NA'}`,

        },
        {
            label: 'Mobile No:',
            render: (userBasicDetails) => `${userBasicDetails?.contactNumber !== null && userBasicDetails?.contactNumber !== undefined && userBasicDetails?.contactNumber !== "" ? userBasicDetails?.contactNumber : 'NA'}`,

        },
        {
            label: 'Gender:',
            render: (userBasicDetails) => `${userBasicDetails?.gender !== null && userBasicDetails?.gender !== undefined && userBasicDetails?.gender !== "" ? globalConstants.genderType[userBasicDetails?.gender] : 'NA'}`,

        },
        {
            label: 'DOB:',
            render: (userBasicDetails) => `${userBasicDetails?.dob !== null && userBasicDetails?.dob !== undefined && userBasicDetails?.dob !== "" ? userBasicDetails?.dob : 'NA'}`,


        },
        {
            label: 'Aadhar No:',
            render: (userBasicDetails) => `${userBasicDetails?.aadharNumber !== null && userBasicDetails?.aadharNumber !== undefined && userBasicDetails?.aadharNumber !== "" ? userBasicDetails?.aadharNumber : 'NA'}`,

        },
        {
            label: 'Pan No:',
            render: (userBasicDetails) => `${userBasicDetails?.pan !== null && userBasicDetails?.pan !== undefined && userBasicDetails?.pan !== "" ? userBasicDetails?.pan : 'NA'}`,
        },

    ]

    const addressDetailField = [
        {
            label: 'Address:',
            render: (userBasicDetails) => `${userBasicDetails?.address !== null && userBasicDetails?.address !== undefined && userBasicDetails?.address !== "" ? userBasicDetails?.address : 'NA'}`,

        },
        {
            label: 'City:',
            render: (userBasicDetails) => `${userBasicDetails?.city !== null && userBasicDetails?.city !== undefined && userBasicDetails?.city !== "" ? userBasicDetails?.city : 'NA'}`,

        },
        {
            label: 'State:',
            render: (userBasicDetails) => `${userBasicDetails?.state !== null && userBasicDetails?.state !== undefined && userBasicDetails?.state !== "" ? userBasicDetails?.state : 'NA'}`,

        },
        {
            label: 'Country:',
            render: (userBasicDetails) => `${userBasicDetails?.country !== null && userBasicDetails?.country !== undefined && userBasicDetails?.country !== "" ? userBasicDetails?.country : 'NA'}`,

        },
        {
            label: 'Area:',
            render: (userBasicDetails) => `${userBasicDetails?.area !== null && userBasicDetails?.area !== undefined && userBasicDetails?.area !== "" ? userBasicDetails?.area : 'NA'}`,

        },
        {
            label: 'Pincode:',
            render: (userBasicDetails) => `${userBasicDetails?.pinCode !== null && userBasicDetails?.pinCode !== undefined && userBasicDetails?.pinCode !== "" ? userBasicDetails?.pinCode : 'NA'}`,

        },
    ]

    const employmentDetailField = [
        {
            label: 'Emplyee ID:',
            render: (userEmploymentDetails) => `${userEmploymentDetails?.employeeId !== null && userEmploymentDetails?.employeeId !== undefined && userEmploymentDetails?.employeeId !== "" ? userEmploymentDetails?.employeeId : 'NA'}`,

        },
        {
            label: 'Joining Date:',
            render: (userEmploymentDetails) => `${userEmploymentDetails?.joiningDate !== null && userEmploymentDetails?.joiningDate !== undefined && userEmploymentDetails?.joiningDate !== "" ? userEmploymentDetails?.joiningDate : 'NA'}`,

        },
        {
            label: 'Email:',
            render: (userEmploymentDetails) => `${userEmploymentDetails?.email !== null && userEmploymentDetails?.email !== undefined && userEmploymentDetails?.email !== "" ? userEmploymentDetails?.email : 'NA'}`,

        },
        {
            label: 'Type Of Employement:',
            render: (userEmploymentDetails) => `${userEmploymentDetails?.typeOfEmployment !== null && userEmploymentDetails?.typeOfEmployment !== undefined && userEmploymentDetails?.typeOfEmployment !== "" ? userEmploymentDetails?.typeOfEmployment : 'NA'}`,

        },

        {
            label: 'Status:',
            render: (userEmploymentDetails) => {
                return (
                    <Button
                        variant="outlined"
                        className={`${userEmploymentDetails.status ===
                            'ACTIVE'
                            ? classes.activeBtn
                            : userEmploymentDetails.status ===
                                'INACTIVE'
                                ? classes.inActiveBtn
                                : null
                            }`}
                    >
                        {userEmploymentDetails?.status ||
                            'NA'}
                    </Button>
                )
            },
        },
    ]


    const reportingManagerDetailField = [
        {
            label: 'Employee ID:',
            render: (userEmploymentDetails) => `${userEmploymentDetails?.reportingManager?.employeeId !== null && userEmploymentDetails?.reportingManager?.employeeId !== undefined && userEmploymentDetails?.reportingManager?.employeeId !== "" ? userEmploymentDetails?.reportingManager?.employeeId : 'NA'}`,

        },
        {
            label: 'Employee Name:',

            render: (userEmploymentDetails) => `${userEmploymentDetails?.reportingManager?.name !== null && userEmploymentDetails?.reportingManager?.employeeId !== undefined && userEmploymentDetails?.reportingManager?.employeeId !== "" ? userEmploymentDetails?.reportingManager?.name : 'NA'}`,

        },

    ]

    const referralDetailField = [
        {
            label: 'Employee ID:',
            render: (userEmploymentDetails) => `${userEmploymentDetails?.referral?.employeeId !== null && userEmploymentDetails?.referral?.employeeId !== undefined && userEmploymentDetails?.referral?.employeeId !== "" ? userEmploymentDetails?.referral?.employeeId : 'NA'}`,

        },
        {
            label: 'Employee Name:',
            render: (userEmploymentDetails) => `${userEmploymentDetails?.referral?.name !== null && userEmploymentDetails?.referral?.employeeId !== undefined && userEmploymentDetails?.referral?.employeeId !== "" ? userEmploymentDetails?.referral?.name : 'NA'}`,
        },

    ]

    const bankDetailField = [
        {
            label: 'Bank Name:',

            render: (userBankDetails) => `${userBankDetails.bankName !== null && userBankDetails.bankName !== undefined && userBankDetails.bankName !== "" ? userBankDetails.bankName : 'NA'}`,

        },
        {
            label: 'Branch Name:',

            render: (userBankDetails) => `${userBankDetails.branchName !== null && userBankDetails.bankName !== undefined && userBankDetails.bankName !== "" ? userBankDetails.branchName : 'NA'}`,

        },
        {
            label: 'Account Number:',
            render: (userBankDetails) => `${userBankDetails.accountNumber !== null && userBankDetails.bankName !== undefined && userBankDetails.bankName !== "" ? userBankDetails.accountNumber : 'NA'}`,
        },
        {
            label: 'Ifsc Code:',
            render: (userBankDetails) => `${userBankDetails.ifscCode !== null && userBankDetails.bankName !== undefined && userBankDetails.bankName !== "" ? userBankDetails.ifscCode : 'NA'}`,
        },
    ]

    const mappedLocationsField = [
        {
            label: 'Site ID:',
            render: (mappedLocations) =>
                `${mappedLocations.siteId !== null && mappedLocations.siteId !== undefined && mappedLocations.siteId !== "" ? mappedLocations.siteId : 'NA'}`
        },
        {
            label: 'Address:',
            render: (mappedLocations) =>
                `${mappedLocations.address !== null && mappedLocations.address !== undefined && mappedLocations.address !== "" ? mappedLocations.address : 'NA'}`

        },
        {
            label: 'Dates:',
            render: (mappedLocations) =>
                `${mappedLocations.dates !== null && mappedLocations.dates !== undefined && mappedLocations.dates.length ? mappedLocations.dates : 'NA'}`


        },
        {
            label: 'Days:',
            render: (mappedLocations) =>
                `${mappedLocations.days !== null && mappedLocations.days !== undefined && mappedLocations.days.length ? mappedLocations.days : 'NA'}`

        },
        {
            label: 'Status:',
            render: (mappedLocations) => {
                return (
                    <Button
                        variant="outlined"
                        className={`${mappedLocations.status ===
                                'ACTIVE'
                                ? classes.activeBtn
                                : mappedLocations.status ===
                                    'INACTIVE'
                                    ? classes.inActiveBtn
                                    : null
                            }`}
                    >
                        {mappedLocations?.status ||
                            'NA'}
                    </Button>
                )
            },
        },
    ]
    const classes = useStyles();
    const dispatch = useDispatch();
    const { id } = useParams()
    const {
        userBasicDetails,
        userEmploymentDetails,
        mappedLocations,
        userBankDetails, clientIdForUsers,
        loading
    } = useSelector((state) => state.users);
 
    const handleEditClick = () => {
        history.push(`/user/edit?clientId=${clientIdForUsers}&id=${id}`);

    }
    useEffect(() => {
        dispatch({
            type: 'getUserBasicDetailsByIdAction',
            payload: { id },
        });

        dispatch({
            type: 'getUserBankDetailsByIdAction',
            payload: { id },
        });

        dispatch({
            type: 'getUserEmployeeDetailsByIdAction',
            payload: { id },
        });

        dispatch({
            type: 'getUserLocationDetailsByIdAction',
            payload: { id }
        });
    }, [])
    if (
        !userBasicDetails ||
        !userEmploymentDetails ||
        !mappedLocations || !userBankDetails || loading

    ) {
        return <Loading />
    }

    return (
        <>
            <V5GlobalHeaderActionList
                backIcon
                title={'User Details'}
                iconsList={[
                    {
                        iconType: 'edit_pencil',
                        tooltipTitle: 'Edit User',
                        areaLabel: 'edit user',
                        iconComponent: 'span',
                        iconClickHandler: handleEditClick,
                    },

                ]}
            />

            <BackgroundCard title={'Basic Details'}>
                <ProfileHeader
                    basicDetailField={basicDetailField}
                    cardDetails={userBasicDetails}
                    buttonText="Upload Image"
                />
            </BackgroundCard>
            <BackgroundCard title={'Address Details'}>
                <DetailCard
                    data={addressDetailField}
                    cardDetails={userBasicDetails}
                />
            </BackgroundCard>
            <BackgroundCard title={'Employement Details'}>
                <DetailCard
                    data={employmentDetailField}
                    cardDetails={userEmploymentDetails}
                />
                <RenderRoles roleCategories={userEmploymentDetails.roles} />

            </BackgroundCard>
            <BackgroundCard title={'Reporting Manager Details'}>
                <DetailCard
                    data={reportingManagerDetailField}
                    cardDetails={userEmploymentDetails}

                />
                <RenderRoles roleCategories={userEmploymentDetails.reportingManager.roles} />
            </BackgroundCard>
            <BackgroundCard title={'Referral Details'}>
                <DetailCard
                    data={referralDetailField}
                    cardDetails={userEmploymentDetails}
                />
                <RenderRoles roleCategories={userEmploymentDetails.referral.roles} />
            </BackgroundCard>
            <BackgroundCard title={'Bank Details'}>
                <DetailCard
                    data={bankDetailField}
                    cardDetails={userBankDetails}
                />
            </BackgroundCard>
            <BackgroundCard title={'Mapped Location Details'}>
                {mappedLocations.map((mappedLocation) => {
                    return (
                        <div
                            style={{ borderBottom: '1px solid  #cccccc' }}
                            className="pb-3 pt-3"
                        >
                            <DetailCard
                                data={mappedLocationsField}
                                cardDetails={mappedLocation}
                            />
                        </div>
                    )
                })}
            </BackgroundCard>
        </>
    )

}

export default UserDetails
