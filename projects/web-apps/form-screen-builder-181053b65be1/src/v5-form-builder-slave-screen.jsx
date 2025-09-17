import { Grid, Box, Modal, Button, Avatar } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import DesktopMacIcon from '@material-ui/icons/DesktopMac'
import TabletMacIcon from '@material-ui/icons/TabletMac'
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid'
import { makeStyles } from '@material-ui/core/styles'
import React, { useState } from 'react'
import MaterialFormGenerator from './materialForm'

const useStyles = makeStyles(({ palette, ...theme }) => ({
  logoClient: {
    //objectFit: 'contain',
    width: 'auto',
    height: '24px',
  },
  arrowIcon: {
    color: '#bbb',
    fontSize: '1.3rem',
  },
  editIcon: {
    color: '#9F9F9E',
    cursor: 'pointer',
  },
}))
const deviceViewsEnum = {
  MOBILE: 'mobile',
  TABLET: 'tablet',
  DESKTOP: 'desktop',
}
function V5FormBuilderSlaveScreen(props) {
  const {
    open,
    handlePopUpClose,
    handleTitleText,
    downloadPath,
    answerData,
    actionName,
    formAction,
    formMethod,
    hideActions,
    skipValidations,
    onSubmit,
    isFormReadOnly,
    isBootstrapItems,
    imageUploadCallback,
    data,
    workFlowData,
    fieldResult,
    fieldMedia,
    generateBtnLabel,
    collectFormData,
    getGeneratedJSON,
    photoPreview,
    closePreview,
    clientLogo,
    ScreenSkeletonComponent,
    internalScreensChecked,
    masterScreensWorkflowData,
    screenTitle
  } = props
  const classes = useStyles()
  const [pageTitle, setPageTitle] = useState('')
  const [currentSelectedView, setCurrentSelectedView] = useState(
    deviceViewsEnum.MOBILE,
  )
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    //width: 300,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    border: 'none !important',
    borderRadius: '2px',
    width: `${currentSelectedView === deviceViewsEnum.MOBILE
        ? '360px'
        : currentSelectedView === deviceViewsEnum.TABLET
          ? '768px'
          : '992px'
      }`,
  }
  const closePopUp = () => {
    if (open) {
      handlePopUpClose(true)
    }
  }
  const changePageTitle = (e) => {
    setPageTitle(e.target.value)
  }
  const handlePageTitle = (e) => {
    handleTitleText(pageTitle)
    if (open) {
      handlePopUpClose(true)
    }
  }
  const handleDeviceView = (e, deviceView) => {
    setCurrentSelectedView(deviceView)
  }
  return (
    <div>
      {/* <Box sx={style}> */}
      <div
        className="v5-form-builder-preview"
        style={{ maxHeight: '345px', height: '327px' }}
      >
        <Grid
          container
          justifyContent="space-between"
          style={{ color: '#bbb', padding: '0 9px', marginTop: '10px' }}
        >
          <Grid item>
            <MenuIcon color="#fff" style={{ marginRight: '5px' }} />
            <img
              className={`${classes.logoClient}`}
              src={clientLogo}
              alt="Logo"
            //style={{ marginRight: '10px' }}
            />
          </Grid>
          <Grid item>
            <Avatar
              className="cursor-pointer float-right"
              src={'/assets/images/face-6.jpg'}
              style={{ width: '30px', height: '30px' }}
            />
          </Grid>
        </Grid>
        <div class="hrcover ">
          <hr class="mt-1 mb-0" />
        </div>
        <div style={{ padding: '0 9px', backgroundColor: '#F7F6FC' }}>
          <Grid className="flex items-center">
            <ArrowBackIcon
              className={`mr-3 ${classes.arrowIcon}`}
              style={{ marginLeft: '-4px' }}
              onClick={closePopUp}
            />
            <h5 className="mt-3 mr-3">{screenTitle}</h5>
          </Grid>
          {data && data.length > 0 ? (
            <>
            <MaterialFormGenerator
              download_path={downloadPath}
              disabled={true}
              // back_action="/"
              // back_name="Back"
              answer_data={answerData}
              action_name={actionName}
              form_action={formAction}
              form_method={formMethod}
              hide_actions={hideActions}
              skip_validations={skipValidations}
              onSubmit={onSubmit}
              isFormReadOnly={isFormReadOnly}
              isBootstrapItems={isBootstrapItems}
              imageUploadCallback={imageUploadCallback}
              // variables={this.props.variables}
              data={data}
              workFlowData={workFlowData}
              fieldResult={fieldResult}
              fieldMedia={fieldMedia}
              generateBtnLabel={generateBtnLabel}
              collectFormData={collectFormData}
              getGeneratedJSON={getGeneratedJSON}
              photoPreview={photoPreview}
              closePreview={closePreview}
              isFromMastersScreen={true}
                internalScreensChecked={internalScreensChecked}
                masterScreensWorkflowData={masterScreensWorkflowData}
            />
              {/* {
                masterScreensWorkflowData.map((data, index) => {
                  console.log(index !== (masterScreensWorkflowData.length - 1) && internalScreensChecked, index === (masterScreensWorkflowData.length - 1) && internalScreensChecked)
                  console.log(index, masterScreensWorkflowData.length - 1, internalScreensChecked)
                  if (index !== (masterScreensWorkflowData.length - 1) && internalScreensChecked) {
                    return <Button>NEXT</Button>
                  } else if (index === (masterScreensWorkflowData.length - 1) && internalScreensChecked) {
                    return <Button>APPROVE</Button>
                  }
                })
              } */}
            </>

          ) : (
            <>
              <ScreenSkeletonComponent />
            </>
          )}
        </div>
      </div>
      {/* <hr style={{ marginLeft: "-23px", marginRight: "-23px" }} />
                <Grid container justifyContent="space-between" className="mt-10" style={{ padding: "10px 24px" }}>
                    <Grid item spacing={2}>
                        <DesktopMacIcon
                            onClick={(e) => handleDeviceView(e, deviceViewsEnum.DESKTOP)}
                            className="cursor-pointer"
                            style={{
                                marginRight: '10px',
                                color: `${currentSelectedView === deviceViewsEnum.DESKTOP ? '#2a4fbc' : '#bbb'}`
                            }} />
                        <TabletMacIcon
                            onClick={(e) => handleDeviceView(e, deviceViewsEnum.TABLET)}
                            className="cursor-pointer"
                            style={{
                                marginRight: '10px',
                                color: `${currentSelectedView === deviceViewsEnum.TABLET ? '#2a4fbc' : '#bbb'}`
                            }} />
                        <PhoneAndroidIcon
                            onClick={(e) => handleDeviceView(e, deviceViewsEnum.MOBILE)}
                            className="cursor-pointer"
                            style={{
                                marginRight: '10px',
                                color: `${currentSelectedView === deviceViewsEnum.MOBILE ? '#2a4fbc' : '#bbb'}`
                            }} />
                    </Grid>
                    <Grid item>
                        <Button variant="contained" color="primary" onClick={closePopUp}>CLOSE</Button>
                    </Grid>
                </Grid> */}
      {/* <div className="flex items-center mt-10 float-right "> */}
      {/* <Button className="mr-5" variant="text" onClick={closePopUp}>Cancel</Button> */}
      {/* <Button variant="contained" color="primary" onClick={closePopUp}>CLOSE</Button> */}
      {/* </div> */}
      {/* </Box> */}
    </div>
  )
}

export default V5FormBuilderSlaveScreen
