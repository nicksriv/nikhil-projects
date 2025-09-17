import React, { useEffect } from 'react';
import { Grid,  Box,  } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
// import CollectionsOutlinedIcon from '@material-ui/icons/CollectionsOutlined';

const useStyles = makeStyles(() => ({
    headerBackground: {
        backgroundColor: "linear-gradient(45deg,black,white)",
    },
    container: {
        backgroundColor: "white",
        borderRadius: 4,
        // margin: '1.5rem ',
        width: '100%',
        // border: '1px solid #DCDCDC',
        borderBottom: '1px solid #DCDCDC',
        borderRight: '1px solid #DCDCDC',
        borderLeft: '1px solid #DCDCDC',
        borderRadius: 8,
        height:'180px',
    },
    childContainer: {
        background: "transparent linear-gradient(271deg,#DDDFE4 0% ,#A7AEBB 100%) 0% 0% no-repeat padding-box",
        borderRadius: '8px 8px 0px 0px',
        opacity: 1,
        height:'90px'
    },
    profileImg: {
        display: 'inline-block',
        marginTop: '7rem',
        width: 80,
        height: 80,
        backgroundColor: '#766A96',
        alignItems: 'center',
        borderRadius:'50%',
        "&:hover":{
        }
    },
    profileNametext: {
        marginLeft: "12px",
        marginTop: '18px',
        padding: '4px',
        fontSize: '40px'
    },

    headerText: {
        margin: "2rem",

    },
    img: {
        width:'5rem', 
        height:'5rem',
        left: "46%",
        top: "28%" ,
        borderRadius:'50%' ,
        position:'absolute',
        transition: '.2s ease',
    },
    icon : {
        left: "46%",
        top: "28%" ,
        borderRadius:'50%' ,
        position:'absolute',
        padding:'1.5rem',
        fontSize:'5rem',
        opacity:0,
        cursor:'pointer',
        color:'white',
        "&:hover": {
            opacity:1
        }
    },
    inputStyle: {
        display:'none',
        visibility:"hidden"
     },
     img1: {
        width:'5rem', 
        height:'5rem',
        left: "46%",
        top: "28%" ,
        borderRadius:'50%' ,
        position:'absolute',
        transition: '.2s ease',
        backgroundColor:'#2C3E93'
    },
    text:{
        fontSize: "16px",
        lineHeight: "24px",
        letterSpacing: "0.15px",
        paddingLeft:"25px"
    }

}))

function ProfileHeader(props){
    const {
        pageMode, 
        handleImageState,
        logo,
        imageState
    } = props;

    const classes = useStyles();
    const dispatch = useDispatch();
    const { userProfileLogo } = useSelector((state)=> state.profile);
    const {userProfileDetails } = useSelector((state) => state.profile);
    const { userProfileImageId } = useSelector((state) => state.auth);
    const [profileLogoHeader, setProfileLogoHeader] = React.useState('');

    useEffect(() => {
        dispatch({
            type: "getUserProfileLogoAction", 
            payload: userProfileImageId
        });
    }, [logo]);
    useEffect(()=>{ 
        let header = "";
        if(localStorage.getItem('typeOfUser') === "Admin"){
            header = userProfileDetails.fullName? userProfileDetails.fullName.substring(0,2) : ""
        }else{
            header = userProfileDetails.firstName? userProfileDetails.firstName.substring(0,2) : "";
        }
        setProfileLogoHeader(header);
    },[userProfileDetails])

    const handleImage =(event)=> {
       imageState(event.target.files[0]);
       handleImageState(event.target.files[0]);
    }

    return (
        <div>
            <Grid container className='px-5 pb-5' >
                <Box height={170} style={{position:'relative'}} className={classes.container}>
                    <Box  className={classes.childContainer} display='flex' justifyContent='center' alignItems='center'>
                    </Box>
                    { 
                    userProfileLogo && logo === "" ? 
                    <img className={classes.img} src={userProfileLogo} alt="logo" /> :
                    logo !== "" ?
                    <img className={classes.img} src={logo}  alt="logo"/> 
                    :  <div className={classes.img1} > <h3 style={{textAlign:'center', marginTop:'1.5rem', textTransform: 'uppercase' }}>{profileLogoHeader}</h3></div> }
                    { pageMode === "edit" && 
                    <label for="icon"><img src={`/assets/images/icons/upload.svg`} className={classes.icon}/></label>
                    }
                    <input 
                        type="file"
                        className={classes.inputStyle}
                        name="icon"
                        onChange={(event)=>handleImage(event)}
                        id="icon"
                    >
                    </input>
                </Box>
            </Grid>
        </div>
    )
}
export default ProfileHeader;