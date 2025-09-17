import React, { useEffect, useRef, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
    Button, 
    ClickAwayListener, TextField, Box
} from '@material-ui/core'
import Paginate from 'app/components/V5GlobalDataTable/Paginate'
import DataTable from 'app/components/V5GlobalDataTable/DataTable'
import { useDispatch, useSelector } from 'react-redux'
import PopoverMenu from 'app/components/PopoverMenu/PopoverMenu'
import ActionsModal from 'app/components/ActionModal/ActionsModal'
import history from 'helper/history.js'
import { approveVendorRegistrationService } from 'app/redux/VendorRegistration/VendorRegistrationService'
import { rejectVendorRegistrationService } from 'app/redux/VendorRegistration/VendorRegistrationService'
import { SNACKBAR_ERROR, SNACKBAR_SUCCESS } from 'app/redux/slices/snackbar'

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
        opacity: 0.7,
    },
    paginationContainer: {
        height: '40px',
        display: 'flex',
        alignItems: 'center',
        marginBottom: '1rem',
        position: 'sticky',
        bottom: 0,
        zIndex: 600,
        backgroundColor: '#f5f5f5',
        padding: '0 1rem',
    },
    tablePopupContainer: {
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        marginTop: '0.3rem',
    },
    tablePopupHeading: {
        color: '#000000DE',
        padding: '0.5rem',
        margin: '0',
    },
    tablePopupIcon: {
        margin: '0.5rem 0.7rem 0 0.7rem',
        color: '#00000061',
    },
    popOverMenu: {
        boxShadow: '-1px 10px 20px lightgrey',
        width: '200px',
        overflowY: 'scroll',
        maxHeight: '23rem',
        marginTop: '-0.5rem',
        zIndex: '10000',
        display: 'flex',
        flexDirection: 'column',
        '&::-webkit-scrollbar': {
            width: '0.4em',
        },
    },
}))



const RenderButton = ({ onClick }) => {
    return (
        <div id="transition-modal-description" className="flex justify-end mt-2">
            <Button
                variant="outlined"
                className="mx-1"
                size="small"
                onClick={onClick}
            >
                Confirm
            </Button>
        </div>
    )
}
export default function VendorRegistrationList({
    indexOfFirstData,
    indexOfLastData,
    paginate,
    page,
    heading,
    currentPage,
    pageSize,
    tableData,
    totalItems,
    filterDetails,
    totalElements
}) {
    const classes = useStyles()
    const dispatch = useDispatch()


    const {
        assignVendorRegistrationTableHeader,
        vendorRegistrationFilterDetails, vendorRegistrationActionData, assignVendorRegistrationList

    } = useSelector((state) => state.vendorRegistration)


    const [columnToSort, setColumnToSort] = useState('')
    const [sortDirection, setSortDirection] = useState('DESC')
    const anchorRef = useRef(null)
    const [isOpen, setIsOpen] = useState(false)
    const [filteredTableHeading, setFilteredTableHeading] = useState([])
    const [checkedValues, setCheckedValues] = useState(['actionHeader'])
    const [notes, setNotes] = useState('')
    const [isNoteModalOpen, setIsNoteModalOpen] = useState(false)
    const [isRejectModalOpen, setIsRejectModalOpen] = useState(false)
    const [isApproveModalOpen, setIsApproveModalOpen] = useState(false)
    const [isAssignVendorModalOpen, setIsAssignVendorModalOpen] = useState(false)
    const [vendorId, setVendorId] = useState(null);

    const invertDirection = {
        ASC: 'DESC',
        DESC: 'ASC',
    }

    const handleSort = (columnName) => {
        let converToUpperCase = columnName.toUpperCase().split(' ').join('_')
        setColumnToSort(converToUpperCase)
        setSortDirection(
            columnToSort === converToUpperCase
                ? invertDirection[sortDirection]
                : 'ASC'
        )
        dispatch({
            type: 'setSortDirectionAction',
            direction: sortDirection,
            sortBy: columnToSort,
        })
        dispatch({
            type: 'getJobsListAction',
            payload: {
                pageNumber: currentPage,
                size: pageSize,
                sortBy: converToUpperCase,
                sortOrder: sortDirection,
                filter: vendorRegistrationFilterDetails,
            },
        })
    }

    const handleOnChange = (value, name, key = '') => {
        if (name === 'note') {
            setNotes(value)
        }
    }

    const handleActionModalClose = (key) => {
        if (key === 'reject') {
            setIsRejectModalOpen(false)
        }
        if (key === 'approve') {
            setIsApproveModalOpen(false)
        }
        if (key === 'assignvendor') {
            setIsAssignVendorModalOpen(false);
        }

    }

    const handleModalToggle = (key) => {
        if (key === 'note') {
            setIsNoteModalOpen(!isNoteModalOpen)
        }

    }

    const onHandleApproveVendorService = async () => {
        if (assignVendorRegistrationList.length) {
            setIsApproveModalOpen(!isApproveModalOpen);
            setIsAssignVendorModalOpen(!isAssignVendorModalOpen);
            localStorage.removeItem('vendorApprove');

        }
        else if (!assignVendorRegistrationList.length) {
            localStorage.setItem('vendorApprove', true);
            try {
                setIsApproveModalOpen(!isApproveModalOpen);
                const pathname = `/vendor/vendorAdd/`;
                history.push({
                    pathname: pathname,
                })
            } catch (error) {

            }
        }
    }

    const onHandleRejectVendorService = async () => {
        try {
            setIsRejectModalOpen(!isRejectModalOpen);
            setIsNoteModalOpen(!isNoteModalOpen);
        } catch (error) {

        }
    }

    const handleAssignVendorService = async () => {

        const payload = vendorId;
        try {
            const res = await approveVendorRegistrationService(payload, vendorRegistrationActionData)
            if (!res.error) {
                setIsAssignVendorModalOpen(!isAssignVendorModalOpen);
                dispatch(SNACKBAR_SUCCESS("Vendor Approved Successfully"));
                window.location.reload();


            }
        } catch (error) {
            setIsAssignVendorModalOpen(!isAssignVendorModalOpen);
            dispatch(SNACKBAR_ERROR(error.message))

        }

    }
    const onContinueNotes = async () => {
        if (notes) {
            try {
                const response = await rejectVendorRegistrationService(notes, vendorRegistrationActionData);
                if (!response.error) {
                    setIsNoteModalOpen(!isNoteModalOpen)
                    dispatch(SNACKBAR_SUCCESS("Vendor Rejected Successfully"));
                    window.location.reload();

                }

            } catch (error) {
                dispatch(SNACKBAR_ERROR(error.message))
                setIsNoteModalOpen(!isNoteModalOpen)

            }
        }
        else {
            dispatch(SNACKBAR_ERROR("User Note Should Be Given"))
            setIsNoteModalOpen(!isNoteModalOpen)
        }
    }
    function selectColumn(key) {
        setCheckedValues(
            checkedValues.includes(key)
                ? checkedValues.filter((c) => c !== key)
                : [...checkedValues, key]
        )
    }

    useEffect(() => {
        const filterHeading = heading.filter((el) =>
            checkedValues.includes(el.key)
        )
        setFilteredTableHeading(filterHeading)
    }, [checkedValues])
    return (
        <div style={{ padding: '5px' }}>
            <PopoverMenu
                width={200}
                open={isOpen}
                onClose={() => setIsOpen(false)}
                anchorEl={anchorRef.current}
            >
                <ClickAwayListener onClickAway={() => setIsOpen(false)}>
                    <div className={`${classes.popOverMenu} py-4`}>
                        {heading.map((el, index) => {

                            return (
                                <div
                                    key={index}
                                    className={classes.tablePopupContainer}
                                >
                                    {el.icon ? null : (
                                        <Button
                                            onClick={() => selectColumn(el.key)}
                                            style={{ justifyContent: 'left' }}
                                            className={`w-full px-1 mt-1 ml-3 mr-1 pl-1 pr-1 ${checkedValues.includes(el.key)
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
            <ActionsModal
                customModal
                actionModalOpen={isNoteModalOpen}
                description={'Enter Note'}
                handleActionModalClose={() => handleModalToggle('note')}
            >
                <div>
                    <TextField
                        multiline
                        rows={3}
                        maxRows={4}
                        label="Vendor Reject Note"
                        placeholder="Type here"
                        variant="outlined"
                        fullWidth
                        className={classes.modalInputStyle}
                        value={notes}
                        onChange={(e) =>
                            handleOnChange(e.target.value, 'note')
                        }
                    />
                </div>
                <RenderButton onClick={onContinueNotes} />
            </ActionsModal>
            <ActionsModal
                actionModalOpen={isRejectModalOpen}
                description={
                    'Are you sure you want to reject this vendor'
                }
                buttonTitle1={'Yes'}
                buttonTitle2={'No'}
                handleActionModalClose={() =>
                    handleActionModalClose('reject')
                }
                handleButtonAction1={() => onHandleRejectVendorService()}

                handleButtonAction2={() =>
                    handleActionModalClose('reject')
                }
            />

            <ActionsModal
                actionModalOpen={isApproveModalOpen}
                description={
                    'Are you sure you want to approve this vendor'
                }
                buttonTitle1={'Yes'}
                buttonTitle2={'No'}
                handleActionModalClose={() =>
                    handleActionModalClose('approve')
                }
                handleButtonAction1={() => onHandleApproveVendorService()}
                handleButtonAction2={() =>
                    handleActionModalClose('approve')
                }
            />

            <ActionsModal
                actionModalOpen={isRejectModalOpen}
                description={
                    'Are you sure you want to reject this vendor'
                }
                buttonTitle1={'Yes'}
                buttonTitle2={'No'}
                handleActionModalClose={() =>
                    handleActionModalClose('reject')
                }
                handleButtonAction1={() => onHandleRejectVendorService()}

                handleButtonAction2={() =>
                    handleActionModalClose('reject')
                }
            />

            <ActionsModal
                customModal
                actionModalOpen={isAssignVendorModalOpen}
                description={
                    'Vendor With This Data Is Already Present'
                }
                buttonTitle1={'Yes'}
                buttonTitle2={'No'}
                handleActionModalClose={() =>
                    handleActionModalClose('assignvendor')
                }
                handleButtonAction1={() => onHandleApproveVendorService()}
                handleButtonAction2={() =>
                    handleActionModalClose('assignvendor')
                }
            >
                <div>


                    <DataTable
                        hasVendorSelection={true}
                        handleVendorSelection={(vendorId) => {
                            setVendorId(vendorId);

                        }}
                        hasEditIcon={false}
                        hasInfoIcon={false}
                        hasViewIcon={false}
                        tableHeading={
                            assignVendorRegistrationTableHeader
                        }
                        tableData={assignVendorRegistrationList}
                        handleEdit={() => { console.log('edit') }}
                        handleView={console.log('view')}
                        handleInfo={console.log('info')}
                        handleSort={handleSort}
                        columnToSort={columnToSort}
                        sortDirection={sortDirection}
                        reference={anchorRef}
                        setIsOpen={setIsOpen}
                        isOpen={isOpen}
                        filterDetails={() => { }}

                    />
                </div>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
                    <p>Note - Please Select One To Continue.</p>
                    <Button type="submit" variant="outlined" color="primary" onClick={() => handleAssignVendorService()}>Submit</Button>
                </Box>
            </ActionsModal>
            <DataTable
                hasEditIcon={false}
                hasInfoIcon={false}
                hasViewIcon={false}
                tableHeading={
                    filteredTableHeading.length > 1
                        ? filteredTableHeading
                        : heading
                }
                tableData={tableData}
                handleEdit={() => { console.log('edit') }}
                handleView={console.log('view')}
                handleInfo={console.log('info')}
                handleSort={handleSort}
                columnToSort={columnToSort}
                sortDirection={sortDirection}
                reference={anchorRef}
                setIsOpen={setIsOpen}
                isOpen={isOpen}
                filterDetails={filterDetails}
                handleApproveRedirection={(vendorRequestData) => {
                    dispatch({
                        type: 'setVendorBasicDetailsAction', payload: {
                            vendorName: vendorRequestData.name,
                            email: vendorRequestData.email,
                            mobile: vendorRequestData.mobile
                        }
                    })

                    dispatch({
                        type: 'getVendorsRequestsListAction', payload: {
                            vendorRequestId: vendorRequestData.id,
                            jobId: vendorRequestData.jobId
                        }
                    });
                    dispatch({
                        type: 'vendorRequestAction',
                        payload: {
                            vendorRequestId: vendorRequestData.id,
                            jobId: vendorRequestData.jobId
                        }
                    })
                    setIsApproveModalOpen(
                        true
                    )
                }}
                handleRejectRedirection={(vendorRequestData) => {
                    dispatch({
                        type: 'vendorRequestAction',
                        payload: {
                            vendorRequestId: vendorRequestData.id,
                            jobId: vendorRequestData.jobId
                        }
                    })
                    setIsRejectModalOpen(
                        true
                    )
                }}
            />

            <div className={classes.paginationContainer}>
                <div className="flex items-end justify-centers">
                    <Paginate
                        page={page}
                        paginate={paginate}
                        pageSize={pageSize}
                        listSize={totalElements}
                    />
                </div>

                <div className={classes.paginationCount}>
                    <p className={`font-normal mt-2 ${classes.font}`}>
                        {indexOfFirstData + 1} -{' '}
                        {indexOfLastData > totalItems
                            ? totalItems
                            : indexOfLastData}{' '}
                        of {totalItems} items
                    </p>
                </div>
            </div>
        </div >
    )
}
