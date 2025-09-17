import React, { useState, useEffect } from 'react'
import { getUserProfilePhoto } from '../../../redux/Dashboard/dashboardService'
import { Avatar } from '@material-ui/core'
import { getShuffledData, modulesColorsArr } from 'helper/utils'

const UserAvatar = ({ user }) => {
    const [profilePic, setProfilePic] = useState('')
    useEffect(() => {
        if (user.profileid) {
            async function getUserProfilePic() {
                const blobResponse = await getUserProfilePhoto(user.profileid)
                setProfilePic(window.URL.createObjectURL(blobResponse))
            }
            getUserProfilePic()
        }
    }, [user])

    if (user.profileid) {
        return <Avatar src={profilePic} />
    }
    return (
        <Avatar
            style={{
                backgroundColor: getShuffledData(modulesColorsArr),
            }}
        >
            {user.name?.slice(0, 2).toUpperCase()}
        </Avatar>
    )
}
export default React.memo(UserAvatar)
