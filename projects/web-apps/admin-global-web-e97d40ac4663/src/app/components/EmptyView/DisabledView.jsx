import React from 'react'
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(() => ({
    cardContainer: {
        display: 'grid',
        placeItems: 'center',
        marginTop: "10%",
        height: "100vh",
        gridTemplateRows: "0fr 0fr 0fr"
    },
    link: {
        textDecoration: 'underline',
        color: '#2C3E93',
    },
    screenContainer: {
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        border: "1px solid lightgray",
        borderRadius: "3px",
        paddingBottom: "1rem",
        paddingTop: "1.5rem"
    },
    screenTitle: {
        color: "#00000061",
        fontSize: "1rem",
        margin: "1rem 0"
    },
    borderColor: {
        border: "1px solid red"
    }
}));


function DisabledView({ imgSrc, title, actionLink, isLeftAligned, textSize, actionHandler, background, borderType, pageMode }) {

    const classes = useStyles();

    return (
        <div onClick={pageMode !== "view" && actionHandler} className={`${classes.screenContainer} ${isLeftAligned && "ml-10"} ${actionLink && "cursor-pointer"}${borderType === "dashed" && pageMode === "view" && "border-dashed-disabled"} ${borderType === "dashed" && pageMode !== "view" && "border-dashed"}`} style={{ background: background }}>
            <img src={imgSrc} alt="logo" />
            <p className={`${classes.screenTitle} ${textSize && "h3"}`}>{title}</p>
            {pageMode !== "view" && <a onClick={actionHandler} className='color-primary cursor-pointer'>{actionLink}</a>
            }
        </div>
    )
}

export default DisabledView
