import React, { useEffect, useRef, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Button, ClickAwayListener, Menu } from '@material-ui/core'
import history from 'helper/history.js'

import { PopoverMenu, V5GlobalHeaderActionList } from 'app/components'
import DataTable from 'app/components/V5GlobalDataTable/DataTable'
import ApplicantFilterPopup from '../components/ApplicantFilterPopup'
import FilterChips from '../components/FilterChips'
import EmptyView from 'app/components/EmptyView/EmptyView'
import Loading from 'app/components/V5GlobalLoading/V5GlobalLoading'

const JobApplicantList = () => {
    const useStyles = makeStyles(() => ({
        bodyColor: {
            backgroundColor: '#f5f5f5',
            paddingTop: '1rem',
        },
        tablePopupContainer: {
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            marginTop: '0.3rem',
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
    const classes = useStyles()
    const dispatch = useDispatch()
    let { id } = useParams()
    const anchorRef = useRef(null)

    const [filterDetails, setFilterDetails] = useState({})
    const [isFilterPopupOpen, setIsFilterPopupOpen] = useState(false)
    const [filterExists, setFilterExists] = useState(false)
    const [isOpen, setIsOpen] = useState(false)

    const [filteredTableHeading, setFilteredTableHeading] = useState([])
    const [checkedValues, setCheckedValues] = useState(['actionHeader'])
    const [tempUserType, setTempUserType] = useState('')
    const [jobID, setJobID] = useState(null)

    const {
        applicantTableHeader,
        applicantList,
        applicantFilterDetails,
        loading,
        freelancerDetails,
        vendorDetails,
    } = useSelector((state) => state.jobManagement)
    useEffect(() => {
        //checking the filter values existence
        let exists = Object.keys(applicantFilterDetails).some(function (k) {
            return (
                applicantFilterDetails[k] &&
                (applicantFilterDetails[k].length > 0 ||
                    applicantFilterDetails.from !== null ||
                    applicantFilterDetails.to !== null)
            )
        })
        setFilterExists(exists)
        dispatch({
            type: 'getApplicantListAction',
            payload: {
                id: id,
                filter: exists ? applicantFilterDetails : {},
            },
        })
    }, [applicantFilterDetails])

    function selectColumn(key) {
        setCheckedValues(
            checkedValues.includes(key)
                ? checkedValues.filter((c) => c !== key)
                : [...checkedValues, key]
        )
    }
    useEffect(() => {
        const filterHeading = applicantTableHeader.filter((el) =>
            checkedValues.includes(el.key)
        )
        setFilteredTableHeading(filterHeading)
    }, [checkedValues])

    const handleFilterClick = () => {
        setIsFilterPopupOpen(true)
    }
    const handleViewClick = (selectedJobId, key) => {
        const { id, jobId, userType } = selectedJobId
        const pathname = `/job/${jobId}/applicantDetails/${id}`
        history.push({
            pathname: pathname,
            state: userType,
        })
    }
    if (filterExists && applicantList && applicantList.length === 0) {
        return (
            <>
                <V5GlobalHeaderActionList
                    backIcon
                    title={'Job Applicant List'}
                    iconsList={[
                        {
                            iconType: 'Filter',
                            tooltipTitle: 'Filter',
                            areaLabel: 'upload picture',
                            iconComponent: 'span',
                            iconClickHandler: handleFilterClick,
                            filterPopupOpen: isFilterPopupOpen,
                            ref: anchorRef,
                        },
                    ]}
                />
                <FilterChips chipInfo={applicantFilterDetails} />
                <EmptyView
                    Imgsrc="/assets/images/No Data Illustration-3.svg"
                    Title="No results found."
                    subTitleStart="Please revise your"
                    subTitleLink="Filter"
                    subTitleEnd="criteria"
                    clickHandler={handleFilterClick}
                />
                <Menu
                    width={360}
                    open={isFilterPopupOpen}
                    onClose={() => setIsFilterPopupOpen(false)}
                    anchorEl={anchorRef.current}
                    getContentAnchorEl={null}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                    classes={{
                        root: classes.root,
                        paper: classes.paper,
                    }}
                    MenuListProps={{ disablePadding: true }}
                >
                    <ApplicantFilterPopup
                        close={() => setIsFilterPopupOpen(false)}
                    />
                </Menu>
            </>
        )
    }
    if (loading) {
        return <Loading />
    }
    if (!applicantList.length) {
        return (
            <EmptyView
                Imgsrc="/assets/images/No Data Illustration-3.svg"
                Title="No Applicant Available"
                subTitleStart="Go Back"
                subTitleLink="To Job List"
                navigateTo="/job-management"
            />
        )
    }
    return (
        <div style={{ padding: '5px' }}>
            <V5GlobalHeaderActionList
                backIcon
                title={'Job Applicant List'}
                iconsList={[
                    {
                        iconType: 'Filter',
                        tooltipTitle: 'Filter',
                        areaLabel: 'upload picture',
                        iconComponent: 'span',
                        iconClickHandler: handleFilterClick,
                        filterPopupOpen: isFilterPopupOpen,
                        ref: anchorRef,
                    },
                ]}
            />
            <FilterChips chipInfo={applicantFilterDetails} />
            <PopoverMenu
                width={200}
                open={isOpen}
                onClose={() => setIsOpen(false)}
                anchorEl={anchorRef.current}
            >
                <ClickAwayListener onClickAway={() => setIsOpen(false)}>
                    <div className={`${classes.popOverMenu} py-4`}>
                        {applicantTableHeader.map((el, index) => {
                            return (
                                <div
                                    key={index}
                                    className={classes.tablePopupContainer}
                                >
                                    {el.icon ? null : (
                                        <Button
                                            onClick={() => selectColumn(el.key)}
                                            style={{
                                                justifyContent: 'left',
                                            }}
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
                hasEditIcon={false}
                hasInfoIcon={true}
                tableHeading={
                    filteredTableHeading.length > 1
                        ? filteredTableHeading
                        : applicantTableHeader
                }
                tableData={applicantList}
                handleView={handleViewClick}
                handleInfo={handleViewClick}
                sortDirection={'DESC'}
                reference={anchorRef}
                setIsOpen={setIsOpen}
                isOpen={false}
                filterDetails={filterDetails}
            />
            <Menu
                width={360}
                open={isFilterPopupOpen}
                onClose={() => setIsFilterPopupOpen(false)}
                anchorEl={anchorRef.current}
                getContentAnchorEl={null}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                classes={{
                    root: classes.root,
                    paper: classes.paper,
                }}
                MenuListProps={{ disablePadding: true }}
            >
                <ApplicantFilterPopup
                    close={() => setIsFilterPopupOpen(false)}
                />
            </Menu>
        </div>
    )
}

export default JobApplicantList
