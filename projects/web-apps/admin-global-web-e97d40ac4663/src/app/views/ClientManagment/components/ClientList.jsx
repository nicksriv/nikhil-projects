import React, { useEffect, useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, //Checkbox, 
    ClickAwayListener, FormControl, InputBase, MenuItem, Select } from '@material-ui/core';
import { styled } from "@material-ui/styles"
import Paginate from 'app/components/V5GlobalDataTable/Paginate';
import DataTable from 'app/components/V5GlobalDataTable/DataTable';
import { useDispatch, useSelector } from 'react-redux';
import { ConfirmationDialog, InfoDialogue } from 'app/components';
import history from 'helper/history.js';
import { setShowClientDetailsPopup } from 'app/redux/ClientManagement/clientManagementSlice';
import PopoverMenu from 'app/components/PopoverMenu/PopoverMenu';
import DetailsDailogue from 'app/components/DetailsDialogue/DetailsDailogue';

const BootstrapInput = styled(InputBase)(({ theme }) => ({
    'label + &': {
        marginTop: theme.spacing(3),
    },
    '& .MuiInputBase-input': {
        borderRadius: 0,

        // border: '1px solid gray',
        position: 'relative',
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #ced4da',
        fontSize: 14,
        marginLeft: "1.5rem",
        paddingLeft: "0.5rem",
        paddingRight: "2.5rem",
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            // '-apple-system',
            // 'BlinkMacSystemFont',
            // '"Segoe UI"',
            // //'Roboto',
            // '"Helvetica Neue"',
            // 'Arial',
            "SF Pro Display",
            'sans-serif',
            // '"Apple Color Emoji"',
            // '"Segoe UI Emoji"',
            // '"Segoe UI Symbol"',
        ].join(','),
        '&:focus': {
            borderRadius: 4,
            borderColor: '#80bdff',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
    },
}));

const useStyles = makeStyles(() => ({
    table: {
        minWidth: 650,
        marginTop: '1rem',
        borderRadius: '4px 4px 0px 0px',
        boxShadow: '0px 0px 1px gray',
    },
    iconsColor: {
        color: '#9f9f9e',
        display: 'flex',
        alignItems: 'center',
    },
    tableHeader: {
        backgroundColor: '#e4ebf7',
        whiteSpace: 'nowrap',
    },
    paginationCount: {
        marginLeft: 'auto',
        marginRight: '1%',
        marginTop: '1rem',
    },
    font: {
        fontSize: '14px',
        letterSpacing: '0.4px',
        color: '#000000DE',
        opacity: 0.7
    },
    paginationContainer: {
        height: "40px",
        display: "flex",
        alignItems: "center",
        marginBottom: "1rem",
        position: "sticky",
        bottom: 0,
        zIndex: 600,
        backgroundColor: "#f5f5f5",
        padding: "0 1rem"
    },
    tablePopupContainer: {
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
        marginTop: "0.3rem",
    },
    tablePopupHeading: {
        color: "#000000DE", padding: "0.5rem", margin: "0"

    },
    tablePopupIcon: {
        margin: "0.5rem 0.7rem 0 0.7rem",
        color: "#00000061"
    },
    popOverMenu: {
        boxShadow: "-1px 10px 20px lightgrey",
        width: "200px",
        overflowY: "scroll",
        maxHeight: "23rem",
        marginTop: "-0.5rem",
        zIndex: "10000",
        display: "flex",
        flexDirection: "column",
        '&::-webkit-scrollbar': {
            width: '0.4em'
        },
    },
}))

export default function ClientList({
    indexOfFirstData,
    indexOfLastData,
    paginate,
    page,
    heading,
    currentPage,
    pageSize,
    tableData,
    setPageSize,
    totalItems,
    filterDetails
}) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { clientsList, showClientDetailsPopup, clientCredentialDetails, clientFilterDetails,
        statuses } = useSelector((state) => state.clients);
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [selectedClientId, setSelectedClientId] = useState(null);
    const [selectedClientObjectId, setSelectedClientObjectId] = useState(null);
    const [credentialNotFound, setCredentialNotFound] = useState(false);
    const [columnToSort, setColumnToSort] = useState("");
    const [sortDirection, setSortDirection] = useState("DESC");
    const anchorRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const [filteredTableHeading, setFilteredTableHeading] = useState([]);
    const [checkedValues, setCheckedValues] = useState(["actionHeader"]);
    const [showPassword, setShowPassword] = useState(false);
    const [formattedCredentialDetails, setFormattedCredentialDetails] = useState({});
    const [showDraftInfoPopup, setShowDraftInfoPopup] = useState(false);
    const [showInactiveInfoPopup, setShowInactiveInfoPopup] = useState(false);

    // Event Handlers
    const invertDirection = {
        ASC: 'DESC',
        DESC: 'ASC'
    }
    useEffect(() => {
        const credObj = {
            "Joining Date": clientCredentialDetails.joiningDate,
            "Client ID": clientCredentialDetails.clientId,
            Password: clientCredentialDetails.password
        }
        setFormattedCredentialDetails(credObj);
    }, [clientCredentialDetails]);

    const handleEdit = (selectedClient) => {
        if (selectedClient
            && selectedClient.id) {
            const id = selectedClient.id;
            history.push(`/client/edit?id=${id}`);
        }
    }

    const handleDelete = (data) => {
        setSelectedClientId(data.clientId);
        setShowDeletePopup(true);
    }

    async function confirmDelete() {
        try {
            await dispatch({ type: 'deleteClientAction', payload: { _id: selectedClientId } });
            dispatch({ type: "getAllClientsAction", payload: { pageNumber: page, size: pageSize, filter: clientFilterDetails } });
            dispatch({ type: 'getClientsListAction' });
            setShowDeletePopup(false);
        } catch (error) {
            console.error(error);
        }
    };

    const handleView = (selectedClient) => {
        if (selectedClient
            && selectedClient.id) {
            const id = selectedClient.id;
            history.push(`/client/clientDetails/${id}`)
        }
    }

    const handleInfo = (data) => {
        const { clientId, status, id } = data;
        setSelectedClientId(clientId);
        setSelectedClientObjectId(id);
        if (status === statuses[0]) {
            if (data.credentialsAvailable) {
                dispatch({ type: "getClientCredentialDetailsAction", payload: { clientId } });
                dispatch({ type: setShowClientDetailsPopup.type, payload: true });
            } else {
                setCredentialNotFound(true);
            }
        } else if (status === statuses[1]
        ) {
            setShowInactiveInfoPopup(true);
        } else if (status === statuses[2]) {
            setShowDraftInfoPopup(true);
        }
    }
    const handleInfoBtnClick = (status) => {
        //..Inactive and Draft
        if (status === statuses[1] ||
            status === statuses[2]) {
            history.push(`/client/edit?id=${selectedClientObjectId}`);
        }
    }
    const hideDraftInfoPopup = () => {
        setShowDraftInfoPopup(false);
    }
    const hideInactiveInfoPopup = () => {
        setShowInactiveInfoPopup(false);
    }

    const closeClientDetailsPopup = () => {
        dispatch({ type: setShowClientDetailsPopup.type, payload: false });
        setShowPassword(false);
    }

    const shareMail = (data) => { }

    const changePassword = () => {
        dispatch({
            type: "changeClientPasswordAction",
            payload: {
                clientId: clientCredentialDetails.clientId,
                newPassword: {
                    newPassword: formattedCredentialDetails.Password
                }
            }
        });
    }

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const handleChangePassword = (e) => {
        let data = { ...formattedCredentialDetails };
        data.Password = e.target.value;
        setFormattedCredentialDetails(data);
    }
    const handleSort = (columnName) => {
        let converToUpperCase = columnName.toUpperCase().split(" ").join("_");
        setColumnToSort(converToUpperCase);
        setSortDirection(columnToSort === converToUpperCase ? invertDirection[sortDirection] : "ASC");
        dispatch({
            type: "setSortDirectionAction",
            direction: sortDirection,
            sortBy: columnToSort
        })
        dispatch({ type: "getAllClientsAction", payload: { pageNumber: currentPage, size: pageSize, sortBy: converToUpperCase, sortOrder: sortDirection, filter: clientFilterDetails } });
    }

    function selectColumn(key) {
        setCheckedValues(checkedValues.includes(key) ? checkedValues.filter(c => c !== key) : [...checkedValues, key]);
    }

    useEffect(() => {
        const filterHeading = heading.filter((el) => checkedValues.includes(el.key));
        setFilteredTableHeading(filterHeading);
    }, [checkedValues, showDeletePopup]);

    return (
        <div style={{ padding: "5px" }}>

            <PopoverMenu
                width={200}
                open={isOpen}
                onClose={() => setIsOpen(false)}
                anchorEl={anchorRef.current}
            >
                <ClickAwayListener onClickAway={() => setIsOpen(false)}>
                    {/* Keep your code here */}
                    <div className={`${classes.popOverMenu} py-4`}>
                        {heading.map((el, index) => {
                            return <div key={index} className={classes.tablePopupContainer}>
                                {el.icon ? null :
                                    <Button onClick={() => selectColumn(el.key)}
                                    style={{ justifyContent: "left" }} className={`w-full px-1 mt-1 ml-3 mr-1 pl-1 pr-1 ${checkedValues.includes(el.key) ? "color-primary border-primary" : "color-gray border-gray"}`}
                                    >
                                        {el.name}
                                    </Button>
                                }
                            </div>
                        })}
                    </div>
                </ClickAwayListener>
            </PopoverMenu>
            <DataTable
                hasDeleteIcon={true}
                hasEditIcon={true}
                hasInfoIcon={true}
                hasViewIcon={true}
                tableHeading={filteredTableHeading.length > 1 ? filteredTableHeading : heading}
                tableData={tableData}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                handleView={handleView}
                handleInfo={handleInfo}
                handleSort={handleSort}
                columnToSort={columnToSort}
                sortDirection={sortDirection}
                reference={anchorRef}
                setIsOpen={setIsOpen}
                isOpen={isOpen}
                filterDetails={filterDetails}
            />

            <div className={classes.paginationContainer}>
                <div className="flex items-end justify-centers">
                    <Paginate page={page} paginate={paginate} pageSize={pageSize} listSize={clientsList.size} />
                    <FormControl sx={{ m: 1 }} variant="standard">
                        <Select
                            labelId="demo-customized-select-label"
                            id="demo-customized-select"
                            input={<BootstrapInput />}
                            value={pageSize}
                            onChange={(e) => setPageSize(e.target.value)}

                        >
                            <MenuItem value={10}>10</MenuItem>
                            <MenuItem value={25}>25</MenuItem>
                            <MenuItem value={50}>50</MenuItem>
                            <MenuItem value={100}>100</MenuItem>
                        </Select>
                    </FormControl>
                    <p
                        className={`mb-2 font-normal ml-3 ${classes.font}`}
                        shrink
                        id="demo-simple-select-placeholder-label-label"
                    >
                        items per page
                    </p>
                </div>

                <div className={classes.paginationCount}>
                    <p className={`font-normal mt-2 ${classes.font}`}>
                        {indexOfFirstData + 1} -{' '}{indexOfLastData > totalItems ? totalItems : indexOfLastData} of{' '}
                        {totalItems} items
                    </p>
                </div>
            </div>
            <ConfirmationDialog
                open={showDeletePopup}
                onConfirmDialogClose={() => setShowDeletePopup(false)}
                text={`Are you sure you want to delete ?`}
                onYesClick={confirmDelete}
            />
            <ConfirmationDialog
                open={credentialNotFound}
                onConfirmDialogClose={() => setCredentialNotFound(false)}
                text={`No credentials found for ClientId: ${selectedClientId}`}
                onYesClick={confirmDelete}
                hasOnlyCloseAction={'true'}
            />
            <DetailsDailogue
                description="Client has been onboarded successfully. Below credentials have been sent to your mail id."
                clientId={clientCredentialDetails.clientId}
                isClientPopup={true}
                shareMail={shareMail}
                changePassword={changePassword}
                filledBtnText="CHANGE PASSWORD"
                outlinedBtnText="  SHARE VIA MAIL"
                hasBtn={true}
                data={[formattedCredentialDetails]}
                open={showClientDetailsPopup}
                closeAction={closeClientDetailsPopup}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                handleClickShowPassword={handleClickShowPassword}
                handleMouseDownPassword={handleMouseDownPassword}
                handleChangePassword={handleChangePassword}
                isChangePasswordBtnDisable={formattedCredentialDetails
                    && formattedCredentialDetails.Password ? false : true}
            />
            {/* Placed info dialogue separately for Draft and Inactive status to avoid image flickering issue on load */}
            <InfoDialogue
                description={`Please onboard the client to generate their log-in credential.`}
                descriptionHeading={`Onboarding pending!`}
                btnText={`CONTINUE ONBOARDING`}
                imgSrc={`/assets/images/illustrations/Illustration_Onboarding-pending.svg`}
                open={showDraftInfoPopup}
                closeAction={hideDraftInfoPopup}
                shareMail={shareMail}
                handleInfoBtnClick={() => handleInfoBtnClick(statuses[2])}
            />
            <InfoDialogue
                description={`This client’s status is marked as inactive. Please activate the client 
                to generate their log-in credential.`}
                descriptionHeading={`Inactive Client`}
                btnText={`ACTIVATE`}
                imgSrc={`/assets/images/illustrations/illustration_Inactive-usre.svg`}
                open={showInactiveInfoPopup}
                closeAction={hideInactiveInfoPopup}
                shareMail={shareMail}
                handleInfoBtnClick={() => handleInfoBtnClick(statuses[1])}
            />
        </div>
    )
}
