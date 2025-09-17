import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DetailsDailogue } from 'app/components'
import { setShowQualityAssuranceDetailsPopup } from 'app/redux/QualityAssuranceManagement/QualityAssuranceManagementSlice'

const QualityAssuranceCredentialSideDrawer = ({ showQualityAssuranceDetailsPopup }) => {
    const dispatch = useDispatch()
    const [showPassword, setShowPassword] = useState(false)
    const [formattedCredentialDetails, setFormattedCredentialDetails] =
        useState({})
    const { qualityAssuranceCredential } = useSelector((state) => state.qualityAssuranceManagement)
    useEffect(() => {
        const credObj = {
            'Joining Date': qualityAssuranceCredential.joiningDate,
            'QA Ref No': qualityAssuranceCredential.qualityAssuranceName,
            Password: qualityAssuranceCredential.password,
        }
        setFormattedCredentialDetails(credObj)
    }, [qualityAssuranceCredential])

    const closeQualityAssuranceDetailsPopup = () => {
        dispatch({ type: setShowQualityAssuranceDetailsPopup.type, payload: false })
        // setShowPassword(false)
    }
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword)
    }
    const handleMouseDownPassword = (event) => {
        event.preventDefault()
    }
    const shareMail = () => {}
    return (
        <DetailsDailogue
            description="QA has been onboarded successfully. Below are the credentials."
            qualityAssuranceId={qualityAssuranceCredential?.qualityAssuranceId}
            isQualityAssurancePopup={true}
            shareMail={shareMail}
            filledBtnText="CHANGE PASSWORD"
            outlinedBtnText="  SHARE VIA MAIL"
            hasBtn={true}
            data={[formattedCredentialDetails]}
            open={showQualityAssuranceDetailsPopup}
            closeAction={closeQualityAssuranceDetailsPopup}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            handleClickShowPassword={handleClickShowPassword}
            handleMouseDownPassword={handleMouseDownPassword}
            handleChangePassword={() => alert('handle change password')}
            isChangePasswordBtnDisable={
                formattedCredentialDetails &&
                formattedCredentialDetails.Password
                    ? false
                    : true
            }
        />
    )
}

export default QualityAssuranceCredentialSideDrawer
