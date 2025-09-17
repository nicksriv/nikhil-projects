import React from 'react'
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(() => ({
    cardContainer: {
        display: 'grid',
        placeItems: 'center',
        // marginTop: "10%",
        height: "100vh",
        gridTemplateRows: "0fr 0fr 0fr"
    },
    link: {
        textDecoration: 'none',
        color: '#2C3E93',
    },
    screenContainer: {
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        border: "1px solid lightgray",
        backgroundColor:"white",
        borderRadius: "3px",
        paddingBottom: "1rem",
        paddingTop: "1.5rem"
    },
    screenTitle: {
        color: "#00000061",
        fontSize: "1rem"
    }
}));


function EmptyManager({ imgSrc, title,subTitleLink,clickHandler }) {

    const classes = useStyles();

    return (
        <div className={`${classes.screenContainer}`}>
            <img src={imgSrc} alt="logo" />
            <p className={classes.screenTitle}>{title}</p>
            <a onClick={clickHandler} className={`${classes.link} cursor-pointer`}>
                {subTitleLink}
            </a>
        </div>
    )
}

export default EmptyManager
