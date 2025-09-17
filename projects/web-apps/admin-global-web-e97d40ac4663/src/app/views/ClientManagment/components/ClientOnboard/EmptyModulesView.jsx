import React from 'react'
import {
    Grid,
    Typography,
    Input,
    IconButton,
    InputAdornment,
    Button
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
//import { V5GlobalStepper, PopUp, ConfirmationDialog, EmailPopUp } from './components';
import {  useSelector } from 'react-redux';

const useStyles = makeStyles(({ palette, ...theme }) => ({
    basicTable: {
        fontFamily: 'SF Pro Display',
        borderCollapse: 'collapse',
        width: '100%',
        borderRadius: '3px',
        borderStyle: 'hidden', /* hide standard table (collapsed) border */
        boxShadow: '0 0 0 1px #0000001F', /* this draws the table border  */
        marginTop: '10px'
    },

    td: {
        border: '1px solid #0a0a0a',
        textAlign: 'left',
        padding: '16px 12px',
    },

    th: {
        border: '1px solid #0000001F',
        textAlign: 'left',
        padding: '16px 12px',
    },

    heading: {
        color: '#000000DE',
        opacity: 0.54,
        fontSize: '16px',
        minWidth: '130px'
    },
    emptyImg: {
        filter: "grayscale(100%)",
    },
    emptyModuleHeader: {
        opacity: '0.3',
        textAlign: 'center',
        fontSize: '2rem',
        marginTop: '14px'
    },
    link: {
        textDecoration: 'underline',
        color: '#2C3E93',
        marginLeft: '5px'
    }
}))

function EmptyModulesView(props) {
    const {
        shareMail,
        clientId,
        pageMode,
        createRole,
        createModule
    } = props
    //const classes = useStyles();
    const { clientCredentialDetails } = useSelector((state) => state.clients);
    const [showPassword, setShowPassword] = React.useState(false);
    // const [emailPopupOpen, setEmailPopupOpen] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const classes = useStyles();
    // const dispatch = useDispatch();

    const handleShareMail = () => {
        shareMail();
    }

    const heading = pageMode === 'add' && clientId ? 'Client onboarded successfully without created any modules.': 'No Modules have been created yet.';

    return (
        <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
        >
            <Grid item xs={12}>
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    alignContent="center"
                    style={{ minHeight: '200px' }}
                >
                    <Grid item>
                        <img src="/assets/images/No Data Illustration-3.svg" className={classes.emptyImg} alt="img" />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography className={classes.emptyModuleHeader}>
                            {heading}
                        </Typography>
                        { pageMode === 'edit' ?
                        <Typography className="text-center mt-2">
                            Click here to 
                            <span onClick={createModule} className={`${classes.link} cursor-pointer`}>
                                CREATE MODULE
                            </span>
                        </Typography>
                        : null}
                    </Grid>
                    { pageMode === 'add' &&  clientId?
                    <Grid item xs={12} sm={4}>
                        <table className={classes.basicTable}>
                            <tbody>
                            <tr>
                                <td
                                    className={`${classes.th} ${classes.heading}`}>
                                    Client ID
                                </td>
                                <td
                                    className={`${classes.th}`}>
                                    {clientCredentialDetails.clientId}
                                </td>
                            </tr>
                            <tr>
                                <td
                                    className={`${classes.th} ${classes.heading}`}>
                                    Password
                                </td>
                                <td
                                    className={`${classes.th}`}>
                                    <Input
                                        id="standard-adornment-password"
                                        type={showPassword ? "text" : "password"}
                                        value={clientCredentialDetails.password}
                                        // onChange={handleChangePassword}
                                        disableUnderline={true}
                                        inputProps={{ readOnly: true }}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </Grid>
                    :
                    null
                    }
                </Grid>
                { pageMode === 'add' && clientId ?
                <Grid 
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    className="mt-8"
                    >
                    <Grid item xs={12} sm={4} className="flex" justifyContent="space-between">
                        <Button className="color-primary" style={{
                                maxHeight: '35px',
                                minWidth: '91px',
                                minHeight: '35px',
                            }} 
                            onClick={handleShareMail}>
                            Share Via Mail
                        </Button>
                        <Button
                            variant="outlined"
                            className="color-primary"
                            style={{
                                maxHeight: '35px',
                                minWidth: '91px',
                                minHeight: '35px',
                                border:"1px solid #2C3E93"
                            }}
                            onClick={createRole}
                            >
                                Create Roles
                            </Button>
                    </Grid>
                </Grid>
                : null
                }
            </Grid>
        </Grid>
    )
}

EmptyModulesView.propTypes = {}

EmptyModulesView.defaultProps = {}

export default EmptyModulesView