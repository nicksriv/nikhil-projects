import React, { useEffect, useState } from 'react'
import {
    Drawer,
    IconButton,
    Grid,
    Button,
    Box,
    ListItemText,
    //Switch,
    FormControl,
   
   
    TextField,
    List,
    ListItem,
    MenuItem,
   
    Typography,
    Icon,
    Checkbox,
} from '@material-ui/core'
import {
    makeStyles,
    withStyles, //ThemeProvider
} from '@material-ui/core/styles'
import CircleCheckedFilled from '@material-ui/icons/CheckCircle'
import CircleUnchecked from '@material-ui/icons/RadioButtonUnchecked'
import AddIcon from '@material-ui/icons/Add'
//import useSettings from 'app/hooks/useSettings';
import clsx from 'clsx'
import CloseIcon from '@material-ui/icons/Close'
import Dialog from '@material-ui/core/Dialog'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import MuiDialogContent from '@material-ui/core/DialogContent'
import MuiDialogActions from '@material-ui/core/DialogActions'
import InputAdornment from '@material-ui/core/InputAdornment'
import SearchIcon from '@material-ui/icons/Search'
//import history from 'helper/history.js';
import { useSelector } from 'react-redux'
import {
    MuiThemeProvider, // createMuiTheme,
    createTheme,
} from '@material-ui/core/styles'

const drawerWidth = 310
const custom = createTheme({
    palette: {
        primary: {
            main: '#2C3E93',
        },
    },
})

const useStyles = makeStyles(({ palette, custom, ...theme }) => ({
    miniCart: {
        width: '376px',
        '& .cart__topbar': {
            height: 'var(--topbar-height)',
            backgroundColor: '#2C3E93',
            color: '#000000DE',
        },
        '& .mini-cart__item': {
            transition: 'background 300ms ease',
            '&:hover': {
                background: 'rgba(0,0,0,0.01)',
            },
        },
    },
    '& .MuiInputLabel-root': {
        color: '#00000099',
        fontWeight: '400',
    },

    textField: {
        marginTop: '-10px',
        '&:hover': {
            cursor: 'pointer !important',
        },
    },
    menuPaper: {
        maxHeight: '12rem',
    },
    broweseIcon: {
        backgroundColor: 'white',
        width: '38%',
        height: '99px',
        marginLeft: '-20px',

        display: 'block',
        // WebGLTransformFeedback: "keep-all",
        textAlign: 'center',
        // borderStyle: 'dotted',
        position: 'relative',
        color: 'grey',
        top: '-10px',
        left: '-108px',
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
        width: '38%',
        height: '99px',
        marginLeft: '-20px',

        display: 'block',
        // WebGLTransformFeedback: "keep-all",
        textAlign: 'center',
        position: 'relative',
        top: '-10px',
        left: '-108px',
        color: ' #2C3E93',
        backgroundColor: '#F7F8FC',
        border: '1px solid #2C3E93',
    },
    symbol1: {
        color: 'black',
    },
    browseWord: {
        lineHeight: '1px',
        whiteSpace: 'nowrap',
        //overflow:"hidden",
        textOverflow: 'clip',
        marginLeft: '-10px',

        fontSize: '12px',
    },
    iconGrid: {
        // position: 'relative',
        marginTop: '5px',
        padding: '3px',
        maxHeight: '65%',
        overflowY: 'scroll',
        '&::-webkit-scrollbar': {
            width: '0em',
        },
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
    list1: {
        marginTop: '-15px',
        marginLeft: '10px',
        fontSize: '4px',
    },
    dialogPaper: {
        height: '400px',
        width: '350px',
        position: 'relative',
        top: '16px',
        left: '140px',
    },
    dialogTitle: {
        backgroundColor: '#2C3E93',
        color: '#000000DE',
        height: '49px',
        padding: '3px',
    },
    close: {
        color: '#00000099',
    },
    selectIcon: {
        marginLeft: '300px',
        marginTop: '-55px',
        color: '#00000099',
        padding: '5px',
    },
    drawer: {
        width: drawerWidth,
    },
    drawerPaper: {
        width: drawerWidth,
        alignItems: 'center',
    },

    listItemText: {
        fontSize: '2px',
        color: 'black',
    },
    switch: {
        marginTop: '-19px',
        marginLeft: '-31px',
        height: '25px',
    },
    formControl: {
        minWidth: 300,
        color: 'grey',
        marginTop: '-35px',
    },
    select: {
        position: 'relative',
        top: '10px',
        left: '12px',
    },
    button: {
        border: '1px solid #2C3E93',
        width: '152px',
        height: '35px',
        marginTop: '55px',
        marginLeft: '25px',
        marginBottom: '80px',
    },
    button1: {
        backgroundColor: '#2C3E93',
        width: '152px',
        height: '35px',
        marginTop: '55px',
        marginLeft: '25px',
        marginBottom: '80px',
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
    selectedIconBox: {
        border: '1px solid #2C3E93',
        position: 'relative',
        padding: '0.6rem',
        cursor: 'pointer',
        margin: '0.8rem',
    },
    inctvBtn: {
        //backgroundColor: "lightgray",
        border: '1px solid #2C3E93',
        marginRight: '0.6rem',
    },
    button0: {
        marginRight: '0.6rem',
        border: '1px solid lightgray',
    },
    actvBtn: {
        border: '1px solid #2C3E93',
        marginRight: '0.6rem',
    },
    font: {
        fontSize: '1.1rem',
    },
    yes: {
        position: 'relative',
        bottom: '0.5rem',
    },
    text: {
        color: '#2C3E93',
        margin: 0,
        padding: 0,
    },
    null: {
        margin: 0,
        padding: 0,
    },
}))
const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    labelAsterisk: {
        color: 'red',
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

const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions)

const V5GlobalSliderForm = ({
    open,
    solidBtnText,
    outlinedBtnText,
    fieldsList,
    handleClose,
    headerText,
    handleInputChange,
    handleSubmit,
}) => {
    const classes = useStyles()
    const [hover, setHover] = useState(false)
    const [clickedIcon, setClickedIcon] = useState(false)
    const [hoverIcon, setHoverIcon] = useState(null)
    const [selectIconIndex, setSelectIconIndex] = useState(null)
    const [checkedIcon, setCheckedIcon] = useState('all_out');
    const [requiredFieldHasValue, setRequiredFieldHasValue] = useState(false);
    const [reportName, setReportName] = useState('');
    const [parentModuleId, setParentModuleId] = useState('');
    const { addedReport } = useSelector((state) => state.report);
    //const [moduleName, setModuleName] = React.useState('');
    const {
        //moduleList,
        // createdModule,
        // clientModulesList,
        icons,
    } = useSelector((state) => state.screenBuilder)
    const [on, setOpen] = React.useState(false)

    // const [status, setStatus] = React.useState('NO')
    const [searchedIcons, setsearchedIcons] = React.useState([])

    useEffect(() => {
        setsearchedIcons(icons);
    }, [])

    const handleClickOn = () => {
        if (!on) {
            setOpen(true);
        } else {
            setOpen(false);
        }
    }
    const handlend = () => {
        setOpen(false);
        setCheckedIcon('all_out');
    }

    const handleDrawerToggle = () => {
        handleClose();
        setCheckedIcon('all_out');
    }

    const selectedIcon = (event) => {
        setOpen(false)
    }

    const handleHover = (index) => {
        setHover(true)
        setHoverIcon(index)
    }
    const searchIcons = (e) => {
        const iconSearched = icons.filter((item) =>
            item.iconName.toLowerCase().startsWith(e.target.value)
        )
        setsearchedIcons(iconSearched)
    }

    const iconSelect = (e, x, index) => {
        setCheckedIcon(x.icon)
        setHover(false)
        setClickedIcon(true)
        setSelectIconIndex(index)
    }

    const handleSubmitData = () => {
        setCheckedIcon('all_out');
        // handleSubmit();
    }

    const handleUpdate = (event, isRequired) => {
        const { name, value } = event.target;
        if (name === "name") {
            setReportName(value);
        } else if (name === "parentModuleId") {
            setParentModuleId(value)
        }
        handleInputChange({ target: { name, value } })

    }

    useEffect(() => {
        handleInputChange({ target: { name: 'icon', value: checkedIcon } });
    }, [checkedIcon, open]);

    useEffect(() => {
        if (reportName && parentModuleId) {
            setRequiredFieldHasValue(true);
        } else {
            setRequiredFieldHasValue(false);
        }
    }, [reportName, parentModuleId])

    return (
        <Drawer
            className={`${classes.drawer} w-full`}
            //width="w-full"
            // container={container}
            variant="temporary"
            anchor="right"
            open={open}
            onClose={handleDrawerToggle}
            ModalProps={{
                keepMounted: true,
            }}
        >
            <Grid className={clsx('flex-column ', classes.miniCart)}>
                <div className="cart__topbar flex justify-between items-center p-1 mb-10 pl-4">
                    <h5 className={`${classes.font} my-0 font-medium`}>
                        {headerText}
                    </h5>
                    <IconButton onClick={handleDrawerToggle}>
                        <CloseIcon className={classes.close} />
                    </IconButton>
                </div>
            </Grid>
            <Box sx={{ m: 3 }}>
                { }
                <MuiThemeProvider theme={custom}>
                    <FormControl fullWidth>
                        {fieldsList.map((field) => {
                            return <TextField
                                //color="primary"
                                select={field.select}
                                required={field.required}
                                type={field.fieldType}
                                // InputLabelProps={{}}
                                id="filled-required"
                                label={field.fieldLabel}
                                variant="outlined"
                                name={field.fieldName}
                                value={field.fieldName === "name" ? addedReport.name : '' || (field.fieldName === "parentModuleId" && addedReport.parentModuleId)}
                                onChange={(e) => handleUpdate(e, field.required)}
                                className={field.class}
                                InputLabelProps={{
                                    classes: {
                                        asterisk: 'text-error',
                                        className: classes.input,
                                    },
                                }}
                            >
                                {field.selectOptions?.map((option) => {
                                    return <MenuItem value={option.id} key={option.id}>{option.name}</MenuItem>
                                })}
                            </TextField>
                        })}

                    </FormControl>
                </MuiThemeProvider>
            </Box>

            {/* <List>
                <ListItem>
                    <ListItemText className={classes.list1}>
                        <p>Keep it as Sub module:</p>
                    </ListItemText>
                    <ListItemText>
                        <FormControlLabel
                            className={`${classes.yes} p-0 m-0`}
                            size="small"
                            control={
                                <>
                                    <Button
                                        variant="outlined"
                                        size="small"
                                         onClick={(e) => handleClick(e)}
                                        name="NO"
                                        className={
                                            status === 'NO'
                                                ? classes.inctvBtn
                                                : classes.button0
                                        }
                                    className={!createdModule.isChildModule ? classes.inctvBtn : classes.button0}
                                    >
                                        <span
                                            className={
                                                status === 'NO'
                                                    ? classes.text
                                                    : classes.null
                                            }
                                        >
                                            NO
                                        </span>
                                        <span className={!createdModule.isChildModule ? classes.text : classes.null}>NO</span>
                                        <Checkbox
                                            size="small"
                                            className="p-0 ml-1"
                                            color="primary"
                                            name="NO"
                                            onClick={(e) => handleClick(e)}
                                            icon={<CircleUnchecked />}
                                            checked={
                                                status === 'NO' ? true : false
                                            }
                                            checked={createdModule.isChildModule}
                                            checkedIcon={
                                                <CircleCheckedFilled />
                                            }
                                        />
                                    </Button>

                                    <Button
                                        variant="outlined"
                                        size="small"
                                        onClick={(e) => handleClick(e)}
                                        name="YES"
                                        className={
                                            status === 'YES'
                                                ? classes.actvBtn
                                                : classes.button0
                                        }
                                    className={createdModule.isChildModule ? classes.actvBtn : classes.button0}
                                    >
                                        <span
                                            className={
                                                status === 'YES'
                                                    ? classes.text
                                                    : classes.null
                                            }
                                        >
                                            YES
                                        </span>
                                        <span className={createdModule.isChildModule ? classes.text : classes.null}>YES</span>
                                        <Checkbox
                                            size="small"
                                            className="p-0 ml-1"
                                            color="primary"
                                            name="YES"
                                            onClick={(e) => handleClick(e)}
                                            icon={<CircleUnchecked />}
                                            checked={
                                                status === 'YES' ? true : false
                                            }
                                            checked={createdModule.isChildModule}
                                            checkedIcon={
                                                <CircleCheckedFilled />
                                            }
                                        />
                                    </Button>
                                </>
                            }
                        />
                    </ListItemText>
                </ListItem>
            </List> */}
            <div>

                <div>
                    {' '}
                    <List dense>
                        <ListItem>
                            <ListItemText className={classes.list1}>
                                Select Icon:
                            </ListItemText>
                            <Button
                                className={
                                    checkedIcon === ''
                                        ? classes.broweseIcon
                                        : classes.broweseIcon1
                                }
                                variant="outlined"
                                onClick={handleClickOn}
                            >
                                <Icon className={classes.symbol1}>
                                    {checkedIcon && !on ? (
                                        checkedIcon
                                    ) : (
                                        <AddIcon />
                                    )}
                                </Icon>{' '}
                                <br />
                                <span>
                                    {checkedIcon && !on ? '' : 'BROWSE ICON'}
                                </span>
                            </Button>
                            <Dialog
                                onClose={handlend}
                                aria-labelledby="customized-dialog-title"
                                open={on}
                                classes={{ paper: classes.dialogPaper }}
                            >
                                <DialogTitle
                                    id="customized-dialog-title"
                                    className={classes.dialogTitle}
                                >
                                    <h5 className=" font-medium mx-4 my-2 ">
                                        Browse Icon
                                    </h5>{' '}
                                    <IconButton
                                        onClick={handlend}
                                        className={classes.selectIcon}
                                    >
                                        <CloseIcon />
                                    </IconButton>
                                </DialogTitle>
                                <DialogContent>
                                    <Typography gutterBottom>
                                        <TextField
                                            fullWidth
                                            label="Search Icons"
                                            variant="outlined"
                                            onChange={(e) => searchIcons(e)}
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

                                    <Grid container></Grid>

                                    <Typography gutterBottom></Typography>

                                    <Grid
                                        container
                                        justify="space-between "
                                        alignItems="center"
                                        // style={{maxHeight:"65%",overflowY:"scroll"}}
                                        className={classes.iconGrid}
                                    >
                                        {searchedIcons.map((x, index) => {
                                            return (
                                                <Grid
                                                    item
                                                    md={2}
                                                    key={index}
                                                    onClick={(e) =>
                                                        iconSelect(e, x, index)
                                                    }
                                                    onMouseOver={() =>
                                                        handleHover(index)
                                                    }
                                                    onMouseLeave={() =>
                                                        setHover(false)
                                                    }
                                                    className={`${hover &&
                                                        hoverIcon === index
                                                        ? classes.iconhover
                                                        : clickedIcon &&
                                                            selectIconIndex ===
                                                            index
                                                            ? classes.selectedIconBox
                                                            : classes.iconContainer
                                                        } flex items-center justify-center h-50 p-4`}
                                                >
                                                    <Checkbox
                                                        icon={
                                                            <CircleUnchecked className="h5" />
                                                        }
                                                        checkedIcon={
                                                            <CircleCheckedFilled className="h5" />
                                                        }
                                                        size="small"
                                                        color="primary"
                                                        checked={
                                                            clickedIcon &&
                                                                selectIconIndex ===
                                                                index
                                                                ? true
                                                                : false
                                                        }
                                                        className={
                                                            (hover &&
                                                                hoverIcon ===
                                                                index) ||
                                                                (clickedIcon &&
                                                                    selectIconIndex ===
                                                                    index)
                                                                ? classes.checkboxShow
                                                                : classes.checkboxHide
                                                        }
                                                    />

                                                    <Icon
                                                        className="material-icons-two-tone"
                                                        id="select"
                                                        value={x.icon}
                                                    >
                                                        {x.icon}
                                                    </Icon>
                                                </Grid>
                                            )
                                        })}
                                    </Grid>
                                </DialogContent>
                                <DialogActions>
                                    <Button
                                        onClick={selectedIcon}
                                        color="primary"
                                        variant="contained"
                                    >
                                        SUBMIT
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </ListItem>
                    </List>
                </div>

                <Grid spacing={5} direction="row">
                    <Button
                        variant="outlined"
                        //disabled={buttondisable}
                        color="primary"
                        className={classes.button}
                    // onClick={handleDrawerToggle}
                    >
                        {outlinedBtnText}
                    </Button>

                    <Button
                        disabled={!requiredFieldHasValue}
                        variant="contained"
                        color="primary"
                        className={classes.button1}
                        onClick={handleSubmit}
                    >
                        {solidBtnText}
                    </Button>
                </Grid>
            </div>
        </Drawer>
    )
}

export default V5GlobalSliderForm