import React, { useEffect, useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
//import VisibilityIcon from '@material-ui/icons/Visibility';
import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Box, Icon, IconButton, TableSortLabel, Tooltip, Chip, Button } from '@material-ui/core';
import { camelCase } from 'lodash';
import { convertDate } from 'app/views/utilities/DateFormat';
import { styled } from '@material-ui/styles';
import { capitalizeFirstLetter } from 'helper/utils';

let StickyTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: "white",
        right: '-1rem',
        position: 'sticky',
        zIndex: 100,
        border: 'none',
        paddingLeft: '5rem',
        paddingRight: '2rem',
        paddingTop: '0px',
        paddingBottom: '1px',
        width: "2rem"
    },
    body: {
        backgroundColor: 'inherit',
        marginRight: 0,
        marginLeft: 0,
        right: '-1rem',
        left: 0,
        position: 'sticky',
        zIndex: 550,
    },
}))(TableCell)

const useStyles = makeStyles((theme) => ({
    chip: {
        backgroundColor: '#FFFFFF',
        marginRight: '3px',
    },
    link: {
        textDecoration: 'underline',
        color: '#2C3E93',
        marginLeft: '5px',
    },
    table: {
        marginTop: '0rem',
        fontSize: '1rem',
        backgroundColor: 'white',
        borderRadius: '4px 4px 0px 0px',
        boxShadow: '0 3px 10px rgba(81, 190, 183, 0.3)',
        '& .MuiTableCell-root': {
            padding: '6px 5px 6px 22px', // <-- arbitrary value
        },
    },
    Paper: {
        padding: '0.5rem 0 0.5rem 0.5rem',
        boxShadow: 'none',
        backgroundColor: 'transparent',
        visibility: 'none',
        '&::-webkit-scrollbar': {
            width: '0.5rem',
            height: '0.5rem',
        },
        '&:hover': {
            '&::-webkit-scrollbar-thumb': {
                backgroundColor: '#DEDFE1',
            },
            cursor: 'pointer',
        },
    },
    iconsColor: {
        color: '#9f9f9e',
        display: 'flex',
        alignItems: 'center',
    },
    tableHeader: {
        backgroundColor: 'transparent',
        whiteSpace: 'nowrap',
        padding: '0px !important',
    },
    TableCell: {
        whiteSpace: 'nowrap',
        color: '#00000099',
        fontWeight: 400,
    },
    tableRow: {
        borderBottom: '0.5px solid rgba(0, 0, 0, 0.1)',
        borderLeft: '0.5px solid transparent',
        borderRight: '0.5px solid transparent',
        '&:hover': {
            border: '0.5px solid rgba(0, 0, 0, 0.2)',
            cursor: 'pointer',
            borderRight: 'none',
            borderLeft: 'none',
        },
        '&:last-child ': {
            borderBottom: '0.5px solid transparent',
        },
        '&:first-child ': {
            borderTop: '0.5px solid transparent',
        },
    },
    paginationCount: {
        marginLeft: 'auto',
        marginRight: '2rem',
        marginTop: '1rem',
    },
    rangeSelector: {
        border: '1px solid gray',
        borderBottom: 'none',
    },
    disabledView: {
        backgroundColor: 'rgba(242, 242, 242, .99) !important',
        //  backgroundColor: '#EDEDF0 !important',
        //  opacity: '.54',
        position: 'relative',
        borderBottom: '0.5px solid rgba(0, 0, 0, 0.1)',
        borderLeft: '0.5px solid transparent',
        borderRight: '0.5px solid transparent',
        // borderBottom: "0.5px solid transparent",
        '&:hover': {
            border: '0.5px solid rgba(0, 0, 0, 0.2)',
            cursor: 'pointer',
            borderRight: 'none',
            borderLeft: 'none',
        },
        '& .MuiTableCell-body': {
            color: 'rgba(0, 0, 0, .3) !important',
        },
    },
    disabledViewIcons: {
        //  backgroundColor: '#EDEDF0 !important',
        backgroundColor: 'rgba(242, 242, 242, .99) !important',
    },
    inActiveBtn: {
        color: '#BF334C !important',
        fontSize: '13px',
        border: '1px solid #C13C54',
        zIndex: '1',
        padding: '0.1rem 0.2rem',
        width: '73px',
        backgroundColor: '#EAD9DD',
    },
    activeBtn: {
        color: '#2C3E93 !important',
        fontSize: '13px',
        padding: '0.1rem .2rem',
        width: '73px',
        border: '1px solid #2C3E93',
        backgroundColor: '#daedf4',
    },
    draftedBtn: {
        color: '#00000099  !important',
        border: '1px solid #00000099',
        fontSize: '13px',
        padding: '0.1rem .2rem',
        width: '73px',
    },
    iconColumnActive: {
        backgroundColor: '#F4F6FC',
    },
    redirectLink: {
        textDecoration: 'underline',
        color: 'blue',
        fontSize: 12,
    },
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(even)': {
        backgroundColor: '#FFF'
    },
    '&:nth-of-type(odd)': {
        backgroundColor: '#F4F6FC'
    },
    root: {
        zIndex: theme.zIndex.appBar + 1
    }
}));

function DataTable({
    hasVendorSelection,
    hasDeleteIcon,
    hasEditIcon,
    hasViewIcon,
    hasInfoIcon,
    tableHeading,
    tableData,
    handleEdit,
    handleDelete,
    handleInfo,
    handleView,
    handleSort,
    columnToSort,
    sortDirection,
    setIsOpen,
    isOpen,
    reference,
    filterDetails,
    handleApplicantRedirection,
    handleCandidateRedirection,
    handleApproveRedirection,
    handleRejectRedirection,
    handleVendorSelection
}) {
    const classes = useStyles();
    const [dotActive, setDotActive] = useState(false);
    useEffect(() => {
        if (isOpen) {
            setDotActive(true);
        } else {
            setDotActive(false);
        }
    }, [isOpen])

    const handlePopup = () => {
        setIsOpen(true);
    }

    return (
        <div>
            <TableContainer className={classes.Paper}
                style={Object.values(filterDetails).some(v => v) ? { maxHeight: "calc(100vh - 300px)" } : { maxHeight: "calc(100vh - 260px)" }} component={Paper}>
                <Table
                    className={`${classes.table} w-full`}
                    aria-label="simple table"
                >
                    <TableHead ref={reference} className={classes.tableHeader}>
                        <TableRow>
                            {tableHeading.map((heading, item) => {
                                return heading.key === 'actionHeader' ? (
                                    <StickyTableCell className={classes.head} style={{ padding: "0px !important" }}>
                                        <TableCell
                                            key={heading.key}
                                            className="font-semibold pl-5 border-none pt-0 pb-0"
                                        >
                                            <IconButton style={{ marginLeft: '55px' }} onClick={handlePopup}>
                                                <Icon className={dotActive ? "color-primary" : ""}>{heading.icon}</Icon>
                                            </IconButton>
                                        </TableCell>
                                    </StickyTableCell>
                                ) : (

                                    <TableCell
                                        key={heading.key}
                                        className={`font-semibold text-14 border-none cursor-pointer ${classes.TableCell} ${heading.alignmentDirection ? heading.alignmentDirection : ''}`}
                                    >
                                        {!heading.hasSorting ? heading.name : <TableSortLabel
                                            active={columnToSort === heading && heading.name ? heading.name.toUpperCase().split(" ").join("_") : ''}
                                            direction={sortDirection === 'DESC' ? "desc" : "asc"}
                                            onClick={() => handleSort(heading.name)
                                            }
                                            IconComponent={UnfoldMoreIcon}
                                        >
                                            {heading.name}
                                            {columnToSort === heading.name.toUpperCase().split(" ").join("_") ? (
                                                <Box component="span" className="hidden">
                                                    {sortDirection === 'DESC' ? 'sorted descending' : 'sorted ascending'}
                                                </Box>
                                            ) : null}
                                        </TableSortLabel>}
                                    </TableCell>
                                )
                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tableData &&
                            tableData.map((userProp, index) => (

                                <StyledTableRow
                                    key={index}
                                    className={
                                        `
                                        ${tableData[index].status ===
                                            'INACTIVE' ||
                                            tableData[index].vendorRequestStatus === 'REJECTED' ||
                                            tableData[index].status === 'DRAFT'
                                            ? classes.disabledView
                                            : classes.tableRow} ${tableData[index].status ===
                                                'INACTIVE' ? 'color-primary' : ''}`
                                    }
                                >

                                    {tableHeading.map((el, index) => {
                                        return (
                                            <>
                                                {index === tableHeading.length - 1
                                                    ? (
                                                        <StickyTableCell
                                                            className={`${userProp.status === 'INACTIVE' ? classes.disabledViewIcons : ''} border-none p-0`}
                                                        >
                                                            <TableCell className={`border-none ${el.alignIcon && el.alignIcon}`}>
                                                                <TableCell className="p-0 border-none">
                                                                    <div
                                                                        className={
                                                                            classes.iconsColor
                                                                        }
                                                                    >

                                                                        {hasVendorSelection ? (

                                                                            <input type="radio" name="assignVendor" value={userProp['vendorId']} onClick={(e) => {
                                                                                handleVendorSelection(e.target.value)
                                                                            }} />





                                                                        ) : null}

                                                                        {hasDeleteIcon ? (
                                                                            <DeleteIcon
                                                                                className={`m-2 cursor-pointer `}
                                                                                onClick={() =>
                                                                                    handleDelete(
                                                                                        userProp
                                                                                    )
                                                                                }
                                                                            />
                                                                        ) : null}
                                                                        {hasEditIcon ? (
                                                                            <EditIcon
                                                                                className={`m-2 cursor-pointer `}
                                                                                onClick={() =>
                                                                                    handleEdit(
                                                                                        userProp
                                                                                    )
                                                                                }
                                                                            />
                                                                        ) : null}
                                                                        {hasInfoIcon ? (
                                                                            <InfoOutlinedIcon
                                                                                className={`m-2 cursor-pointer`}
                                                                                onClick={() =>
                                                                                    handleInfo(
                                                                                        userProp
                                                                                    )
                                                                                }
                                                                            />
                                                                        ) : null}
                                                                    </div>
                                                                </TableCell>
                                                            </TableCell>
                                                        </StickyTableCell>
                                                    ) :
                                                    (
                                                        <TableCell
                                                            component="th"
                                                            scope="row"

                                                            className={`${el.key === 'status' && `${classes[camelCase(userProp[el.key])]}`} border-none font-normal ${classes.TableCell} ${classes.body} ${el.alignmentDirection ? el.alignmentDirection : ''}`}
                                                       
                                                         onClick={() =>
                                                             handleView(
                                                                 userProp, el.key
                                                             )
                                                         }
                                                        >

                                                            {(userProp[el.key] === "" || ((userProp[el.key] === null) &&
                                                                el.key !== 'skills' && el.key !== 'mappedStores' && el.key !== 'modules' && !el.singleChipView)) ? "-" : ""}
                                                            {el.isIcon ? <Icon className={classes.iconsColor}>{userProp[el.key]}</Icon> : userProp[el.key] && typeof userProp[el.key] !== 'object' && userProp[el.key].length > 20 && el.key !== 'createdAt' ?
                                                                <Tooltip title={userProp[el.key]} arrow>
                                                                    <div>
                                                                        {el.key === "siteEmail" ? userProp[el.key] : userProp[el.key] && capitalizeFirstLetter(userProp[el.key]).slice(0, 20) + " ..."}
                                                                    </div>
                                                                </Tooltip>

                                                                : userProp[el.key] && el.key === "clientId" ? userProp[el.key].toUpperCase() : userProp[el.key] && el.key === "status" || el.key === "vendorRequestStatus" ?
                                                                    <Button
                                                                        variant="outlined"
                                                                        className={`${userProp[el.key].toLowerCase() === "active" || userProp[el.key] === "APPROVED" ?
                                                                            classes.activeBtn : userProp[el.key].toLowerCase() === "inactive" || userProp[el.key] === "REJECTED" ?
                                                                                classes.inActiveBtn : classes.draftedBtn}`}>{userProp[el.key].toUpperCase()}</Button>
                                                                    :
                                                                    el.key !== 'createdAt'
                                                                        ? el.multiChipView ?
                                                                            renderMultiChipsView(userProp, el.key, el.displayAssignLink, classes, handleEdit) : el.singleChipView ? renderSingleChipView(userProp[el.key], classes)
                                                                                : (typeof userProp[el.key] === 'number' || el.key === 'employeeId') ? userProp[el.key] : capitalizeFirstLetter(userProp[el.key])
                                                                        : convertDate(userProp[el.key])}

                                                            {
                                                                el.key === "jobApplicant" && userProp[el.key] ? <Button className={classes.redirectLink} variant='text' size='small' onClick={() => handleApplicantRedirection(userProp.id)}>View Applicant</Button> : null
                                                            }
                                                             {
                                                                el.key === "jobCandidate" && userProp[el.key] ? <Button className={classes.redirectLink} variant='text' size='small' onClick={() => handleCandidateRedirection(userProp.id)}>View Candidate</Button> : null
                                                            }
                                                            {
                                                                el.name === "Actions" && ((userProp['vendorRequestStatus'] === "REJECTED") || (userProp['vendorRequestStatus'] === "PENDING")) ? <Button variant="outlined" color="primary" size='small' onClick={() => handleApproveRedirection(userProp)}>Approve</Button> : null
                                                            }
                                                            {
                                                                el.name === "Actions" && ((userProp['vendorRequestStatus'] === "REJECTED") || (userProp['vendorRequestStatus'] === "PENDING")) ? <Button variant="outlined" className='ml-4' color="warning" size='small' onClick={() => handleRejectRedirection(userProp)}>Reject</Button> : null
                                                            }


                                                        </TableCell>
                                                    )
                                                }
                                            </>
                                        )
                                    })}
                                </StyledTableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

const renderMultiChipsView = (data, key, displayLink, classes, handleEdit) => {
    const { pathname } = window.location;
    const path = pathname.replace("/", '');
    if (data[key] && data[key].length > 2) {
        return <>
            {data[key] && data[key].slice(0, 2).map((chipValue) => (
                <Chip
                    variant="outlined"
                    label={chipValue.name ? chipValue.name : chipValue.role ? chipValue.role : chipValue.firstName ? `${chipValue.lastName}` : chipValue}
                    className={classes.chip}
                />))}
            <Tooltip title={data[key]?.slice(2)?.map((chipValue) => {
                return <span>{chipValue.name ? chipValue.name : chipValue.role ? chipValue.role : chipValue.firstName ? `${chipValue.lastName}` : chipValue},</span>
            })} placement="bottom">
                <Chip
                    variant="outlined"
                    label={`+${data[key].length - 2}`}
                    className={classes.chip}
                />
            </Tooltip>
        </>
    } else if (data[key] === null || data[key].length === 0) {
        return <p onClick={() => handleEdit(data)} className={`${displayLink && classes.link} cursor-pointer`}>
            {!displayLink ? "-" : "ASSIGN"}
        </p>
    } else if (data[key] && data[key].length <= 2) {
        return data[key].map((chipValue) => (
            <Chip
                variant="outlined"
                label={chipValue && chipValue.name ? chipValue.name : chipValue && chipValue.role ? chipValue.role : chipValue && chipValue.firstName ? `${chipValue.firstName} ${chipValue.middleName} ${chipValue.lastName}` : chipValue}
                className={classes.chip}
            />
        ))
    }
}

const renderSingleChipView = (chipValue, classes) => {
    return <>
        {chipValue ? <Chip
            variant='outlined'
            label={chipValue}
            className={classes.chip}
        /> : "-"}

    </>
}

export default DataTable;
