import { Grid } from '@material-ui/core'
import DetailsCard from 'app/components/DetailsCard/DetailsCard'
import BackgroundCard from 'app/views/JobManagement/components/BackgroundCard'
import React from 'react'

const Configurations = (props) => {

    const {handleEditIconClick,sourceFeilds,sourceData,reportTableHeaderFeilds,reportTableHeaderData} = props

    return (
        <>
            <Grid
                container
                spacing={2}
                alignItems="center"
                justifyContent="space-between"
                className="flex items-center pt-2"
            >
                <BackgroundCard
                    title={'Source'}
                    editIcon={true}
                    handleEditIconClick={handleEditIconClick}
                    titleStyle={{ fontSize: '18px' }}
                    containerStyle={{ width: '100%' }}
                >
                    <DetailsCard data={sourceFeilds} cardDetails={sourceData} />
                </BackgroundCard>
            </Grid>

            {/* <Grid
                container
                spacing={2}
                alignItems="center"
                justifyContent="space-between"
                className="flex items-center pt-2"
                width
            >
                <BackgroundCard
                    title={'Report Table Headers'}
                    titleStyle={{ fontSize: '18px' }}
                    containerStyle={{ width: '100%' }}
                >
                    <DetailsCard
                        data={reportTableHeaderFeilds}
                        cardDetails={reportTableHeaderData}
                    />
                </BackgroundCard>
            </Grid> */}
        </>
    )
}

export default Configurations
