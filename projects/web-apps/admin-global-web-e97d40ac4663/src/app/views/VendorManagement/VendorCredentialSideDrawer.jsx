import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DetailsDailogue } from 'app/components'
import { setShowVendorDetailsPopup } from 'app/redux/VendorManagement/VendorManagementSlice'

const VendorCredentialSideDrawer = ({ showVendorDetailsPopup }) => {
    const dispatch = useDispatch()
    const [showPassword, setShowPassword] = useState(false)
    const [formattedCredentialDetails, setFormattedCredentialDetails] =
        useState({})
    const { vendorCredential } = useSelector((state) => state.vendorManagement)

    useEffect(() => {
        const credObj = {
            'Joining Date': vendorCredential.joiningDate,
            'Vendor RefNo': vendorCredential.vendorRefNo,
            Password: vendorCredential.password,
        }
        setFormattedCredentialDetails(credObj)
    }, [vendorCredential])

    const closeVendorDetailsPopup = () => {
        dispatch({ type: setShowVendorDetailsPopup.type, payload: false })
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
            description="Vendor has been onboarded successfully. Below credentials have been sent to your mail id."
            vendorId={vendorCredential?.vendorId}
            isVendorPopup={true}
            shareMail={shareMail}
            filledBtnText="CHANGE PASSWORD"
            outlinedBtnText="  SHARE VIA MAIL"
            hasBtn={true}
            data={[formattedCredentialDetails]}
            open={showVendorDetailsPopup}
            closeAction={closeVendorDetailsPopup}
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

export default VendorCredentialSideDrawer
