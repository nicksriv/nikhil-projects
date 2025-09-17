import React, { useState } from 'react'
import { Grid, TextField } from '@material-ui/core'
import RichTextEditor from 'react-rte'

import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

import { makeStyles } from '@material-ui/core/styles'
import MultiSelectSearch from 'app/components/Multiselect/MultiSelectSearch'
import Deliverables from 'app/components/MultipleDate/MultipleDates'
import Highlights from 'app/components/MultipleDate/MultipleDates'

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiInputLabel-root': {
            color: '#00000099',
            fontWeight: '400',
        },

        '& .MuiFormLabel-root.Mui-focused': {
            color: '#2C3E93',
        },
    },
    disabledInput: {
        '& .MuiInputBase-root.Mui-disabled': {
            color: '#000000BC',
        },
    },
    disabledInputLabel: {
        '& .MuiFormLabel-root.Mui-disabled': {
            color: '#000000BC',
        },
    },
    switchLabel: {
        '& .MuiFormControlLabel-label': {
            fontSize: '16px',
            color: '#9f9f9e',
        },
    },
    iconColor: {
        color: '#636365',
    },
}))

const JobSummary = (props) => {
    const classes = useStyles()
    const {
        styleObj,
        handleInputChange,
        formValues,
        skillsList,
        deliverableChipText,
        deliverableChip,
        handleDeliverables,
        removeDeliverables,
        highlightsChip,
        handleHighlights,
        removeHighlights,
        handlejobDescription,
        jobDescription = '',
        onEditorReady,
    } = props
    const toolbarConfig = {
        // Optionally specify the groups to display (displayed in the order listed).
        display: [
            'INLINE_STYLE_BUTTONS',
            'BLOCK_TYPE_BUTTONS',
            'LINK_BUTTONS',
            'BLOCK_TYPE_DROPDOWN',
            'HISTORY_BUTTONS',
        ],
        INLINE_STYLE_BUTTONS: [
            { label: 'Bold', style: 'BOLD', className: 'custom-css-class' },
            { label: 'Italic', style: 'ITALIC' },
            { label: 'Underline', style: 'UNDERLINE' },
        ],
        BLOCK_TYPE_DROPDOWN: [
            { label: 'Normal', style: 'unstyled' },
            { label: 'Heading Large', style: 'header-one' },
            { label: 'Heading Medium', style: 'header-two' },
            { label: 'Heading Small', style: 'header-three' },
        ],
        BLOCK_TYPE_BUTTONS: [
            { label: 'UL', style: 'unordered-list-item' },
            { label: 'OL', style: 'ordered-list-item' },
        ],
    }
    return (
        <div>
            <form>
                <div className={'w-full mt-2'}>
                    <Grid
                        container
                        direction="row"
                        spacing="3"
                        className="pb-4 w-full"
                    >
                        <Grid item>
                            <h5>Basic details</h5>
                        </Grid>
                    </Grid>

                    <Grid
                        container
                        direction="row"
                        spacing="5"
                        className="min-h-120 w-full"
                    >
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <TextField
                                multiline
                                maxRows={4}
                                value={formValues.jobTitle}
                                name="jobTitle"
                                className={styleObj.textFieldWidth}
                                label="Job title"
                                type="text"
                                variant="outlined"
                                onChange={(e) =>
                                    handleInputChange(
                                        'jobSummary',
                                        'jobTitle',
                                        e.target.value
                                    )
                                }
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <TextField
                                multiline
                                maxRows={4}
                                value={formValues.jobShortDescription}
                                className={styleObj.textFieldWidth}
                                label="Job Short Description"
                                type="text"
                                variant="outlined"
                                onChange={(e) =>
                                    handleInputChange(
                                        'jobSummary',
                                        'jobShortDescription',
                                        e.target.value
                                    )
                                }
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={12}>
                            <h5>Job description</h5>
                            {/* <RichTextEditor
                                value={jobDescription}
                                onChange={handlejobDescription}
                                toolbarConfig={toolbarConfig}
                            /> */}
                            <CKEditor
                                editor={ClassicEditor}
                                data={jobDescription}
                                disabled={false}
                                onChange={(event, editor) =>
                                    handlejobDescription(event, editor)
                                }
                                onReady={(editor) => {
                                    onEditorReady(editor)
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={12}>
                            <MultiSelectSearch
                                value={formValues.skills??[] }
                                label={'Skills'}
                                placeholder={'Search Skills'}
                                listArray={skillsList}
                                onChange={(e, value) =>
                                    handleInputChange(
                                        'jobSummary',
                                        'skills',
                                        value
                                    )
                                }
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={12}>
                            <Deliverables
                                chipsData={deliverableChip}
                                value={formValues.deliverables}
                                placeholder="Press Enter to add deliverables"
                                onChange={(e) =>
                                    handleInputChange(
                                        'jobSummary',
                                        'deliverables',
                                        e.target.value
                                    )
                                }
                                onKeyPress={handleDeliverables}
                                onChipDelete={removeDeliverables}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={12}>
                            <Highlights
                                chipsData={highlightsChip}
                                value={formValues.highlights}
                                placeholder="Press Enter to add highlights"
                                onChange={(e) =>
                                    handleInputChange(
                                        'jobSummary',
                                        'highlights',
                                        e.target.value
                                    )
                                }
                                onKeyPress={handleHighlights}
                                onChipDelete={removeHighlights}
                            />
                        </Grid>
                    </Grid>
                </div>
            </form>
        </div>
    )
}

export default JobSummary
