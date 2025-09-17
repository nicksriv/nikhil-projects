import React,{ useState } from 'react';
import {
    Grid, Card,
    CardContent, CardActionArea, Typography,
    FormLabel,
    IconButton
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import V5FormElement from './v5-form-builder-feature-template';
import DeleteIcon from '@material-ui/icons/Delete';
import store from './stores/store';
import ConfirmationDialog from './V5_ConformationDialog';

const useStyles = makeStyles(({ palette, ...theme }) => ({
    root: {
        maxWidth: 300,
        marginTop: 14,
        backgroundColor: "#f5f5f5",
        //maxHeight: 300,
        //width: 300
        "& .MuiFormLabel-root": {
            fontSize: "0.75rem",
            color: "#c3c0c0",
            marginTop: "6px"
        },
        "& .MuiTextField-root": {
            fontSize: "0.75rem",
            background: "#f7f7f7",
            //marginBottom: "6px"
        },
        "& .MuiOutlinedInput-inputMarginDense": {
            padding: "6px",
            fontSize: "0.75rem"
        },
        "& .MuiSelect-outlined.MuiSelect-outlined": {
            padding: "5px",
            width: "134px"
        },
        "& .PrivateRadioButtonIcon-root-15.PrivateRadioButtonIcon-checked-17 .MuiSvgIcon-fontSizeSmall": {
            fontSize: "0.75rem"
        },
        "& .MuiFormGroup-root.MuiFormGroup-row .MuiFormControlLabel-root .MuiTypography-body1": {
            fontSize: "0.5rem"
        },
        "& .MuiFormGroup-root.MuiFormGroup-row .MuiFormControlLabel-root .PrivateSwitchBase-root-7": {
            padding: "7px"
        },
        "& .MuiFormGroup-root.MuiFormGroup-row .MuiFormControlLabel-root": {
            marginRight: "7px"
        },
        "& .MuiFormGroup-root.MuiFormGroup-row": {
            //flexWrap: "inherit"
        },
        "& .MuiFormControlLabel-root .MuiCheckbox-root .MuiIconButton-label .MuiSvgIcon-root": {
            fontSize: "0.75rem"
        },
        "& .MuiFormControlLabel-root .MuiTypography-body1": {
            fontSize: "0.5rem"
        },
        "& .MuiCardContent-root": {
            padding: "5px"
        }
    },
    boxHeading: {
        marginBottom: "2px",
        color: "#919191",
        fontSize: "0.75rem",
    },
    boxForm: {
        padding: "10px",
        border: "1px solid #bbbbbb",
        borderRadius: "2px",
        maxWidth: 300,
        maxHeight: 300,
        backgroundColor: "#ffffff",
        height: "223px",
        overflow: "hidden"
    },
    deleteInfoText:{
        fontSize:"15px",
        whiteSpace: "pre-line",
        textAlign: "left",      
        color: 'grey'
    }
}));

const V5FormBuilderFeatureTemplate = (props) => {
    const {
        featureTemplates,
        handleFeatureTemplateDelete
    } = props;
    const classes = useStyles();
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [selectedFeatureTemplateId, setselectedFeatureTemplateId] = useState(null);
    const handleTemplate = (e, id) => {
        e.preventDefault();
        // e.stopPropagation();
        //const tempData = [...featureTemplates];
        const tempData = featureTemplates.slice(0);
        const template = tempData.find(x => x.id === id);
        const formData = template.form;
        //store.dispatch('load', { data: formData || [] });
        store.dispatch('updateOrder', formData);
    }
    const handleFeatureTemplatesDelete = (id) => {
        setselectedFeatureTemplateId(id);
        setShowDeletePopup(true);
    }
    const confirmDelete = () => {
        try {
            handleFeatureTemplateDelete(selectedFeatureTemplateId);
            setShowDeletePopup(false);
        } catch (error) {
            console.error(error);
        }
    }
    const text = `Are you sure want to delete?`;
    return (
        <div className='form-builder-feature-template'>
            <Grid container spacing={2}>
                {
                    featureTemplates && featureTemplates.map((ft, i) => (
                        <Grid md={6}>
                            <Card className={classes.root} style={{ boxShadow: "none" }}
                                onClick={(e) => handleTemplate(e, ft.id)}>
                                <CardActionArea>
                                    <CardContent className='box'>
                                        <Typography component="h7" className={classes.boxHeading}>
                                            {ft.name}
                                        </Typography>
                                        <DeleteIcon className='deleteIcon' onClick={(e)=>handleFeatureTemplatesDelete(ft.id)} />
                                        <Typography variant="body2" color="textSecondary" component="div"
                                            className={`${classes.boxForm} boxForm `}>
                                            {
                                                ft.form && ft.form.map((d, i) => (
                                                    <>
                                                        <FormLabel>{d.label}</FormLabel>
                                                        <V5FormElement elementType={d.element} />
                                                    </>
                                                ))
                                            }
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))
                }
            </Grid>
            <ConfirmationDialog
                open={showDeletePopup}
                onConfirmDialogClose={() => setShowDeletePopup(false)}
                text={<div className={classes.deleteInfoText}>{text}</div>}
                onYesClick={confirmDelete}
            />
        </div>
    );
}

export default V5FormBuilderFeatureTemplate;