import React, { useEffect, useState, useRef } from 'react';
import Paper from '@mui/material/Paper';
import { makeStyles, withStyles } from '@mui/styles';
import { IconButton, Icon, Tooltip, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import InfiniteScroll from 'react-infinite-scroll-component';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { capitalizeFirstLetter } from 'utils';
import EmptyView from 'app/components/EmptyView/EmptyView';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import { useSelector } from 'react-redux';
import useSettings from 'app/hooks/useSettings';

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 300,
        tableLayout: "auto",
        border: "1px solid #ccc",
        boxShadow: "0 3px 10px rgba(81, 190, 183, 0.3)"
    },
    approveIcon: {
        cursor: "pointer"
    },
    rejectIcon: {
        cursor: "pointer",
        transform: "rotateY(180deg)"
    },
    approveIconActive: {
        color: "#57C3BB",
        cursor: "pointer"
    },
    rejectIconActive: {
        color: "#C96075",
        cursor: "pointer",
        transform: "rotateY(180deg)"
    }
}))

let StickyTableCell = withStyles((theme) => ({
    head: {
        right: '0rem',
        position: 'sticky',
        zIndex: 100,
        border: 'none',
        paddingRight: '0rem',
        paddingTop: '0px',
        paddingBottom: '1px',
        width: '2rem',
        whiteSpace: 'nowrap',
        paddingLeft: '4rem',
        backgroundColor: '#F1F0F0',
        borderBottom: '1px solid rgba(224, 224, 224, 1)'
    },
    body: {
        backgroundColor: 'inherit',
        marginRight: 0,
        marginLeft: 0,
        right: '0rem',
        left: 0,
        position: 'sticky',
        zIndex: 550,
    },
}))(TableCell)

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        //   backgroundColor: theme.palette.common.black,
        //   color: theme.palette.common.white,
        backgroundColor: "#F1F0F0",
        color: "#000",
        paddingLeft: "10px"
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        paddingLeft: "10px",
        color: "#878687"
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        //backgroundColor: theme.palette.action.hover,
        backgroundColor: '#F8FDFD'
    },
    '&:nth-of-type(even)': {
        backgroundColor: "#fff"
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const columns = [
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
    {
        id: 'population',
        label: 'Population',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'size',
        label: 'Size\u00a0(km\u00b2)',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'density',
        label: 'Density',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toFixed(2),
    },
    {
        id: 'actionHeader',
        label: '',
        minWidth: 170,
        align: 'right',
        icon: "more_vert",
        format: (value) => value.toFixed(2),
    },
];

function createData(name, code, population, size) {
    const density = population / size;
    return { name, code, population, size, density };
}

const rows = [
    createData('India', 'IN', 1324171354, 3287263),
    createData('China', 'CN', 1403500365, 9596961),
    createData('Italy', 'IT', 60483973, 301340),
    createData('United States', 'US', 327167434, 9833520),
    createData('Canada', 'CA', 37602103, 9984670),
    createData('Australia', 'AU', 25475400, 7692024),
    createData('Germany', 'DE', 83019200, 357578),
    createData('Ireland', 'IE', 4857000, 70273),
    createData('Mexico', 'MX', 126577691, 1972550),
    createData('Japan', 'JP', 126317000, 377973),
    createData('France', 'FR', 67022000, 640679),
    createData('United Kingdom', 'GB', 67545757, 242495),
    createData('Russia', 'RU', 146793744, 17098246),
    createData('Nigeria', 'NG', 200962417, 923768),
    createData('Brazil', 'BR', 210147125, 8515767),
];

export default function DataTable1(props) {
    const {
        allFormsData,
        formattedColumns,
        formattedRows,
        reference,
        setIsOpen,
        isOpen,
        handleView,
        handleIconClick,
        fetchData,
        workflowData,
        activeIndex,
        primary
    } = props;
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [dotActive, setDotActive] = useState(false);
    const { isApproved } = useSelector((state) => state.modules);
    const classes = useStyles();
    const { settings, updateSettings } = useSettings();
    const fontFamily = settings.themes.typography.fontFamily;

    const handlePopup = () => {
        setIsOpen(true);
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    useEffect(() => {
        if (isOpen) {
            setDotActive(true);
        } else {
            setDotActive(false);
        }
    }, [isOpen]);

    return (
        <Grid
            id="scrollableDiv"
            sx={{ height: 'calc(100vh - 250px)', maxHeight: 'calc(100vh - 250px)' }} >
            {formattedRows && formattedRows.length ?
                <InfiniteScroll
                    dataLength={allFormsData.records ? allFormsData.records.length : 0} //This is important field to render the next data
                    next={fetchData}
                    height={'calc(100vh - 250px)'}
                    hasMore={allFormsData.records && allFormsData.records.length !== allFormsData.total}
                    loader={
                        <p style={{ textAlign: 'center' }}>
                            <b>Loading...</b>
                        </p>
                    }
                    scrollableTarget="scrollableDiv"
                // below props only if you need pull down functionality
                // refreshFunction={this.refresh}
                // pullDownToRefresh
                // pullDownToRefreshThreshold={50}
                // pullDownToRefreshContent={
                //     <h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>
                // }
                // releaseToRefreshContent={
                //     <h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>
                // }
                >
                    <TableContainer style={{ width: "95%", marginLeft: "0.6rem", border: `0.5px solid ${primary}`, borderRadius: "10px" }} component={Paper}>
                        <Table className={classes.table} stickyHeader aria-label="sticky table">
                            <TableHead ref={reference}>
                                <TableRow>
                                    {formattedColumns.map((column) => (
                                        column.id === "actionHeader" ?
                                            (
                                                <StickyTableCell
                                                    className={classes.head}
                                                    key={column.id}
                                                    align={column.align}
                                                    sx={{ wordBreak: 'normal !important', minWidth: '100px !important', fontFamily: fontFamily }}
                                                //style={{ minWidth: column.minWidth }}
                                                >
                                                    {/* <StyledTableCell className='whitespace-no-wrap'> */}
                                                        <IconButton onClick={handlePopup}>
                                                        <Icon style={{ color: dotActive ? primary : "#000" }}>
                                                                {column.icon}
                                                            </Icon>
                                                        </IconButton>
                                                    {/* </StyledTableCell> */}
                                                </StickyTableCell>
                                                    )
                                                    :
                                            <StyledTableCell className='whitespace-no-wrap'> {capitalizeFirstLetter(column.label)}</StyledTableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    (formattedRows?.map((row, index) => {
                                            return (
                                                <StyledTableRow role="checkbox" tabIndex={-1} key={row.code}>
                                                    {/* <StyledTableCell>Hey</StyledTableCell> */}
                                                    {formattedColumns?.map((column) => {
                                                        const value = row[column.id];
                                                        if (column.format && value !== "-") {
                                                            return (
                                                                column.format(value)?.length > 12 ?
                                                                    <Tooltip title={typeof value === "string" ? value?.replace(/<\/?[^>]+>/gi, ' '): value} arrow>
                                                                        <StyledTableCell sx={{ wordBreak: 'normal !important', minWidth: '100px !important',fontFamily:fontFamily }} key={column.id} align={column.align} onClick={() => handleView(column, value, row)} >
                                                                            {/* {column.format(value)} */}
                                                                            <span dangerouslySetInnerHTML={{ __html: typeof value === "string" ? value?.replace(/<\/?[^>]+>/gi, ' ').substring(0, 12).concat('...'): value?.toString().replace(/<\/?[^>]+>/gi, ' ').substring(0, 12).concat('...')}}></span>
                                                                        </StyledTableCell>
                                                                    </Tooltip>
                                                                    :
                                                                    <StyledTableCell sx={{ wordBreak: 'normal !important', minWidth: '100px !important',fontFamily:fontFamily }} key={column.id} align={column.align} onClick={() => handleView(column, value, row)} >
                                                                        {/* {column.format(value)} */}
                                                                        <span dangerouslySetInnerHTML={{ __html: value }}></span>
                                                                    </StyledTableCell>
                                                            )
                                                        }
                                                        else if (workflowData.hasApprovalOnTable && column.icon) {
                                                            return <StickyTableCell sx={{ wordBreak: 'normal !important', minWidth: '100px !important', fontFamily: fontFamily }} key={column.id} align={column.align}>
                                                                <Grid className="flex items-center justify-end">
                                                                    {
                                                                        allFormsData && allFormsData.records.length && allFormsData.records[index]?.previouslyApproved !== null ?
                                                                            allFormsData.records[index]?.approved ? 
                                                                            <>
                                                                                <ThumbDownOffAltIcon onClick={() => handleIconClick(false, row.formId ? row.formId: allFormsData.records[index].id, index)} className={classes.rejectIcon} />
                                                                                <ThumbUpAltIcon onClick={() => handleIconClick(true, row.formId ? row.formId: allFormsData.records[index].id, index)} className={`ml-3 ${classes.approveIconActive}`} /> 
                                                                            </>
                                                                            :
                                                                            <>
                                                                                <ThumbDownAltIcon onClick={() => handleIconClick(false, row.formId ? row.formId: allFormsData.records[index].id, index)} className={classes.rejectIconActive} />
                                                                                <ThumbUpOffAltIcon onClick={() => handleIconClick(true, row.formId ? row.formId: allFormsData.records[index].id, index)} className={`ml-3 ${classes.approveIcon}`} />
                                                                            </>
                                                                        :
                                                                        <>
                                                                            <ThumbDownOffAltIcon onClick={() => handleIconClick(false, row.formId ? row.formId: allFormsData.records[index].id, index)} className={classes.rejectIcon} />
                                                                            <ThumbUpOffAltIcon onClick={() => handleIconClick(true, row.formId ? row.formId: allFormsData.records[index].id, index)} className={`ml-3 ${classes.approveIcon}`} />
                                                                        </>
                                                                    }
                                                                </Grid>
                                                            </StickyTableCell>
                                                        } else {
                                                            return (
                                                                <StyledTableCell onClick={() => handleView(column, value, row)} sx={{ wordBreak: 'normal !important', minWidth: '100px !important',fontFamily:fontFamily }} key={column.id} align={column.align}>
                                                                    {value}
                                                                </StyledTableCell>)
                                                        }
                                                    })}
                                                </StyledTableRow>
                                            );
                                        })
                                    )
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </InfiniteScroll>
                :
                <Grid sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily:fontFamily }}>
                    <EmptyView
                        Imgsrc="/assets/images/No_Data_Illustration.svg"
                        Title="No records found!"
                        subTitleStart="Please revise your"
                        subTitleLink="Filter"
                        subTitleEnd="criteria"
                    //clickHandler={handleFilterClick}
                    />
                </Grid>
            }
        </Grid>
    );
}