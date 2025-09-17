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
import { useSelector, useDispatch } from 'react-redux'
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

// const formLabelsTheme = createMuiTheme({
//     overrides: {
//         MuiFormLabel: {
//             asterisk: {
//                 color: '#db3131',
//                 '&$error': {
//                     color: '#db3131',
//                 },
//             },
//         },
//     },
// })
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
        // marginTop: '-10px',
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
    //  symbol1:{
    //      fontWeight:"normal",

    // //    transform: "scale(2,1.5)",
    //     marginTop:"10px",
    // //    marginLeft:"6px"

    //  },
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
        // marginTop: '-35px',
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
// const style = {
//     root: {
//         height: '700',
//     },
// }
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

const CloneWorkflow = ({
    container,
    open,
    handleClose,
    handleInputChange,
    handleSubmit,
    subModule
}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    //const [symbol, setSymbol] = React.useState('add');
    //const [checked, setChecked] = React.useState(false);
    //const [disable, setDisable] = React.useState(true);
    //const [buttondisable, setButtondisable] = React.useState(false)
    //const { settings } = useSettings();
    //const [ParentModuleName, setParentModuleName] = React.useState([]);
    const [hover, setHover] = useState(false)
    const [clickedIcon, setClickedIcon] = useState(false)
    const [hoverIcon, setHoverIcon] = useState(null)
    const [selectIconIndex, setSelectIconIndex] = useState(null)
    const [checkedIcon, setCheckedIcon] = useState('')
    const [subModuleName, setSubModuleName] = useState('')
    const [error, setError] = useState(false);
    //const [moduleName, setModuleName] = React.useState('');
    const {
        //moduleList,
        cloneWorkflowDetails,
        clientModulesList,
        icons,
    } = useSelector((state) => state.screenBuilder);
    const {
        activeClientsList
    } = useSelector((state) => state.clients);

    const [on, setOpen] = React.useState(false)

    const [status, setStatus] = React.useState('NO')
    const [searchedIcons, setsearchedIcons] = React.useState([])

    useEffect(() => {
        setsearchedIcons(icons)
    }, [])

    useEffect(() => {
        setSubModuleName(`Copy Of ${subModule.name}`)
        dispatch({
            type: "setCloneWorkflowFormValuesAction",
            payload: {
                name: "moduleName",
                value: `Copy Of ${subModule.name}`
            }
        })
    }, [open])

    const handleClickOn = () => {
        if (!on) {
            setCheckedIcon('')
            setOpen(true)
            //setButtondisable(true)
        } else {
            setOpen(false)
            //setButtondisable(false)
        }
    }
    const handlend = () => {
        setOpen(false)
        //setButtondisable(false)
        setCheckedIcon(null)
    }

    // const handleSubmit = () => {
    //     setOpen(false)
    //     setButtondisable(false)
    // }

    // const handleClick = (e) => {
    //     //console.log(e.target.innerText)
    //     const {
    //         innerText,
    //         name,
    //         //checked
    //     } = e.target
    //     if (innerText) {
    //         setStatus(innerText)
    //         handleInputChange({
    //             target: {
    //                 name: 'isChildModule',
    //                 value: innerText === 'YES' ? true : false,
    //             },
    //         })
    //         if (innerText === 'NO' && createdModule.parentModuleName) {
    //             handleInputChange({
    //                 target: { name: 'parentModuleName', value: '' },
    //             })
    //         }
    //         //handleInputChange({ target: { name: "isChildModule", value: checked } });
    //     } else {
    //         setStatus(name)
    //         handleInputChange({
    //             target: {
    //                 name: 'isChildModule',
    //                 value: name === 'YES' ? true : false,
    //             },
    //         })
    //         if (name === 'NO' && createdModule.parentModuleName) {
    //             handleInputChange({
    //                 target: { name: 'parentModuleName', value: '' },
    //             })
    //         }
    //         //handleInputChange({ target: { name: "isChildModule", value: checked } });
    //     }
    // }
    // useEffect(() => {
    //     moduleList.data.map((item) => {
    //         setParentModuleName((prevValue) => Array.from(new Set([...prevValue, item.parentModuleName])));
    //     })
    // }, []);

    const handleDrawerToggle = () => {
        setCheckedIcon('')
        setClickedIcon(false)
        setStatus('NO')
        handleClose()
    }
    const validateModuleName = (fieldName, fieldValue) => {
        let isValid = false;
        const alphaNumericRegx = /^[\w\s]+$/;
        switch (fieldName) {
            case 'moduleName':
                //..Allow Alphabets only along with spaces
                if (
                    fieldValue === '' ||
                    fieldValue.trim().match(alphaNumericRegx)
                ) {
                    isValid = true;
                }
                break;
            default:
                isValid = true;
                break;
        }
        return isValid;
    }

    const handleUpdate = (event) => {
        const { name, value } = event.target;
        if (!validateModuleName(name, value)) return;
        handleInputChange(event)

        if (name === 'parentModuleName') {
            const moduleInfo = clientModulesList.find((x) => x.name === value)
            handleInputChange({
                target: { name: 'parentModuleId', value: moduleInfo.id },
            })
        }
        if (name === 'moduleName') {
            setSubModuleName(value)
        }
        // else if (name === "moduleName") {
        //     //console.log(moduleName.length);
        //     setModuleName(value);
        // }

        if ( name === 'clientId') {
            dispatch({
                type: 'getClientModulesAction',
                payload: {
                    clientId: "",
                    id: value
                }
            });
            handleInputChange({
                target: { name: 'parentModuleId', value: '' }
            });
        }
        if (!value.match(/^[ A-Za-z0-9]*$/)) {
            setError(true);
        } else {
            setError(false)
        }
    }
    const selectedIcon = (event) => {
        //setSymbol(event.target.innerText)
        //setBrowse(null)
        setOpen(false)
        //setButtondisable(false)
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
        handleInputChange({ target: { name: 'moduleIcon', value: x.icon } })
    }

    return (
        // <ThemeProvider theme={custom}>
        <Drawer
            className={`${classes.drawer} w-full`}
            //width="w-full"
            container={container}
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
                        Clone Workflow
                    </h5>
                    <IconButton onClick={handleDrawerToggle}>
                        <CloseIcon className={classes.close} />
                    </IconButton>
                </div>
            </Grid>
            <Box sx={{ m: 3 }} className="mb-5">
                { }
                <MuiThemeProvider theme={custom}>
                    <FormControl fullWidth>
                        <TextField
                            //color="primary"
                            required
                            // InputLabelProps={{}}
                            id="filled-required"
                            label="Sub Module Name"
                            variant="outlined"
                            name="moduleName"
                            value={subModuleName}
                            error={subModuleName.match(/^[ A-Za-z0-9]*$/) ? false : true}
                            helperText={subModuleName.match(/^[ A-Za-z0-9]*$/) ? "" : `Please enter alphanumeric characters only`}
                            onChange={handleUpdate}
                            className={classes.textField}
                            InputLabelProps={{
                                classes: {
                                    asterisk: 'text-error',
                                    className: classes.input,
                                },
                            }}
                        />
                    </FormControl>
                </MuiThemeProvider>
            </Box>
            <Box sx={{ m: 3 }} className="mb-5">
                <TextField
                    id="clientId"
                    select
                    fullWidth
                    name="clientId"
                    label="Select client"
                    type="text"
                    required
                    InputLabelProps={{
                        classes: {
                            asterisk: 'text-error'
                        }
                    }}
                    variant="outlined"
                    value={cloneWorkflowDetails.clientId}
                    onChange={handleUpdate}
                    disabled={localStorage.getItem('typeOfUser') === "Client"}
                >
                    {
                        activeClientsList && activeClientsList.map((c) =>
                            <MenuItem
                                key={c.id}
                                name={c.id}
                                value={c.id}
                            >
                                {c.clientId}: {c.clientName}
                            </MenuItem>
                        )
                    }
                </TextField>
                {/* { }
        <FormControl fullWidth className={classes.formControl}>
            <InputLabel
                className={classes.select}
            //  shrink
            //htmlFor="Parent Module Name-label-placeholder"
            >
                Client ID
            </InputLabel>
            <Select
                id="dropdown"
                //disabled={createdModule.isChildModule}
                labelId="demo-simple-select-label"
                value={cloneWorkflowDetails.clientId}
                name="clientId"
                label="Select clients"
                onChange={handleUpdate}
                variant="outlined"
                displayEmpty
                MenuProps={{
                    anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'left',
                    },
                    getContentAnchorEl: null,
                    classes: {
                        paper: classes.menuPaper,
                    },
                }}
            >
                {activeClientsList.map((c) => {
                    return (
                        <MenuItem
                            key={c.id}
                            name={c.id}
                            value={c.id}
                        >
                            {c.clientName}
                        </MenuItem>
                    )
                })}
            </Select>
        </FormControl> */}
            </Box>
            <Box sx={{ m: 3 }} className="mb-5">
                { }
                <FormControl fullWidth className={classes.formControl}>
                    {/* <InputLabel
                        className={classes.select}
                    //  shrink
                    //htmlFor="Parent Module Name-label-placeholder"
                    >
                        Select Parent Module
                    </InputLabel> */}
                    <TextField
                        select
                        id="dropdown"
                        fullWidth
                        type="text"
                        required
                        //disabled={createdModule.isChildModule}
                        // labelId="demo-simple-select-label"
                        value={cloneWorkflowDetails.parentModuleId}
                        name="parentModuleId"
                        label="Select Parent Module"
                        onChange={handleUpdate}
                        variant="outlined"
                        displayEmpty
                        InputLabelProps={{
                            classes: {
                                asterisk: 'text-error',
                            },
                        }}
                        MenuProps={{
                            anchorOrigin: {
                                vertical: 'bottom',
                                horizontal: 'left',
                            },
                            getContentAnchorEl: null,
                            classes: {
                                paper: classes.menuPaper,
                            },
                        }}
                    >
                        {clientModulesList.map((m) => {
                            return (
                                <MenuItem
                                    key={m.id}
                                    name={m.id}
                                    value={m.id}
                                >
                                    {m.name}
                                </MenuItem>
                            )
                        })}
                    </TextField>
                </FormControl>
            </Box>

            <div className="mt-5">
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
                                    Submit
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
                    onClick={handleDrawerToggle}
                >
                    CANCEL
                </Button>

                <Button
                    disabled={
                        (subModuleName.length > 0 && 
                            cloneWorkflowDetails.parentModuleId)
                            ? false
                            : true
                    }
                    variant="contained"
                    color="primary"
                    className={classes.button1}
                    onClick={handleSubmit}
                >
                    CLONE
                </Button>
            </Grid>
        </Drawer>
        // </ThemeProvider >
    )
}

CloneWorkflow.propTypes = {}

CloneWorkflow.defaultProps = {}

export default CloneWorkflow;
