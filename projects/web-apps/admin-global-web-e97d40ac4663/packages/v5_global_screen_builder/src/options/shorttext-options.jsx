import React, { useEffect } from 'react';
import { Switch, FormControlLabel, FormGroup, Grid, TextField, InputAdornment, Typography, IconButton, Tooltip, Fade, Zoom, Button, Checkbox, Dialog, DialogTitle, DialogContent, Icon, DialogActions, ListItem, ListItemText, List, InputBase, Box } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InfoIcon from "@material-ui/icons/Info";
import CircleCheckedFilled from "@material-ui/icons/CheckCircle";
import CircleUnchecked from "@material-ui/icons/RadioButtonUnchecked";
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import {
    makeStyles,
    withStyles, //ThemeProvider
} from '@material-ui/core/styles'
//import InputAdornment from '@material-ui/core/InputAdornment'
import SearchIcon from '@material-ui/icons/Search'
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';

import MuiDialogContent from '@material-ui/core/DialogContent'
const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    subHeading: {
        opacity: "0.6",
        fontSize: "16px",
        fontWeight: "normal",
        display: "inline"
    },
    button: {
        height: "28px",
        // outline: "none",
        // textTransform: 'capatalize'
    },
    tooltip: {
        fontFamily: "SF Pro",
        fontSize: "12px"
    },
    icon: {
        "&:hover": {
            color: "#2C3E93"
        }
    },
    broweseIcon: {
        backgroundColor: 'white',
        width: '66%',
        height: '70px',
        marginLeft: '-20px',

        display: 'block',
        // WebGLTransformFeedback: "keep-all",
        textAlign: 'center',
        // borderStyle: 'dotted',
        position: 'relative',
        color: 'grey',
        top: '-10px',
        left: '0',
        borderStyle: 'dotted',
        borderWidth: '2px',
        '&:hover': {
            color: ' black',
            backgroundColor: '#F7F8FC',
            border: '1px solid black',
        },
        '&:active': {
            color: ' #2C3E93',
            backgroundColor: '#F7F8FC',
            border: '1px solid #2C3E93',
        },
        '&:visited': {
            color: ' #2C3E93',
            backgroundColor: '#F7F8FC',
            border: '1px solid #2C3E93',
        },
    },
    broweseIcon1: {
        width: '66%',
        height: '70px',
        marginLeft: '-20px',
        display: 'block',
        textAlign: 'center',
        position: 'relative',
        top: '-10px',
        left: '0',
        color: ' #2C3E93',
        backgroundColor: '#F7F8FC',
        border: '1px solid #2C3E93',
    },


    dialogTitle: {
        backgroundColor: '#2C3E93',
        color: '#000000DE',
        height: '49px',
        padding: '3px',

    },
    dialogPaper: {
        height: '400px',
        width: '350px',
        position: 'relative',
        top: '16px',
        left: '140px',

    },
    selectIcon: {
        marginLeft: '300px',
        marginTop: '-59px',
        color: '#00000099',
        padding: '5px',


    },
    lastButton: {
        position: 'sticky',
        bottom: 0,
        backgroundColor: 'white',
    },
    text1: {
        display: 'inline',
        opacity: 0.6,
        fontSize: '16px',
        fontWeight: "normal"
    },
    browseIcon: {
        display: 'block',
        padding: '0 3rem',
        border: '1px dashed rgb(128,128,128,.5)',
        opacity: "0.7"
    },
    iconGrid: {
        marginTop: '5px',
        padding: '3px',
        maxHeight: '65%',
        overflowY: 'scroll',
        '&::-webkit-scrollbar': {
            width: '0em',
        },

    },
    list1: {
        marginTop: '-15px',
        opacity: '0.6',
        fontSize: '1rem',
    },
    iconContainer: {
        position: 'relative',
        border: '1px solid rgba(0,0,0,0.1)',
        padding: '0.6rem',
        margin: '0.8rem',
    },
    iconhover: {
        position: 'relative',
        padding: '0.6rem',
        margin: '0.8rem',
        cursor: 'pointer',
        '&:hover': {
            border: '1px solid rgba(0,0,0,0.3)',
            padding: '0.6rem',
            cursor: 'pointer',
            margin: '0.8rem',
        },
    },
    selectedIconBox: {
        border: '1px solid #2C3E93',
        position: 'relative',
        padding: '0.6rem',
        cursor: 'pointer',
        margin: '0.8rem',
    },
    checkboxShow: {
        display: 'block',
        position: 'absolute',
        bottom: '0.8rem',
        right: '-0.5rem',
        paddingBottom: '1.1rem',
    },
    checkboxHide: {
        display: 'none',
    },
    symbol1: {
        color: 'black',

    },
    titleBrowsePopup: {
        display: 'inline',
        paddingLeft: '10px',
    },
    titletext: {
        fontWeight: 500
    }

}));

export default function ShortTextOptions(props) {
    const inputProps = {
        type: "dropdown"
    };

    const validationOptions = [
        {
            value: "Alphabetic",
            key: "alphabetic"
        },
        {
            value: "AlphaNumeric",
            key: "alphaNumeric"
        },
        {
            value: "Currency",
            key: "currency"
        },
        // {
        //     value: "Cyrillic",
        //     key: "cyrillic"
        // },
        {
            value: "Email",
            key: "email"
        },
        {
            value: "Numeric",
            key: "numeric"
        },
        {
            value: "URL",
            key: "url"
        }
    ];
    const icons = [
        {
            id: 0,
            icon: 'event_seat',
            iconName: "Event seat"
        },
        {
            id: 1,
            icon: 'date_range',
            iconName: "Date range"

        },
        {
            id: 2,
            icon: 'calendar_today',
            iconName: "Calender today"
        },
        {
            id: 3,
            icon: 'event_busy',
            iconName: "Event busy"
        },
        // {
        //     id: 4,
        //     icon: 'no_accounts',
        //     iconName: "No account"
        // },
        {
            id: 5,
            icon: 'pending_actions',
            iconName: "Pendding actions"
        },
        {
            id: 6,
            icon: 'analytics',
            iconName: "analytics"
        },
        {
            id: 7,
            icon: 'stars',
            iconName: "stars"
        },
        {
            id: 8,
            icon: 'person',
            iconName: "person"
        },
        {
            id: 9,
            icon: 'settings',
            iconName: "settings"
        },
        {
            id: 10,
            icon: 'home_work',
            iconName: "home work"
        },
        {
            id: 11,
            icon: 'find_in_page',
            iconName: "find in page"
        },
        {
            id: 12,
            icon: 'event_available',
            iconName: "event available"
        },
        {
            id: 13,
            icon: 'face',
            iconName: "face"
        },
        {
            id: 14,
            icon: 'group_add',
            iconName: "group add"
        },
        {
            id: 15,
            icon: 'group_work',
            iconName: "group work"
        }];

    const reportSelected = event => {
        this.setState(() => {
            return {
                report: event.target.value
            }
        });
    };
    const styles = (theme) => ({
        root: {
            margin: 0,
            padding: theme.spacing(2),
        },
    })
    const DialogTitle = withStyles(styles)((props) => {
        const { children, classes, onClose, ...other } = props
        return (
            <MuiDialogTitle disableTypography className={classes.root} {...other}>
                <Typography>{children}</Typography>
                {onClose ? (
                    <IconButton
                        aria-label="close"
                        className={classes.close}
                        onClick={onClose}
                    >
                        <CloseIcon />
                    </IconButton>
                ) : null}
            </MuiDialogTitle>
        )
    })
    const DialogContent = withStyles((theme) => ({
        root: {
            padding: theme.spacing(2),
        },
    }))(MuiDialogContent)

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [clickedIcon, setClickedIcon] = React.useState(false);
    const [selectIcon, setSelectIcon] = React.useState('');
    const [selectIconIndex, setSelectIconIndex] = React.useState(null);
    const [hover, setHover] = React.useState(false);
    const [hoverIcon, setHoverIcon] = React.useState(null);
    const helpertext = `Restrict users to match the format you specify.
    Use @ symbol to mask letters, # for numbers and * for both.
    Example: #@-#**#-#@`

    const [searchedIcons, setsearchedIcons] = React.useState([])
    const [searchedText, setsearchedText] = React.useState('');

    //const [searchTerm, setsearchTerm] = React.useState("")

    useEffect(() => {
        setsearchedIcons(icons)
    }, [])
    const isMasked = props.element.customOptions.hasOwnProperty("isMasked") ? props.element.customOptions.isMasked : false;
    const checkedIcon = props.element.customOptions.selectedIcons;
    const isDisabled = props.element.customOptions.isFieldDisabled;
    const handleIconOpen = () => {
        setOpen(true);
    }
    const handlePopup = () => {
        setOpen(false);
    }
    const iconSelect = (e, x, index) => {
        props.element.customOptions.selectedIcons = x.icon;
        props.element.customOptions.selectedIconsMobile = x.icon.split("_").join("-");
        setSelectIcon(x.icon);
        setClickedIcon(true);
        setSelectIconIndex(index);
        handleInputChange({ target: { name: 'icon', value: x.icon } })
    }
    // const selectedIcon = () => {
    //     setOpen(false);
    // }
    const handleHover = (index) => {
        setHover(true)
        setHoverIcon(index)
    }
    // const handleInputChange = (e) => {
    //     console.log(e.target.value)
    // }

    const searchIcons = (event) => {
        const iconSearched = icons.filter((item) =>
            item.iconName.toLowerCase().includes(event.target.value)
        )
        // console.log(iconSearched);
        // console.log(event.target);
        setsearchedIcons(iconSearched);
        setsearchedText(event.target.value);

    }

    return (
        <>
            {!isDisabled && <FormGroup>
                <FormControl fullWidth variant="outlined" className='my-3'>
                    <InputLabel id="defaultSelect">Validations</InputLabel>
                    <Select
                        labelId="defaultSelect"
                        id="defaultSelect"
                        label="Validations"
                        defaultValue="none"
                        value={props.element.customOptions.validation}
                        onChange={(event) => props.setValidationOptions(event)}
                        MenuProps={{
                            anchorOrigin: {
                                vertical: "bottom",
                                horizontal: "left"
                            },
                            getContentAnchorEl: null
                        }}
                    >
                        <MenuItem value={"none"} > None </MenuItem>
                        {validationOptions.map((file) => (
                            <MenuItem key={file.key} value={file.value} > {file.value} </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </FormGroup>}


            {/* <Grid item className='my-3 mb-4'>
                <div >
                <h6 className={classes.subHeading}>Input Mask:</h6>
                <FormControlLabel
                    className={`p-0 m-0`}
                    size="small"
                    control={
                    <>
                        <Button 
                          variant="outlined"
                          style={{outline:"none", textTransform:"capitalize"}}
                          size="small"
                          onClick={(e) => props.editElementCustomOptionsProp('isMasked', false, e)}
                          name="no"
                          color={isMasked ? "default" : "primary"}
                          className={`${classes.button} ml-3 mr-2`}
                          >
                            <span>No</span>
                            <Checkbox 
                            size="small"
                            className="p-0 ml-1"
                            color="primary"
                            name="no"
                            icon={<CircleUnchecked className="checkboxSize"/>}
                            checked={isMasked ? false : true}
                            checkedIcon={<CircleCheckedFilled className="checkboxSize"/>}
                            />
                          </Button>
                          <Button 
                          variant="outlined" 
                          style={{outline:"none", textTransform:"capitalize"}}
                          size="small"
                          color={isMasked ? "primary" : "default"}
                          onClick={(e) => props.editElementCustomOptionsProp('isMasked', true, e)}
                          name="yes"
                          className={`${classes.button} ml-2 mr-2`}
                          >
                            <span>Yes</span>
                            <Checkbox 
                            size="small"
                            className="p-0 ml-1"
                            color="primary"
                            name="yes"
                            icon={<CircleUnchecked className="checkboxSize"/>}
                            checked={isMasked ? true : false}
                            checkedIcon={<CircleCheckedFilled className="checkboxSize"/>}
                            />
                          </Button>
                    </>
                }
                />
                </div>
                {
                    isMasked &&
                    <Grid item className="my-4">
                        <Grid container direction={"row"} spacing={5}>
                            <Grid item style={{width:'100%'}} className="my-2">
                                <TextField
                                    variant='outlined'
                                    type="text"
                                    //size='small'
                                    label="Mask Details"
                                    fullWidth
                                    value={props.element.customOptions.maskedValue}
                                    onChange={(e) => props.setInputMaskedValue(e)}
                                    InputProps={{
                                        endAdornment: (
                                            <Tooltip placement="top-start" title={<p className={classes.tooltip}>{helpertext}</p>}>
                                            <InputAdornment>
                                            <IconButton style={{padding:"0"}}>
                                            <InfoIcon className={classes.icon} />
                                            </IconButton>
                                          </InputAdornment>
                                          </Tooltip>
                                       )
                                      }}
                                    // helperText={helpertext} 
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                }
            </Grid> */}

            <List dense>

                <ListItem style={{ padding: '0' }}>
                    <ListItemText className={classes.list1}>
                        Icon as Suffix:
                    </ListItemText>

                    <Button
                        className={
                            checkedIcon === ''
                                ? classes.broweseIcon
                                : classes.broweseIcon1
                        }
                        variant="outlined"
                        onClick={handleIconOpen}
                    >
                        <Icon className={classes.symbol1}>
                            {checkedIcon && !open ? (
                                checkedIcon
                            ) : (
                                <AddIcon />
                            )}
                        </Icon>
                        <br />
                        <span>



                            {checkedIcon && !open ? '' : 'BROWSE ICON'}


                        </span>
                    </Button>

                    <Dialog
                        style={{ background: 'rgba(0,0,0,0.5)' }}
                        aria-labelledby="customized-dialog-title"
                        open={open}
                        onClose={handlePopup}
                        classes={{ paper: classes.dialogPaper }}
                    >
                        <DialogTitle id="customized-dialog-title"
                            className={classes.dialogTitle} >
                            <h6 className={`${classes.titletext} mx-4 my-3 `}>Browse Icon</h6>
                            <IconButton
                                onClick={handlePopup}
                                className={classes.selectIcon}
                            >
                                <CloseIcon style={{ fontSize: '1.3rem' }} />
                            </IconButton>
                        </DialogTitle>

                        <DialogContent  >
                            <Typography gutterBottom>
                                <TextField
                                    fullWidth
                                    type='text'
                                    value={searchedText}
                                    label="Search Icons"
                                    variant="outlined"
                                    placeholder="Search Icons"
                                    autoFocus={searchedText}
                                    // onChange={handleInputChange}
                                    onChange={(event) => searchIcons(event)}
                                    //InputLabelProps={{ shrink: true }}
                                    // onChange={e => { setsearchTerm(e.target.value) }}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment>
                                                <IconButton>
                                                    <SearchIcon />
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Typography>
                            <Grid container justify="space-between " alignItems="center" className={classes.iconGrid}>
                                {searchedIcons.map((x, index) => {
                                    return (
                                        <Grid item md={2} key={index}
                                            onMouseOver={() => handleHover(index)}
                                            onMouseLeave={() => setHover(false)}
                                            onClick={(e) => iconSelect(e, x, index)}
                                            className={`${hover && hoverIcon === index ? classes.iconhover : clickedIcon && selectIconIndex === index ? classes.selectedIconBox : classes.iconContainer} flex items-center justify-center h-50 p-4`} >
                                            <Checkbox icon={<CircleUnchecked className="h5" />} checkedIcon={<CircleCheckedFilled className="h5" />} size="small" color="primary" checked={clickedIcon && selectIconIndex === index ? true : false} className={(hover && hoverIcon === index) || (clickedIcon && selectIconIndex === index) ? classes.checkboxShow : classes.checkboxHide} />
                                            <Icon className="material-icons-two-tone"

                                                value={x.icon}> {x.icon} </Icon>
                                        </Grid>
                                    )
                                })}
                            </Grid>
                        </DialogContent>
                        <DialogActions>
                            <Button
                                onClick={() => { props.handleSelectedIcon(selectIcon); setOpen(false); }}
                                color="primary"
                                variant="contained"

                            >
                                Submit
                            </Button>
                        </DialogActions>
                    </Dialog>

                </ListItem>

            </List>
        </>
    )
}
