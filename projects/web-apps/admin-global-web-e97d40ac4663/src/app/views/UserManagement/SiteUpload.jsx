import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Grid
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import history from 'helper/history.js';
import {
    V5GlobalDnDFileControl,
    V5GlobalUploadComplete,
    V5GlobalMultipleDownloadTemplate
} from '../../components';


const SiteUpload = () => {
    const {
        clientIdForUsers,
        siteMapUpload,
        showUploadComplete,
        usersErrorLog
    } = useSelector((state) => state.users);
    const dispatch = useDispatch();

    const [file, setFile] = useState(null);
    const [isFileSelected, setIsFileSelected] = useState(false);
    const [isProgressComplete, setIsProgressComplete] = useState(false);

    //..HANDLERS
    const handleBack = (e) => {
        history.push('/user-management');
        dispatch({
            type: 'restUploadUsersAction'
        })
    }
    const handleDownloadTemplate = (type) => {
        console.log('In handle', type)
        dispatch({
            type: 'getSiteMappingTemplateAction', payload: { type }
        });
    }
    const handleNext = () => {
        let data = new FormData();
        data.append("file",file)
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
            type: 'putUploadSiteMapAction',
            payload: { clientId: clientIdForUsers, data },
        });
    }
    return (
        <>
            <div className="analytics m-sm-30">
                <Grid container spacing={2} justify="space-between" className="flex items-center">
                    <Grid item className="flex pt-5">
                        <ArrowBackIcon onClick={handleBack} className="cursor-pointer mt-2 text-light-gray" />
                        <h1 className="ml-10px">Map Site To User</h1>
                    </Grid>
                </Grid>
                {
                    !showUploadComplete &&
                    (
                        <>
                            <V5GlobalMultipleDownloadTemplate
                                // headerDescription="Download the template, add your data, then upload it below for processing."
                                headerDescription={[
                                    { label: "Template Day Wise", type: "TEMPLATE_DAY_WISE" },
                                    { label: "Template Date Wise" , type: "TEMPLATE_DATE_WISE" },
                                    { label: "Template Generic" , type: "TEMPLATE_GENERIC"}
                                ]}
                                handleDownloadTemplate={handleDownloadTemplate} />

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
                            failedRecordsCount={siteMapUpload ? siteMapUpload.failedRecordsCount : 0}
                            usersErrorLog={usersErrorLog}
                        />
                    )
                }
            </div>
        </>
    );
}

export default SiteUpload;