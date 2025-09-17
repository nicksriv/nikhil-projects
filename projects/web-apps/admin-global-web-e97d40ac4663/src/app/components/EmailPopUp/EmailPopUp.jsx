import React, { useEffect, useState } from 'react';
import { Box, Button, Modal, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
//import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import history from 'helper/history.js';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import './css/emailPopUp.css'
const custom = createTheme({
    palette: {
        primary: {
            main: "#2C3E93"
        }
    },
})
function EmailPopUp({ open,
    Close,
    clientEmailTemplate,
    clientCredentialDetails,
    userEmailTemplate,
    userCredentialDetails,
    qualityAssuranceEmailTemplate,
    qualityAssuranceCredential,
    vendorEmailTemplate,
    vendorCredential,
    isClientPopup,
    isUserPopup,
    isVendorPopup,isQualityAssurancePopup,
    isNavigateToListingPage })
    {
    const style = {
        position: 'absolute',
        bottom: "0.5rem",
        right: "0.5rem",
        width: 500,
        height: 500,
        bgcolor: 'background.paper',
        overflowY: "scroll"
    };
    const useStyles = makeStyles(() => ({

        header: {

            backgroundColor: "#404141",
            width: "auto",
            height: "50px",
            display: "flex",
            alignItems: "center",
            position: "sticky",
            top: 0,
            zIndex: 2000,
            justifyContent: "space-between"
        },
        sendBtn: {
            position: "sticky",
            bottom: "0",
            zIndex: 2000,
            width: "100%",
            backgroundColor: "white"
        },
        linkContainer: {
            float: "right",
            marginBottom: "0.5rem",
            marginTop: "0"
        },
        link: {
            marginRight: "1rem",
            cursor: "pointer",
            display: "inline-block"
        },
        box: {
            '&::-webkit-scrollbar': {
                width: '0em'
            },
        },
        tagItem: {
            backgroundColor: "#d4d5d6",
            fontSize: "14px",
            borderRadius: "30px",
            height: "30px",
            padding: "0 4px 0 1rem",
            display: "inline-flex",
            alignItems: "center",
            marginBottom: "1rem"
        },
        dltButton: {
            backgroundColor: "white",
            width: "22px",
            height: "22px",
            borderRadius: "50%",
            border: "none",
            cursor: "pointer",
            font: "inherit",
            marginLeft: "10px",
            fontWeight: "bold",
            padding: 0,
            lineHeight: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        },
        editorContainer: {
            '&:focus': {
                border: "none !important"
            }
        }

    }));
    const classes = useStyles();

    const handleClose = () => {
        Close(!open);
        if (isNavigateToListingPage) {
            history.push(`/${isClientPopup ? 'client-management' : 'user-management'}`);
        }
    }

    const dispatch = useDispatch();
    const [ccText, setCCText] = useState("");
    const [ccList, setCCList] = useState([]);
    const [bccList, setBCCList] = useState([]);
    const [bccText, setBCCText] = useState("");
    const [sendTo, setSendTo] = useState("");
    const [clientId, setClientId] = useState("");
    const [userId, setUserId] = useState("");
    const [vendorId, setVendorId] = useState("");
    const [qualityAssuranceId,setQualityAssuranceId] = useState("");
    const [subject, setSubject] = useState("");
    const [template, setTemplate] = useState("");
    const [cc, setCC] = useState(false);
    const [bcc, setBCC] = useState(false);
    const [error, setError] = useState(null);

    const handleRecipient = (e) => {
        if (e.target.innerText === "Cc") {
            setCC(true)
        } else if (e.target.innerText === "Bcc") {
            setBCC(true)
        }
    }
    const handleChange = evt => {
        if (evt.target.name === "cc") {
            setCCText(evt.target.value);
        } else {
            setBCCText(evt.target.value);
        }
    };
    const handleKeyDown = evt => {
        if (["Enter", "Tab", ","].includes(evt.key)) {
            evt.preventDefault();
            if (ccText && evt.target.name === "cc") {
                setCCList([...ccList, ccText]);
                setCCText("");
            } else {
                setBCCList([...bccList, bccText]);
                setBCCText("");
            }
        }
    };
    const handleBlur = evt => {
        if (ccText && evt.target.name === "cc") {
            setCCList([...ccList, ccText]);
            setCCText("");
        } else if (bccText && evt.target.name === "bcc") {
            setBCCList([...bccList, bccText]);
            setBCCText("");
        }
    }

    const handleDelete = (listType, item) => {
        if (listType === "isCCList") {
            setCCList(ccList.filter(i => i !== item));
        } else {
            setBCCList(bccList.filter(i => i !== item));
        }
    }
    useEffect(() => {
        setSendTo(clientEmailTemplate.sendTo);
        setSubject(clientEmailTemplate.subject);
        setTemplate(clientEmailTemplate.template);
        if (clientCredentialDetails.clientId) {
            setClientId(clientCredentialDetails.clientId);
        } else {
            setClientId(clientEmailTemplate.clientId);
        }
    }, [clientEmailTemplate]);

    useEffect(() => {
        setSendTo(userEmailTemplate.sendTo);
        setSubject(userEmailTemplate.subject);
        setTemplate(userEmailTemplate.template);
        setUserId(userCredentialDetails.userId);
    }, [userEmailTemplate])

    useEffect(() => {
        setSendTo(vendorEmailTemplate?.sendTo)
        setSubject(vendorEmailTemplate?.subject)
        setTemplate(vendorEmailTemplate?.template)
        setVendorId(vendorEmailTemplate?.vendorId)
    }, [vendorEmailTemplate])

    useEffect(() => {
        setSendTo(qualityAssuranceEmailTemplate?.sendTo)
        setSubject(qualityAssuranceEmailTemplate?.subject)
        setTemplate(qualityAssuranceEmailTemplate?.template)
        setQualityAssuranceId(qualityAssuranceEmailTemplate?.qualityAssuranceId)
    }, [qualityAssuranceEmailTemplate])

    const setTemplateText = (event, editor) => {
        const data = editor.getData();
        setTemplate(data);
    }
    // setUserEmailTemplateAction
    const sendMail = () => {
        if (isClientPopup) {
            dispatch({
                type: "setClientEmailTemplateAction",
                payload: {
                    bcc: bccList,
                    cc: ccList,
                    clientId,
                    sendTo,
                    subject,
                    template
                }
            });
        }
        if (isQualityAssurancePopup) {
            console.log("send qa email")
            dispatch({
                type: 'setQualityAssuranceEmailTemplateAction',
                payload: {
                    bcc: bccList,
                    cc: ccList,
                    qualityAssuranceId,
                    sendTo,
                    subject,
                    template,
                },
            })
        }
        if (isVendorPopup) {
            dispatch({
                type: 'setVendorEmailTemplateAction',
                payload: {
                    bcc: bccList,
                    cc: ccList,
                    vendorId,
                    sendTo,
                    subject,
                    template,
                },
            })
        } else if (isUserPopup) {
            dispatch({
                type: 'setUserEmailTemplateAction',
                payload: {
                    bcc: bccList,
                    cc: ccList,
                    userId,
                    sendTo,
                    subject,
                    template,
                },
            })
        }
        // if (isNavigateToListingPage) {
        //     history.push(`/${isClientPopup ? 'client-management' : 'user-management'}`);
        // } 
       // history.push(`/${isClientPopup ? 'client-management' : 'user-management'}`);
        if (isClientPopup) {
            history.push(`/client-management`)
        } 
        if (isQualityAssurancePopup) {
            history.push(`/qualityassurance-management`)
        }
        if (isVendorPopup) {
            history.push(`/vendor-management`)
         } 
         else {
            history.push(`/user-management`)
        }
        setTimeout(()=>Close(!open), 500);
    }
    const handleToEmailAddress = (e) => {
        const { value } = e.target;
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
            setError(true);
        } else {
            setError(false);
        }
        setSendTo(value);
    }
    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <ThemeProvider theme={custom}>
                    <Box sx={style} className={classes.box}>
                        <div className={`${classes.header} p-0`}>
                            <h6 className="text-white ml-2">New Message</h6>
                            <div className="text-white mr-2">
                                <CloseIcon className="cursor-pointer" onClick={handleClose} />
                            </div>
                        </div>
                        <div className="p-2">
                            <div className={classes.linkContainer}>
                                {!cc ? <p className={classes.link} onClick={(e) => handleRecipient(e)}>Cc</p> : null}
                                {!bcc ? <p className={classes.link} onClick={(e) => handleRecipient(e)}>Bcc</p> : null}
                            </div>
                            <TextField
                                label="To"
                                id="outlined-size-small"
                                placeholder="example@gmail.com"
                                size="small"
                                value={sendTo}
                                onChange={(e) => handleToEmailAddress(e)}
                                variant="outlined"
                                className="w-full mb-5"
                                InputLabelProps={{
                                    shrink: sendTo ? true : false,
                                }}
                                error={error}
                                disabled={sendTo && error === null ? true : false}
                                helperText={error && "Enter Valid Email"}
                            />
                            {ccList && ccList.length > 0 && ccList.map((item) => {
                                return <div className={`${classes.tagItem} ml-1 mb-2`} key={item}>
                                    {item}
                                    <button
                                        type="button"
                                        className={classes.dltButton}
                                        onClick={() => handleDelete("isCCList", item)}
                                    >
                                        &times;
                                    </button>
                                </div>
                            })}
                            {cc ? <TextField
                                label="Cc"
                                id="outlined-size-small"
                                placeholder="example@gmail.com"
                                size="small"
                                value={ccText}
                                name="cc"
                                onKeyDown={(evt) => handleKeyDown(evt)}
                                onChange={(evt) => handleChange(evt)}
                                onBlur={(evt) => handleBlur(evt)}
                                variant="outlined"
                                className="w-full mb-5"
                            /> : null}
                            {bccList && bccList.length > 0 && bccList.map((item) => {
                                return <div className={`${classes.tagItem} ml-1 mb-2`} key={item}>
                                    {item}
                                    <button
                                        type="button"
                                        className={classes.dltButton}
                                        onClick={() => handleDelete("isBCCList", item)}
                                    >
                                        &times;
                                    </button>
                                </div>
                            })}
                            {bcc ? <TextField
                                label="Bcc"
                                id="outlined-size-small"
                                placeholder="example@gmail.com"
                                size="small"
                                onKeyDown={(evt) => handleKeyDown(evt)}
                                onChange={(evt) => handleChange(evt)}
                                onBlur={(evt) => handleBlur(evt)}
                                value={bccText}
                                name="bcc"
                                variant="outlined"
                                className="w-full mb-5"
                            /> : null}

                            <TextField
                                label="Subject"
                                id="outlined-size-small"
                                placeholder="Write subject of your email..."
                                disabled
                                size="small"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                InputLabelProps={{
                                    shrink: subject ? true : false,
                                }}
                                variant="outlined"
                                className="w-full mb-5"
                            />
                            <div className={`w-full ${classes.editorContainer}`}>
                                <CKEditor
                                    editor={ClassicEditor}
                                    data={template}
                                    disabled={true}
                                    onChange={(event, editor) => setTemplateText(event, editor)}
                                />
                            </div>

                            <div className={classes.sendBtn}>
                                <Button variant="contained" disabled={error || !sendTo} className={`bg-primary text-white mt-5 w-60 ml-2 mb-3`} onClick={sendMail}>Send</Button>
                            </div>
                        </div>

                    </Box>
                </ThemeProvider>
            </Modal>
        </div>
    )
}

export default EmailPopUp
