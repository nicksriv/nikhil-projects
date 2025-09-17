import React from 'react'
import { Button, Grid } from '@material-ui/core'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import { Avatar } from '@material-ui/core'
import DetailCard from 'app/components/DetailsCard/DetailsCard'
import { config } from 'helper/config.js'

const ProfileHeader = ({
    basicDetailField,
    cardDetails,
    buttonText,
    handleButton,
    showButton,
    showImage
}) => {
    const { isProd } = config
    const ONBOARDING_API_ENDPOINT = isProd
        ? config.production.api_endpoint
        : config.development.api_endpoint
    const ONBOARDING_APIVERSION = 'api/v1'

    const { profileImage } = cardDetails
    let imageUrl = ''
    if (profileImage) {
        imageUrl = config.imageBaseUrl + profileImage
    }
    if (cardDetails.backgroundImageId) {
        imageUrl = `${ONBOARDING_API_ENDPOINT}${ONBOARDING_APIVERSION}/files/${cardDetails?.logoId}`
    }
    return (
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
                <DetailCard data={basicDetailField} cardDetails={cardDetails} />
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
                {
                    showImage ? imageUrl ? (
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
                                fontSize: '6.1875rem',
                                color: '#286090',
                            }}
                        />
                    )  : null
                }
                {showButton ? (
                    <Button
                        style={{
                            color: 'blue',
                            fontSize: 10,
                            maxWidth: '120px',
                            border: `1px solid #286090`,
                        }}
                        variant="outlined"
                        onClick={handleButton}
                    >
                        {buttonText}
                    </Button>
                ) : null} 
            </Grid>
        </Grid>
    )
}

export default ProfileHeader
