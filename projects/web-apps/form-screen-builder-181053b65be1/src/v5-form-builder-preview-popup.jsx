import { Grid, Box, Modal, Button, Avatar } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import DesktopMacIcon from '@material-ui/icons/DesktopMac'
import TabletMacIcon from '@material-ui/icons/TabletMac'
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid'
import { makeStyles } from '@material-ui/core/styles'
import React, { useState } from 'react'
import MaterialFormGenerator from './materialForm'
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone'

const useStyles = makeStyles(({ palette, ...theme }) => ({
  logoClient: {
    //objectFit: 'contain',
    width: 'auto',
    height: '24px',
  },
  arrowIcon: {
    color: '#626364',
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
function V5FormBuilderPreviewPopup(props) {
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
    fieldResult,
    fieldMedia,
    generateBtnLabel,
    collectFormData,
    getGeneratedJSON,
    photoPreview,
    closePreview,
    clientLogo,
    screenName,
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
    borderRadius: '4px',
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

    props.data.map((x,index)=>{
      if(x.customOptions.recordedVideo !== undefined ) {
        x.customOptions.recordedVideo = "";
      } 
    })
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
      <Modal
        open={open}
        onClose={closePopUp}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
      >
        <Box sx={style}>
          <div className="v5-form-builder-preview">
            <Grid
              container
              justifyContent="space-between"
              className="py-2 px-3"
            >
              <Grid item style={{ alignSelf: 'center', display: 'inline' }}>
                <MenuIcon
                  color="#00000099"
                  style={{ marginRight: '20px', fontSize: '28px' }}
                />

                {clientLogo ? (
                  <img
                    className={`${classes.logoClient}`}
                    src={clientLogo}
                    alt="Logo"
                  //style={{ marginRight: '10px' }}
                  />
                ) : null}
                <NotificationsNoneIcon
                  style={{ marginLeft: '10rem', opacity: '20%' }}
                  className="cursor-pointer p-0"
                  fontSize="small"
                />
              </Grid>

              <Grid item>
                <Avatar
                  className="cursor-pointer float-right"
                  src={'/assets/images/face-6.jpg'}
                />
              </Grid>
            </Grid>
            <div class="hrcover ">
              <hr style={{ margin: '0' }} />
            </div>
            <div style={{ padding: '0 14px', backgroundColor: '#F6F6FD' }}>
              <Grid className="flex items-center">
                <ArrowBackIcon
                  className={`${classes.arrowIcon}`}
                  onClick={closePopUp}
                />
                <h4 className="mt-3 mr-3 pl-4" style={{ fontWeight: 'normal' }}>
                  {screenName === "" ? `Check-In` : screenName}
                </h4>
              </Grid>
              <MaterialFormGenerator
                download_path={downloadPath}
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
                fieldResult={fieldResult}
                fieldMedia={fieldMedia}
                generateBtnLabel={generateBtnLabel}
                collectFormData={collectFormData}
                getGeneratedJSON={getGeneratedJSON}
                photoPreview={photoPreview}
                closePreview={closePreview}
              />
            </div>
          </div>
          <hr
            style={{ marginLeft: '-23px', marginRight: '-23px' }}
            className="my-0"
          />
          <Grid container justifyContent="space-between" className="py-3 px-1">
            <Grid item className="ml-3" style={{ alignSelf: 'center' }}>
              <DesktopMacIcon
                //onClick={(e) => handleDeviceView(e, deviceViewsEnum.DESKTOP)}
                className="cursor-pointer"
                style={{
                  marginRight: '10px',
                  color: `${currentSelectedView === deviceViewsEnum.DESKTOP
                    ? '#2C3E93'
                    : '#bbb'
                    }`,
                }}
              />
              <TabletMacIcon
                //onClick={(e) => handleDeviceView(e, deviceViewsEnum.TABLET)}
                className="cursor-pointer"
                style={{
                  marginRight: '10px',
                  color: `${currentSelectedView === deviceViewsEnum.TABLET
                    ? '#2C3E93'
                    : '#bbb'
                    }`,
                }}
              />
              <PhoneAndroidIcon
                onClick={(e) => handleDeviceView(e, deviceViewsEnum.MOBILE)}
                className="cursor-pointer"
                style={{
                  marginRight: '10px',
                  color: `${currentSelectedView === deviceViewsEnum.MOBILE
                    ? '#2C3E93'
                    : '#bbb'
                    }`,
                }}
              />
            </Grid>
            <Grid item className="mr-2">
              <Button variant="contained" color="primary" onClick={closePopUp}>
                CLOSE
              </Button>
            </Grid>
          </Grid>
          {/* <div className="flex items-center mt-10 float-right "> */}
          {/* <Button className="mr-5" variant="text" onClick={closePopUp}>Cancel</Button> */}
          {/* <Button variant="contained" color="primary" onClick={closePopUp}>CLOSE</Button> */}
          {/* </div> */}
        </Box>
      </Modal>
    </div>
  )
}

export default V5FormBuilderPreviewPopup
