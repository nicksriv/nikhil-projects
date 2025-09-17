import React, { useEffect, useRef, useState } from 'react'
import {
    Button,
    ClickAwayListener,
    Grid,
    Box,
    TextField,
    MenuItem,
    InputLabel,
    Select,
    FormControl,
    Tooltip, OutlinedInput,
} from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import ActionsPopup from 'app/components/ActionPopup/ActionsPopup'
import WorkDetailTimeLine from '../JobManagement/components/WorkDetailTimeLine'
import history from 'helper/history.js'
import { useLocation, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import ActionsModal from 'app/components/ActionModal/ActionsModal'
import { SNACKBAR_ERROR, SNACKBAR_SUCCESS } from 'app/redux/slices/snackbar'
import BackgroundCard from '../JobManagement/components/BackgroundCard'
import DetailsCard from 'app/components/DetailsCard/DetailsCard'
import StarBorderIcon from '@material-ui/icons/StarBorder';
import Loading from 'app/components/V5GlobalLoading/V5GlobalLoading'
import { config } from 'helper/config.js'
import DataTable from 'app/components/V5GlobalDataTable/DataTable'
import PopoverMenu from 'app/components/PopoverMenu/PopoverMenu'
import { activateQualityAssuranceService, deactivateQualityAssuranceService, assignClientToQualityAssuranceService } from "../../redux/QualityAssuranceManagement/QualityAssuranceManagementService";
import { V5GlobalHeaderActionList } from 'app/components'
const qualityAssuranceDetailsField = [
    {
        label: 'First Name:',
        render: (qualityAssuranceDetails) => qualityAssuranceDetails?.firstName || 'NA',

    },
    {
        label: 'Last Name:',
        render: (qualityAssuranceDetails) => qualityAssuranceDetails?.lastName || 'NA',

    },
    {
        label: 'Middle Name:',
        render: (qualityAssuranceDetails) => qualityAssuranceDetails?.middleName || 'NA',

    },
    {
        label: 'Email:',
        render: (qualityAssuranceDetails) => qualityAssuranceDetails?.email || 'NA',

    },
    {
        label: 'Mobile:',
        render: (qualityAssuranceDetails) => qualityAssuranceDetails?.mobile || 'NA',

    },
    {
        label: 'Status:',
        render: (qualityAssuranceDetails) => qualityAssuranceDetails?.qualityControllerStatus || 'NA',

    },
]

function QualityAssuranceDetails() {
    const useStyles = makeStyles(() => ({
        bodyColor: {
            backgroundColor: 'green',
            paddingTop: '1rem',
        },
        tablePopupContainer: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            cursor: 'pointer',
        },
        inputField: {
            width: '190px',
        },
        popOverMenu: {
            boxShadow: '-1px 10px 20px lightgrey',
            width: '200px',
            padding: 4,
            zIndex: '10000',
            display: 'flex',
            flexDirection: 'column',
            '&::-webkit-scrollbar': {
                width: '0.4em',
            },
        },
        modalInputStyle: {
            width: '100%',
            marginBottom: 18,
        },
    }))
    const classes = useStyles()
    let { id } = useParams()
    const location = useLocation()
    const { state: userType } = location
    const dispatch = useDispatch()
    const [columnToSort, setColumnToSort] = useState('')
    const [sortDirection, setSortDirection] = useState('DESC')
    const [qualityAssuranceDetailsData, setQualityAssuranceDetailsData] = useState({})
    const [checkedValues, setCheckedValues] = useState(['actionHeader'])
    const { qualityAssuranceDetails = {}, clientsAssuranceTableHeader = [], loading } = useSelector((state) => state.qualityAssuranceManagement)

    const anchorRef = useRef(null)
    const anchorRefTable = useRef(null)
    const [isOpen, setIsOpen] = useState(false)
    const [filteredTableHeading, setFilteredTableHeading] = useState([])
    const { clients, email, firstName, lastName, middleName, mobile, qualityControllerStatus } = qualityAssuranceDetails;
    const [isActionPopupOpen, setActionPopupOpen] = useState(false)
    const [isDeactivateModalOpen, setIsDeactivatehModalOpen] = useState(false)
    const [isActivateModalOpen, setIsActivatehModalOpen] = useState(false)
    const [isAssignModalOpen, setIsAssignModalOpen] = useState(false)
    const [activeClients, setActiveClients] = useState([]);
    const [assignClientId, setAssignClientId] = useState([]);
    const { activeClientsList } = useSelector((state) => state.clients);

    useEffect(() => {
        if (activeClientsList && activeClientsList.length) {
            let listOfActiveClients = activeClientsList.filter((client) => {
                return client.status.toLowerCase() === "active"
            });
            setActiveClients(listOfActiveClients);
        }
    }, [activeClientsList])
    useEffect(() => {
        dispatch({
            type: 'getQualityAssuranceDetailsAction',
            payload: id,
        })
    }, [id])
    useEffect(() => {
        dispatch({ type: 'getClientsListAction' });

    }, []);
    useEffect(() => {
        setQualityAssuranceDetailsData(qualityAssuranceDetails)
    }, [qualityAssuranceDetails])
    function selectColumn(key) {
        setCheckedValues(
            checkedValues.includes(key)
                ? checkedValues.filter((c) => c !== key)
                : [...checkedValues, key]
        )
    }
    useEffect(() => {
        const filterHeading = clientsAssuranceTableHeader.filter((el) =>
            checkedValues.includes(el.key)
        )
        setFilteredTableHeading(filterHeading)
    }, [checkedValues])
    let qualityAssuranceDetailsLength = Object.keys(qualityAssuranceDetails).length

    const handleBack = (e) => {
        history.goBack()
    }
    const handleActionPopup = () => {
        setActionPopupOpen(!isActionPopupOpen)
    }
    const handleActionModalClose = (key) => {
        if (key === 'deactivate') {
            setIsDeactivatehModalOpen(false)
        }
        if (key === 'activate') {
            setIsActivatehModalOpen(false)
        }
        if (key === 'assign') {
            setIsAssignModalOpen(false)
        }
        if(key === 'clear'){
            console.log("clear btn clicked")
            setAssignClientId([]);
        }
    }

    const handleChange = (e) => {
        console.log("e", e.target.value);
        const clientId = e.target.value.toString();
        setAssignClientId([...assignClientId, clientId]);
    }


    const handleDeactivateQualityAssurance = async () => {
        console.log("deactivate");
        try {
            const res = await deactivateQualityAssuranceService({ id })
            dispatch(SNACKBAR_SUCCESS(res.message))
            if (res.message) {
                setIsDeactivatehModalOpen(false)
                dispatch({ type: 'getQualityAssuranceDetailsAction', payload: id })
            }
        } catch (error) {
            dispatch(SNACKBAR_ERROR(error.message))
            setIsDeactivatehModalOpen(false)
        }
    }

    const handleActivateQualityAssurance = async () => {
        try {
            const res = await activateQualityAssuranceService({ id })
            dispatch(SNACKBAR_SUCCESS(res.message))
            if (res.message) {
                setIsActivatehModalOpen(false)
                dispatch({ type: 'getQualityAssuranceDetailsAction', payload: id })
            }
        } catch (error) {
            dispatch(SNACKBAR_ERROR(error.message))
            setIsActivatehModalOpen(false)
        }
    }

    const handleAssignClients = async () => {
        if(assignClientId.length){
        try {
            const res = await assignClientToQualityAssuranceService({ id, assignClientId })
            dispatch(SNACKBAR_SUCCESS(res.message))
            if (res.message) {
                setIsAssignModalOpen(false)
                dispatch({ type: 'getQualityAssuranceDetailsAction', payload: id })
            }
        } catch (error) {
            dispatch(SNACKBAR_ERROR(error.message))
            setIsAssignModalOpen(false)
        }}
        else{
            dispatch(SNACKBAR_ERROR("You Need To Select Client To Assign !!"))
            setIsAssignModalOpen(false)
        }
    }
    if (!qualityAssuranceDetailsLength || loading === 'start' || !qualityAssuranceDetailsLength) {
        return <Loading />
    }
    return (
        <>
            <V5GlobalHeaderActionList
                backIcon
                title={'Quality Assurance Details'}
                iconsList={[
                    {
                        iconType: 'more_vert',
                        tooltipTitle: 'More',
                        areaLabel: 'more verical',
                        iconComponent: 'span',
                        iconClickHandler: handleActionPopup,
                    },
                ]}
            />
                    <div>
                        <ActionsPopup
                            width={200}
                            open={isActionPopupOpen}
                            onClose={() => handleActionPopup()}
                            anchorEl={anchorRef.current}
                        >
                            <ClickAwayListener
                                onClickAway={() => handleActionPopup()}
                            >
                                <div className={`${classes.popOverMenu}`}>
                                    <div
                                        className={classes.tablePopupContainer}
                                    >
                                        {qualityControllerStatus ===
                                        'ACTIVE' ? (
                                            <>
                                                <Button
                                                    style={{
                                                        justifyContent: 'left',
                                                    }}
                                                    className="w-full  mt-1 color-gray border-gray"
                                                    onClick={() => {
                                                        setIsDeactivatehModalOpen(
                                                            true
                                                        )
                                                    }}
                                                >
                                                    Deactivate QA
                                                </Button>
                                                <Button
                                                    style={{
                                                        justifyContent: 'left',
                                                    }}
                                                    className="w-full  mt-1 color-gray border-gray"
                                                    onClick={() => {
                                                        setAssignClientId([])
                                                        setIsAssignModalOpen(
                                                            true
                                                        )
                                                    }}
                                                >
                                                    Assign Client
                                                </Button>
                                            </>
                                        ) : (
                                            <Button
                                                style={{
                                                    justifyContent: 'left',
                                                }}
                                                className="w-full  mt-1 color-gray border-gray"
                                                onClick={() => {
                                                    setIsActivatehModalOpen(
                                                        true
                                                    )
                                                }}
                                            >
                                                Activate QA
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </ClickAwayListener>
                        </ActionsPopup>
                    </div>
                    <ActionsModal
                        actionModalOpen={isDeactivateModalOpen}
                        description={
                            'Are you sure you want to deactivate this QA'
                        }
                        buttonTitle1={'Yes'}
                        buttonTitle2={'No'}
                        handleActionModalClose={() =>
                            handleActionModalClose('deactivate')
                        }
                        handleButtonAction1={handleDeactivateQualityAssurance}
                        handleButtonAction2={() =>
                            handleActionModalClose('deactivate')
                        }
                    />

                    <ActionsModal
                        actionModalOpen={isActivateModalOpen}
                        description={
                            'Are you sure you want to activate this QA'
                        }
                        buttonTitle1={'Yes'}
                        buttonTitle2={'No'}
                        handleActionModalClose={() =>
                            handleActionModalClose('activate')
                        }
                        handleButtonAction1={handleActivateQualityAssurance}
                        handleButtonAction2={() =>
                            handleActionModalClose('activate')
                        }
                    />
                    <ActionsModal
                        actionModalOpen={isAssignModalOpen}
                        description={
                            <FormControl>
                                <InputLabel>Select Clients </InputLabel>
                                <Select
                                    multiple
                                    className={classes.inputField}
                                    value={assignClientId}
                                    onChange={(e) =>
                                        setAssignClientId(e.target.value)
                                    }
                                    input={
                                        <OutlinedInput label="Multiple Select" />
                                    }
                                >
                                    {activeClients &&
                                        activeClients.map((client) => (
                                            <MenuItem
                                                name="client"
                                                key={client.id}
                                                value={client.id}
                                            >
                                                {client.clientName}
                                            </MenuItem>
                                        ))}
                                </Select>
                            </FormControl>
                        }
                        buttonTitle1={'Assign'}
                        buttonTitle2={'Clear'}
                        handleActionModalClose={() =>
                            handleActionModalClose('assign')
                        }
                        handleButtonAction1={handleAssignClients}
                        handleButtonAction2={() =>
                            handleActionModalClose('clear')
                        }
                    />
            <BackgroundCard title={'Basic Details'}>
                <Grid
                    container
                    spacing={1}
                    style={{
                        display: 'flex',
                    }}
                >
                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={9}
                        lg={10}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <DetailsCard
                            data={qualityAssuranceDetailsField}
                            cardDetails={qualityAssuranceDetailsData}
                        />
                    </Grid>
                </Grid>
            </BackgroundCard>
            <div style={{ padding: '5px' }}>
                <PopoverMenu
                    width={200}
                    open={isOpen}
                    onClose={() => setIsOpen(false)}
                    anchorEl={anchorRefTable.current}
                >
                    <ClickAwayListener onClickAway={() => setIsOpen(false)}>
                        <div className={`${classes.popOverMenu} py-4`}>
                            {clientsAssuranceTableHeader.map((el, index) => {
                                return (
                                    <div
                                        key={index}
                                        className={classes.tablePopupContainer}
                                    >
                                        {el.icon ? null : (
                                            <Button
                                                onClick={() =>
                                                    selectColumn(el.key)
                                                }
                                                style={{
                                                    justifyContent: 'left',
                                                }}
                                                className={`w-full px-1 mt-1 ml-3 mr-1 pl-1 pr-1 ${
                                                    checkedValues.includes(
                                                        el.key
                                                    )
                                                        ? 'color-primary border-primary'
                                                        : 'color-gray border-gray'
                                                }`}
                                            >
                                                {el.name}
                                            </Button>
                                        )}
                                    </div>
                                )
                            })}
                        </div>
                    </ClickAwayListener>
                </PopoverMenu>
                <DataTable
                    hasEditIcon={false}
                    hasInfoIcon={false}
                    hasViewIcon={false}
                    hasDeleteIcon={false}
                    tableHeading={
                        filteredTableHeading.length > 1
                            ? filteredTableHeading
                            : clientsAssuranceTableHeader
                    }
                    tableData={qualityAssuranceDetails.clients}
                    handleEdit={() => console.log('edit')}
                    handleView={() => console.log('view')}
                    handleInfo={() => console.log('info')}
                    handleSort={() => console.log('sort')}
                    columnToSort={columnToSort}
                    sortDirection={sortDirection}
                    reference={anchorRefTable}
                    setIsOpen={setIsOpen}
                    isOpen={isOpen}
                    filterDetails={() => {
                        console.log('filter details')
                    }}
                />
            </div>
        </>
    )
}

export default QualityAssuranceDetails
