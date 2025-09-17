import { Drawer, MenuItem, Select } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import CloseIcon from '@material-ui/icons/Close';
import V5GlobalFooterButtons from '../V5GlobalFooterButtons/V5GlobalFooterButtons';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setUserLogoId } from 'app/redux/AuthManagement/authManagementSlice';
import { setClientId } from 'app/redux/JobManagement/JobManagementSlice';

const useStyles = makeStyles(({ palette, ...theme }) => ({
    loginas: {
        width: 'var(--login-drawer-width)',
    },
    icon: {
        color: '#666666',
        fontSize: '2rem'
    },
    title: {
        color: '#000000DE',
        fontSize: '1.25rem'

    },
    description: {
        color: '#00000099',
        fontSize: "0.8rem",
        marginBottom: '1.5rem'
    },
    logo: {
        width: "120px",
        objectFit: "contain"
    }

}))

function LoginAs({ handleDrawerToggle, panelOpen }) {

    const [open, setOpen] = useState(true);
    const [activeClients, setActiveClients] = useState([]);
    const [selectedClientIdLocal, setSelectedClientsId] = useState("");
    const [selectedClientLogoId, setSelectedClientLogoId] = useState("");
    const [selectedClient, setSelectedClient] = useState("");
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const { activeClientsList } = useSelector((state) => state.clients);
    const { clientIdForUsers,
        // clientIdForUserLogo
     } = useSelector((state) => state.users);
    const { userFilterDetails, pageSize, pageNumber } = useSelector((state) => state.users);
    useEffect(() => {
        setOpen(panelOpen);
        dispatch({ type: 'getClientsListAction' });
        if (activeClientsList && activeClientsList.length) {
            let listOfActiveClients = activeClientsList.filter((client) => {
                return client.status.toLowerCase() === "active"
            });
    
            setActiveClients(listOfActiveClients);
            initializeValue();
        }
    }, [panelOpen]);

    const closeDrawer = () => {
        handleDrawerToggle(!open);
    }

    const handleSelectClient = (client) => {
        setSelectedClientsId(client.clientId);
        setSelectedClientLogoId(client.id);
        setSelectedClient(client);
        dispatch({ type: setUserLogoId.type, payload: client.logoId });

    }

    const handleChange = (e) => {
        handleSelectClient(e.target.value);
    }

    const initializeValue = ()=> {
        let value = activeClientsList.filter((v)=>{
            return v.clientId === clientIdForUsers;
        })
        if (value && value.length) {
            handleSelectClient(value[0]);
        }
    }
    const saveData = () => {
        dispatch({
            type: 'setClientIdForUserAction',
            clientId: selectedClientIdLocal,
            clientLogoId: selectedClientLogoId
        });
        dispatch({
            type: "setRoleDetailsAction",
            payload: {
                name: "clientId",
                value: selectedClientIdLocal
            }
        })

        dispatch({ type: "getAllUsersAction", payload: { clientId: selectedClientIdLocal, pageNumber: pageNumber, size: pageSize, filter: userFilterDetails } });
        dispatch({ type: "restUploadUsersAction" });
        dispatch({type:'setClientIdAction',payload:{clientId:selectedClientLogoId}})
        setClientId({})
        handleDrawerToggle(!open);
        history.push('/user-management')
    }
    const handleCancel = () => {
        handleDrawerToggle(!open);
    }

    return (
        <div>
            <Fragment>
                <Drawer
                    width={'500px'}
                    variant="temporary"
                    anchor={'right'}
                    open={open}
                    onClose={closeDrawer}
                    ModalProps={{
                        keepMounted: true,
                    }}
                >
                    <div className={classes.loginas}>
                        <div className="flex justify-between items-center mt-3">
                            <img className={`ml-5 w-25 ${classes.logo}`} src="/assets/images/V5Globallogo.png" alt={"Logo"} />
                            <CloseIcon className={`mr-5 ${classes.icon} cursor-pointer`} onClick={closeDrawer} />
                        </div>
                        <div className="mt-15 flex flex-column items-start ml-5 mr-5 ">
                            <h4 className={classes.title}>Select a client</h4>
                            <p className={classes.description}>Please select a client that you would like to access. You can switch accounts at any time from your profile menu.</p>
                            <Select
                                id="demo-customized-select"
                                select
                                name="client"
                                label="Select a client"
                                type="text"
                                variant="outlined"
                                className="w-full"
                                onChange={handleChange}
                                value={selectedClient}
                            >
                                {activeClients.map((client) => {
                                    return <MenuItem value={client} key={client.clientName}>
                                        {client.clientName}
                                    </MenuItem>
                                })}
                            </Select>
                        </div>
                        <div>

                        </div>
                        <div className="position-bottom-right mb-5">
                            <V5GlobalFooterButtons outlinedButtonText="CANCEL" isDisabled={selectedClientLogoId ? false : true} solidButtonText="CONTINUE" saveData={saveData} handleCancel={handleCancel} />
                        </div>
                    </div>
                </Drawer>
            </Fragment>
        </div>
    )
}

export default LoginAs;
