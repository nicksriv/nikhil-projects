import React from 'react';
import {
    Grid, LinearProgress, Button
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import Dropzone from "react-dropzone";
import * as XLSX from "xlsx";
import { useEffect } from 'react';

const useStyles = makeStyles((theme) => ({
    root: {
        h1: {
            fontWeight: 'normal'
        },
        '&.MuiLinearProgress-bar': {
            height: '6px',
            borderRadius: '56px 0px 0px 56px'
        }
    },
    paper: {
        backgroundColor: 'white',
        width: '100%',
        height: 'auto',
        border: '1px dashed #CDCCCD;',
        opacity: 1,
        borderRadius: '8px',
        position: 'relative',
        marginBottom: '1.5rem',
        flex: 1,
        //marginTop: '2rem',
    },
    dropZoneHover: {
        '&:hover': {
            border: '1px dashed #2C3E93',
            color: '#2C3E93'
        },
    },
    dropZoneLblHover: {
        '&:hover': {
            border: 'none'
        },
    },
    dropZoneActive: {
        border: '1px solid #2C3E93',
        color: '#2C3E93',
        borderRadius: "10px",
        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"
    },
    dropZoneLblActive: {
        border: 'none'
    },
    fileDownloadIcon: {
        width: '19px',
        height: '20px',
        color: '#9f9f9e',
    },
    uploadedFileLink: {
        fontSize: "1rem",
        marginTop: "0.5rem",
        cursor: "pointer",
        color: "#2C3E93 !important"
    }
}));

const V5GlobalDnDFileControl = (props) => {
    const {
        file,
        setFile,
        isFileSelected,
        setIsFileSelected,
        isProgressComplete,
        setIsProgressComplete,
        setDropDown,
        dropDownOptions,
        fileUploaded,
        uploaded,
        setDropDownOptions,
        deleteUploadedOptions
    } = props;
    const classes = useStyles();
    const [progress, setProgress] = React.useState(0);
    const [intervalId, setIntervalId] = React.useState(null);
    const [items, setItems] = React.useState([]);
    const [startUpload, setStartUpload] = React.useState(false);
    useEffect(() => {
        setDropDown(items);
    }, [items]);

    useEffect(() => {
        if (file && file.name) {
            setDropDownOptions(file?.name, true)
        }
    }, [file])

    const handleDrop = (acceptedFiles) => {
        const promise = new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsArrayBuffer(acceptedFiles[0]);
            setIsFileSelected(true);
            setFile(acceptedFiles[0]);
            setStartUpload(true);
            fileReader.onload = (e) => {
                const bufferArray = e.target.result;

                const wb = XLSX.read(bufferArray, { type: "buffer" });

                const wsname = wb.SheetNames[0];

                const ws = wb.Sheets[wsname];

                const data = XLSX.utils.sheet_to_json(ws);

                resolve(data);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });

        promise.then((d) => {
            setItems(d);
        });
        const timer = setInterval(() => {
            setProgress((oldProgress) => {
                if (oldProgress === 100) {
                    setIsProgressComplete(true);
                    clearInterval(timer);
                    setProgress(0);
                }
                const diff = Math.random() * 10;
                return Math.min(oldProgress + diff, 100);
            });
        }, 500);
        setIntervalId(timer);
    }
    const handleDropAccepted = () => {
        setIsProgressComplete(false);
    }
    const handleDelete = (e) => {
        e.stopPropagation();
        setFile(null);
        setDropDownOptions("", false);
        setStartUpload(false);
        setIsProgressComplete(true);
        setIsFileSelected(false);
        clearInterval(intervalId);
        setProgress(0);
        deleteUploadedOptions(true)
    }
    const downloadExcel = () => {
        let jsonToConvert = [];
        dropDownOptions.map((el) => {
            jsonToConvert.push({ label: el.value })
        })
        let excelSheet = XLSX.utils.json_to_sheet(jsonToConvert);
        let workBook = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(workBook, excelSheet, 'Uploaded_Sheet');
        XLSX.writeFile(workBook, 'Uploaded_Sheet.xls')
    }

    return (
        <Dropzone
            onDrop={files => fileUploaded ? null : handleDrop(files)}
            onDropAccepted={fileUploaded ? null : handleDropAccepted}
            accept=".xls, .ods"
            disabled={file?.name ? file?.name : fileUploaded}
        //minSize={1024}
        //maxSize={3072000}
        >
            {({ getRootProps, getInputProps }) => (
                <>
                    <div {...getRootProps({ className: `${classes.paper} ${isFileSelected ? classes.dropZoneActive : classes.dropZoneHover} cursor-pointer` })}>
                        <input {...getInputProps()} />
                        <Grid
                            container
                            direction="column"
                            justifyContent="center"
                            alignItems="center"
                        //className={`${classes.downloadContainer} cursor-pointer`}              
                        >
                            <Grid item className="pt-5">
                                <img className={classes.fileDownloadIcon}
                                    src={`/assets/images/icons/Drag & Drop icons.svg`}
                                    alt={"dnd"} />
                            </Grid>
                            <Grid item>
                                <h5 className="font-normal"
                                    style={{ color: "#000000BC" }}>{uploaded || startUpload ?
                                        <>
                                            <Grid
                                                container
                                                direction="row"
                                                justifyContent="space-between"
                                                spacing={1}
                                            >
                                                <Grid item className={`text-light-gray`}>
                                                    <DescriptionOutlinedIcon style={{ fontSize: "1.2rem", color: "#2C3E93" }} />
                                                </Grid>

                                                <a className={classes.uploadedFileLink} onClick={downloadExcel} >{file?.name ? file?.name : fileUploaded}</a>
                                                {
                                                    //!isProgressComplete &&
                                                    (
                                                        <Grid item className={`text-light-gray`}>
                                                            <DeleteIcon onClick={(e) => handleDelete(e)} style={{ fontSize: "1.2rem", color: "#2C3E93", cursor: "pointer" }} />
                                                        </Grid>
                                                    )
                                                }
                                            </Grid>
                                        </>
                                        :
                                        "Browse sheet"}</h5>

                            </Grid>
                            {/* <Grid item>
                                {
                                    isFileSelected &&
                                    (
                                        <Grid
                                            container
                                            direction="row"
                                            justifyContent="space-between"
                                            spacing={1}
                                        >
                                            <Grid item className={`text-light-gray`}>
                                                <DescriptionOutlinedIcon style={{ fontSize: "1.2rem" }} />
                                            </Grid>
                                            <Grid item className={`font-bold`}>
                                                {file && file.name}
                                            </Grid>
                                            {
                                                //!isProgressComplete &&
                                                (
                                                    <Grid item className={`text-light-gray`}>
                                                        <DeleteIcon onClick={(e) => handleDelete(e)} style={{ fontSize: "1.2rem" }} />
                                                    </Grid>
                                                )
                                            }
                                        </Grid>
                                    )
                                }
                            </Grid> */}
                            <Grid item className={`pb-4 w-260`} justifyContent="center">
                                {
                                    (isFileSelected && !isProgressComplete) &&
                                    (
                                        <LinearProgress variant="determinate" value={progress} />
                                    )
                                }
                            </Grid>
                        </Grid>
                    </div>
                </>
            )}
        </Dropzone>
    );
}

V5GlobalDnDFileControl.propTypes = {

};

V5GlobalDnDFileControl.defaultProps = {

};

export default V5GlobalDnDFileControl;