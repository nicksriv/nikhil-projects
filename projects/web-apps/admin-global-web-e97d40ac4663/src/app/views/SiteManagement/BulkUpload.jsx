import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Grid
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import history from 'helper/history.js';
import {
    V5GlobalDownloadTemplate,
    V5GlobalDnDFileControl,
    V5GlobalUploadComplete
} from '../../components';

const BulkUpload = () => {
    const { clientIdForUserLogo } = useSelector((state) => state.users);
    const { bulkUploadReport, showUploadComplete, sitesErrorLog } = useSelector((state) => state.sites);
    const dispatch = useDispatch();

    const [file, setFile] = useState(null);
    const [isFileSelected, setIsFileSelected] = useState(false);
    const [isProgressComplete, setIsProgressComplete] = useState(false);

    // const { clientIdForUsers, usersErrorLog } = useSelector((state) => state.users);
    //..HANDLERS
    const handleBack = (e) => {
        history.push('/site-management');
    }
    const handleDownloadTemplate = () => {
        dispatch({
            type: 'getSiteTemplateAction'
        });
    }
    const handleNext = () => {
        let data = new FormData();
        data.append('file', file, file.name);
        // const options = {
        //     onUploadProgress: (progressEvent) => {
        //         const { loaded, total } = progressEvent;
        //         let percent = Math.floor((loaded * 100) / total);

        //         if (percent < 100) {
        //             setUploadPercentage(percent);
        //         }
        //     }
        // }
        dispatch({
            type: 'setSiteTemplateAction',
            payload: { clientId: clientIdForUserLogo, data },
        });
    }

    return (
        <>
            <div className="analytics m-sm-30">
                <Grid container spacing={2} justify="space-between" className="flex items-center">
                    <Grid item className="flex pt-5">
                        <ArrowBackIcon onClick={handleBack} className="cursor-pointer mt-2 text-light-gray" />
                        <h1 className="ml-10px">Bulk Sites Upload</h1>
                    </Grid>
                </Grid>
                {
                    !showUploadComplete &&
                    (
                        <>
                            <V5GlobalDownloadTemplate
                                headerDescription="Download the template, add your data, then upload it below for processing."
                                handleDownloadTemplate={handleDownloadTemplate} 
                            />

                            <V5GlobalDnDFileControl
                                file={file}
                                setFile={setFile}
                                isFileSelected={isFileSelected}
                                setIsFileSelected={setIsFileSelected}
                                isProgressComplete={isProgressComplete}
                                setIsProgressComplete={setIsProgressComplete}
                                handleNext={handleNext}
                            />
                        </>
                    )
                }
                {
                    showUploadComplete &&
                    (
                        <V5GlobalUploadComplete
                            failedRecordsCount={bulkUploadReport ? bulkUploadReport.failedRecordsCount : 0}
                            usersErrorLog={sitesErrorLog}
                            />
                    )
                }
            </div>
        </>
    );
}

export default BulkUpload;