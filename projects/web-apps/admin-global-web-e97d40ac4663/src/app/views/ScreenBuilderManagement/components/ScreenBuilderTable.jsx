import React from 'react';
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
import FileCopyIcon from '@material-ui/icons/FileCopy';
import { Box, Icon, IconButton, TableSortLabel, Tooltip, Collapse, Chip, Button } from '@material-ui/core';
import { camelCase } from 'lodash';
import { convertDate } from 'app/views/utilities/DateFormat';
import { styled } from '@material-ui/styles';
import { capitalizeFirstLetter } from 'helper/utils';
import { KeyboardArrowDown, KeyboardArrowUp } from '@material-ui/icons';
import { useDispatch } from 'react-redux';
import { setCollapseExpandState } from '../../../redux/ScreenBuilderManagement/screenBuilderManagementSlice';

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
}))(TableCell);

const useStyles = makeStyles((theme) => ({
    chip: {
        backgroundColor: '#FFFFFF',
        marginRight: '3px'
    },
    link: {
        textDecoration: 'underline',
        color: '#2C3E93',
        marginLeft: '5px'
    },
    table: {
        marginTop: '0rem',
        fontSize: '1rem',
        backgroundColor: "white",
        borderRadius: '4px 4px 0px 0px',
        boxShadow: '0 3px 10px rgba(81, 190, 183, 0.3)',
        "& .MuiTableCell-root": {
            padding: "6px 5px 6px 22px" // <-- arbitrary value
        }
    },
    Paper: {
        // maxHeight: '63vh',
        padding: "0.5rem 0 0.5rem 0.5rem",
        boxShadow: "none",
        backgroundColor: "transparent",
        visibility: "none",
        '&::-webkit-scrollbar': {
            width: 0,
        }
    },
    iconsColor: {
        color: '#9f9f9e',
        display: 'flex',
        alignItems: 'center',
        fontSize: '1.25rem'
    },
    tableHeader: {
        backgroundColor: 'transparent',
        whiteSpace: 'nowrap',
        padding: '0px !important'
    },
    TableCell: {
        whiteSpace: 'nowrap',
        color: '#00000099',
        fontWeight: 400
    },
    tableRow: {
        borderBottom: "0.5px solid rgba(0, 0, 0, 0.1)",
        borderLeft: "0.5px solid transparent",
        borderRight: "0.5px solid transparent",
        '&:hover': {
            border: "0.5px solid rgba(0, 0, 0, 0.2)",
            cursor: "pointer",
            borderRight: "none",
            borderLeft: "none"
        },
        '&:last-child ': {
            borderBottom: "0.5px solid transparent"
        },
        '&:first-child ': {
            borderTop: "0.5px solid transparent"
        }
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
        borderBottom: "0.5px solid rgba(0, 0, 0, 0.1)",
        borderLeft: "0.5px solid transparent",
        borderRight: "0.5px solid transparent",
        // borderBottom: "0.5px solid transparent",
        '&:hover': {
            border: "0.5px solid rgba(0, 0, 0, 0.2)",
            cursor: "pointer",
            borderRight: "none",
            borderLeft: "none"

        },
        '& .MuiTableCell-body': {
            color: "rgba(0, 0, 0, .3) !important",

        }
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
        padding: "0.1rem 0.2rem",
        width: '73px',
        backgroundColor: "#EAD9DD"
    },
    activeBtn: {
        color: '#2C3E93 !important',
        fontSize: '13px',
        padding: "0.1rem .2rem",
        width: '73px',
        border: '1px solid #2C3E93',
        backgroundColor: '#E7F7F1'
    },
    draftedBtn: {
        color: '#00000099  !important',
        border: '1px solid #00000099',
        fontSize: '13px',
        padding: '0.1rem .2rem',
        width: '73px'
    },
    iconColumnActive: {
        backgroundColor: '#F4F6FC'
    },
    drop: {
        width: "4rem",
        padding: "6px !important"
    },
    status: {
        width: "40px"
    }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(even)': {
        backgroundColor: '#FFF'
    },
    '&:nth-of-type(odd)': {
        backgroundColor: '#F8FDFD'
    },
    root: {
        zIndex: theme.zIndex.appBar + 1
    }
}));

function ScreenBuilderTable({
    hasCopyIcon,
    hasDeleteIcon,
    hasEditIcon,
    hasViewIcon,
    hasInfoIcon,
    tableHeading,
    tableData,
    handleEdit,
    handleModuleDelete,
    handleSubModuleCopy,
    handleSubModuleDelete,
    handleInfo,
    handleView,
    handleSort,
    columnToSort,
    sortDirection,
    setIsOpen,
    reference,
    filterDetails
}) {
    const classes = useStyles();
    const dispatch = useDispatch();

    const handleToggle = (e, userPropId) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch({
            type: setCollapseExpandState.type,
            payload: {
                id: userPropId
            }
        });
    }
    return (
        <div>
            <TableContainer className={classes.Paper}
                style={Object.values(filterDetails).some(v => v) ? { maxHeight: "calc(100vh - 300px)" } : { maxHeight: "calc(100vh - 260px)" }}
                component={Paper}>
                <Table
                    className={`${classes.table} w-full`}
                    aria-label="simple table">
                    <TableHead ref={reference} className={classes.tableHeader}>
                        <TableRow>
                            {tableHeading.map((heading) => {
                                return heading.key === 'actionHeader' ? (
                                    <StickyTableCell className={classes.head} style={{ padding: "0px !important" }}>
                                        <TableCell
                                            key={heading.key}
                                            className="font-semibold pl-5 border-none pt-0 pb-0"
                                        >
                                            <IconButton style={{ marginLeft: '55px' }}
                                                onClick={() => setIsOpen(true)}>
                                                <Icon>{heading.icon}</Icon>
                                            </IconButton>
                                        </TableCell>
                                    </StickyTableCell>
                                ) : (
                                    <TableCell
                                        key={heading.key}
                                        className={`font-semibold text-14 border-none cursor-pointer 
                                        ${classes.TableCell}
                                        ${heading.name === "Roles" ? "pr-5" : ""}`}
                                    >
                                        {heading.name === "Icon"
                                            || heading.name === "Sub Module Name"
                                            || heading.name === "Roles" ?
                                            heading.name
                                            :
                                            <TableSortLabel
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
                    <>
                        <TableBody>
                            {tableData &&
                                tableData.map((userProp, index) => (
                                    <>
                                        <StyledTableRow
                                            key={index}
                                            className={`${tableData[index].status === 'INACTIVE'
                                                || tableData[index].status === 'DRAFT' ?
                                                classes.disabledView : classes.tableRow} 
                                        ${tableData[index].status === 'INACTIVE' ? 'color-primary' : ''}`
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
                                                                    <TableCell className="border-none">
                                                                        <TableCell className="p-0 border-none">
                                                                            <div className={classes.iconsColor}>
                                                                                {hasCopyIcon ? (
                                                                                    <FileCopyIcon
                                                                                        className={`m-2 cursor-pointer invisible-on-pc`}                                                                                        
                                                                                    />
                                                                                ) : null}
                                                                                {hasDeleteIcon ? (
                                                                                    <DeleteIcon
                                                                                        className={`m-2 cursor-pointer `}
                                                                                        onClick={() =>
                                                                                            handleModuleDelete(
                                                                                                userProp
                                                                                            )
                                                                                        }
                                                                                    />
                                                                                ) : null}
                                                                                {hasEditIcon ? (
                                                                                    <EditIcon
                                                                                        className={`m-2 cursor-pointer `}
                                                                                        onClick={() =>
                                                                                            handleEdit(userProp, "module")
                                                                                        }
                                                                                    />
                                                                                ) : null}
                                                                                {/* {hasViewIcon ? (
                                                                            <VisibilityIcon
                                                                                className={`m-2 cursor-pointer ${userProp.status === 'INACTIVE' ? 'in-active' : ''}`}
                                                                                onClick={() =>
                                                                                    handleView(
                                                                                        userProp
                                                                                    )
                                                                                }
                                                                            />
                                                                        ) : null} */}
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
                                                                    className={`${el.key === 'status'
                                                                        && `${classes[camelCase(userProp[el.key])]}`} border-none font-normal 
                                                                    ${classes.TableCell} ${classes.body} ${typeof userProp[el.key] === "number" ? "text-right" : ''} 
                                                                    ${el.key === "roles" ? "pl-12" : ''} ${el.key === "drop" ? classes.drop : " "}`}
                                                                    onClick={() =>
                                                                        handleEdit(userProp, "module")
                                                                    }
                                                                >
                                                                    {el.key === 'drop' && userProp.subModules.length > 0 && (
                                                                        <IconButton key={index} onClick={(e) => handleToggle(e, userProp.id)}>
                                                                            {userProp.isExpand ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                                                                        </IconButton>
                                                                    )}
                                                                    {userProp[el.key] && el.key === 'roles' && userProp[el.key].length === 0 && userProp[el.key].length}
                                                                    {userProp[el.key] && el.key === 'roles' && userProp[el.key].length > 0 && < Tooltip placement="bottom" title={userProp[el.key].map((el) => <p>{el.role}</p>)}><p>{userProp[el.key].length}</p></Tooltip>}
                                                                    {userProp[el.key] === "" || (userProp[el.key] === null && el.key !== 'mappedStores' ? "-" : "")}
                                                                    {userProp[el.key] && userProp[el.key].length > 10 && el.key !== 'createdAt' && el.key !== 'icon'
                                                                        && el.key !== 'subModules' ?
                                                                        (
                                                                            userProp[el.key] && userProp[el.key].length > 20 ?
                                                                                <Tooltip title={userProp[el.key]} arrow>
                                                                                    <p>{capitalizeFirstLetter(userProp[el.key]).slice(0, 20) + " ..."}</p>
                                                                                </Tooltip>
                                                                                :
                                                                                capitalizeFirstLetter(userProp[el.key])
                                                                        )
                                                                        :
                                                                        userProp[el.key] && el.key === "clientId" ?
                                                                            (
                                                                                userProp[el.key].toUpperCase()
                                                                            )
                                                                            :
                                                                            userProp[el.key] && el.key === "status" ?
                                                                                (
                                                                                    <Button
                                                                                        variant="outlined"
                                                                                        className={`${userProp[el.key].toLowerCase() === "active" ?
                                                                                            classes.activeBtn : userProp[el.key].toLowerCase() === "inactive" ?
                                                                                                classes.inActiveBtn : classes.draftedBtn}`}>{userProp[el.key].toUpperCase()}
                                                                                    </Button>
                                                                                )
                                                                                :
                                                                                el.key !== 'createdAt'
                                                                                    ?
                                                                                    el.key === 'mappedStores' ?
                                                                                        (
                                                                                            renderChipsView(userProp, el.key, classes, handleEdit)
                                                                                        )
                                                                                        : typeof userProp[el.key] === 'number' ?
                                                                                            (
                                                                                                userProp[el.key]
                                                                                            )
                                                                                            : el.key === 'icon' ?
                                                                                                (
                                                                                                    <Icon className={classes.iconsColor}>{userProp[el.key]}</Icon>
                                                                                                )
                                                                                                : capitalizeFirstLetter(userProp[el.key])
                                                                                    : convertDate(userProp[el.key])}

                                                                </TableCell>
                                                            )
                                                        }
                                                    </>
                                                )
                                            })}
                                        </StyledTableRow>
                                        {userProp.isExpand ? <>
                                            {userProp.subModules.map((subModule) => {
                                                return <StyledTableRow
                                                    className={
                                                        `${subModule.status ===
                                                            'INACTIVE' ||
                                                            subModule.status === 'DRAFT'
                                                            ? classes.disabledView
                                                            : classes.tableRow} ${subModule.status ===
                                                                'INACTIVE' ? 'color-primary' : ''}`
                                                    }>
                                                    {tableHeading.map((heading) => {
                                                        return <>
                                                            {
                                                                heading.icon ? <Collapse in={userProp.isExpand} component="td" className="border-none">
                                                                    <StickyTableCell
                                                                        className={`${subModule[heading.key] ===
                                                                            'INACTIVE'
                                                                            ? classes.disabledViewIcons
                                                                            : subModule[heading.key] ===
                                                                                'ACTIVE'
                                                                                ? classes.iconContainer
                                                                                : ""
                                                                            }  p-0 border-none`}
                                                                    >
                                                                        <TableCell className="border-none">
                                                                            <TableCell className="p-0 border-none">
                                                                                <div
                                                                                    className={
                                                                                        classes.iconsColor
                                                                                    }
                                                                                >
                                                                                    {hasCopyIcon ? (
                                                                                        <FileCopyIcon
                                                                                            className={`m-2 cursor-pointer ${subModule.mappedBy !== null ? 'invisible-on-pc' : ''}`}
                                                                                            onClick={() =>
                                                                                                handleSubModuleCopy(
                                                                                                    userProp, subModule
                                                                                                )
                                                                                            }
                                                                                        />
                                                                                    ) : null}
                                                                                    {hasDeleteIcon ? (
                                                                                        <DeleteIcon
                                                                                            className={`m-2 cursor-pointer`}
                                                                                            onClick={() =>
                                                                                                handleSubModuleDelete(
                                                                                                    userProp, subModule
                                                                                                )
                                                                                            }
                                                                                        />
                                                                                    ) : null}
                                                                                    {hasEditIcon ? (
                                                                                        <EditIcon
                                                                                            className={`m-2 cursor-pointer`}
                                                                                            onClick={() =>
                                                                                                handleEdit(userProp, "submodule", subModule)
                                                                                            }
                                                                                        />
                                                                                    ) : null}
                                                                                    {/* {hasViewIcon ? (
                                                                            <VisibilityIcon
                                                                                className={`m-2 cursor-pointer ${userProp.status ===
                                                                                    'INACTIVE'
                                                                                    ? 'in-active'
                                                                                    : ''
                                                                                    }`}
                                                                                onClick={() =>
                                                                                    handleView(
                                                                                        userProp
                                                                                    )
                                                                                }
                                                                            />
                                                                        ) : null} */}
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
                                                                    </StickyTableCell></Collapse> :
                                                                    <Collapse in={userProp.isExpand} component="td">
                                                                        <TableCell
                                                                            className={`${heading.key === 'status'
                                                                                && `${classes[camelCase(subModule[heading.key])]}`} border-none font-normal 
                                                                        ${classes.TableCell} ${classes.body} ${typeof subModule[heading.key] === "number" ?
                                                                                    "text-right" : ''} ${heading.key === "roles" ? "pl-12" : ''}`}
                                                                            onClick={() =>
                                                                                handleEdit(userProp, "submodule", subModule)
                                                                            }
                                                                        >
                                                                            {
                                                                                heading.key === "icon" ?
                                                                                    <Icon className={classes.iconsColor}>{subModule[heading.key]}</Icon> :
                                                                                    heading.key === "roles" ?
                                                                                        <Tooltip placement="bottom" title={subModule.roles && subModule.roles.map((x, index) => {
                                                                                            return <p key={index}>{x.role}</p>
                                                                                        })}>
                                                                                            <div>{subModule[heading.key]?.length}</div>
                                                                                        </Tooltip>
                                                                                        :
                                                                                        heading.key === "status" ?
                                                                                            // subModule[heading.key].charAt(0).toUpperCase() +
                                                                                            // subModule[heading.key].slice(1).toLowerCase()
                                                                                            <Button
                                                                                                variant="outlined"
                                                                                                className={`${subModule[heading.key]?.toLowerCase() === "active" ?
                                                                                                    classes.activeBtn : subModule[heading.key]?.toLowerCase() === "inactive" ?
                                                                                                        classes.inActiveBtn : classes.draftedBtn}`}>{subModule[heading.key]?.toUpperCase()}</Button>
                                                                                            :
                                                                                            heading.key === "subModules" ?
                                                                                                subModule.name.length > 25 ?
                                                                                                    <Tooltip title={subModule.name} arrow>
                                                                                                        <p>{capitalizeFirstLetter(subModule.name).slice(0, 25) + " ..."}</p>
                                                                                                    </Tooltip>
                                                                                                    :
                                                                                                    capitalizeFirstLetter(subModule.name)
                                                                                                : null
                                                                            }
                                                                        </TableCell>
                                                                    </Collapse>
                                                            }
                                                        </>
                                                    })}
                                                </StyledTableRow>

                                            })}
                                        </> : null}
                                    </>
                                ))}
                        </TableBody>
                    </>
                </Table>
            </TableContainer>
        </div>
    )
}

const renderChipsView = (data, key, classes, handleEdit) => {
    return <>
        {
            data[key] && data[key].slice(0, 2).map((chipValue) => (
                <Chip
                    variant="outlined"
                    label={chipValue}
                    className={classes.chip}
                />
            ))
        }
        {data[key] && data[key].length > 2 &&
            <Chip
                variant="outlined"
                label={`+${data[key].length - 2}`}
                className={classes.chip}
            />
        }
        {(data[key] === null || data[key].length === 0) &&
            <p onClick={() => handleEdit(data)} className={`${classes.link} cursor-pointer`}>
                ASSIGN
            </p>
        }
    </>
}

export default ScreenBuilderTable;
