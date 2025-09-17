import React, { useEffect, useRef, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
    Button, //Checkbox,
    ClickAwayListener,
} from '@material-ui/core'
import Paginate from 'app/components/V5GlobalDataTable/Paginate'
import DataTable from 'app/components/V5GlobalDataTable/DataTable'
import { useDispatch, useSelector } from 'react-redux'
import PopoverMenu from 'app/components/PopoverMenu/PopoverMenu'


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

export default function VendorList({
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
    filterDetails,
    handleApplicantRedirection,
    handleCandidateRedirection,
    pageNumber,
    totalElements,
    handleViewClick,
    handleEditClick,
    handleInfo,
}) {
    const classes = useStyles()
    const dispatch = useDispatch()
    const {  jobFilterDetails } = useSelector(
        (state) => state.jobManagement
    )

    const [columnToSort, setColumnToSort] = useState('')
    const [sortDirection, setSortDirection] = useState('DESC')
    const anchorRef = useRef(null)
    const [isOpen, setIsOpen] = useState(false)
    const [filteredTableHeading, setFilteredTableHeading] = useState([])
    const [checkedValues, setCheckedValues] = useState(['actionHeader'])
    // Event Handlers
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
                filter: jobFilterDetails,
            },
        })
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
                    {/* Keep your code here */}
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
                                            className={`w-full px-1 mt-1 ml-3 mr-1 pl-1 pr-1 ${
                                                checkedValues.includes(el.key)
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
                hasEditIcon={true}
                hasInfoIcon={true}
                hasViewIcon={true}
                tableHeading={
                    filteredTableHeading.length > 1
                        ? filteredTableHeading
                        : heading
                }
                tableData={tableData}
                handleEdit={handleEditClick}
                handleView={handleViewClick}
                handleInfo={handleInfo}
                handleSort={handleSort}
                columnToSort={columnToSort}
                sortDirection={sortDirection}
                reference={anchorRef}
                setIsOpen={setIsOpen}
                isOpen={isOpen}
                filterDetails={filterDetails}
                handleApplicantRedirection={handleApplicantRedirection}
                handleCandidateRedirection={handleCandidateRedirection}
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
        </div>
    )
}
