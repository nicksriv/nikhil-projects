import { Grid, Icon } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ProfileHeader from './components/ProfileHeader';
import UserDetails from './components/UserDetails';
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  bgcolor:{
  backgroundColor:"#F6F8FA"
  },
  text:{
    fontSize: "36px !important",
    lineHeight: "43px",
    letterSpacing: "0.72px",
    paddingLeft:"22px"
}

}))

function UserProfile(props) {
  const [pageMode, setPageMode] = React.useState('view');
  const [profileImage, setProfileImage] = React.useState('')
  const [logo, setLogo] = React.useState("");
  const history = useHistory();
  const dispatch = useDispatch();
  const { userProfileDetails } = useSelector((state) => state.profile);
  const { userProfileImageId } = useSelector((state) => state.auth);
  const classes = useStyles();

  useEffect(() => {
    dispatch({
      type: "getUserProfileDetailsAction"
    });
    dispatch({
      type: "getStatesCitiesMasterAction"
    });
    dispatch({
      type: "getUserProfileLogoAction",
      payload: userProfileImageId
    });
  }, [dispatch]);

  const handleClick = (pageMode) => {
    setPageMode(pageMode);
    dispatch({
      type: "getUserProfileLogoAction",
      payload: userProfileImageId 
    });
    dispatch({
      type: "getUserProfileDetailsAction" 
    });
  }

  const handleCancel = () => {
    setPageMode('view');
    setLogo("");
    dispatch({
      type: "getUserProfileLogoAction",
      payload: userProfileImageId
    });
    dispatch({
      type: "getUserProfileDetailsAction" 
    });
  }

  const handleArrow = () => {
    history.push('/dashboard');
  }
  const imageState = (image) => {
    setLogo(URL.createObjectURL(image));
  }

  const handleImageState = (image) => {
    setProfileImage(image);
  }

  return (
    <div className={classes.bgcolor}>
      <Grid container justifyContent="space-between">
        <Grid item>
      <h2 className='pl-5'>
        <img onClick={handleArrow} className='pr-2' src={"/assets/images/icons/backArrow.svg"} alt="backArrow" />
        My Profile
      </h2>
      </Grid>
      {pageMode === 'view' &&
      <Grid item className='mr-3 cursor-pointer'>
        <Icon style={{ justifySelf:'center'}} onClick={()=>{handleClick('edit')}}>
        <img src={'/assets/images/icons/edit.svg'} alt="edit" />
      </Icon>
      </Grid>
      }
      </Grid>
      <ProfileHeader 
        pageMode={pageMode} 
        handleImageState={handleImageState} 
        logo={logo} 
        imageState={imageState} 
      />
      <UserDetails 
        pageMode={pageMode} 
        formValues={userProfileDetails}
        handleCancel={handleCancel}  
        profileImage={profileImage} 
      />
      </div>
  )
}

export default UserProfile;