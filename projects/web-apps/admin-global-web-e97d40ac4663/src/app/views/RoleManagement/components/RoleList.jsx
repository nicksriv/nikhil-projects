import React, { useEffect, useRef, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import DataTable from 'app/components/V5GlobalDataTable/DataTable'
import { FormControl, MenuItem, Select, InputBase, ClickAwayListener, Button } from '@material-ui/core';
import Paginate from 'app/components/V5GlobalDataTable/Paginate';
import { styled } from "@material-ui/styles"
import PopoverMenu from 'app/components/PopoverMenu/PopoverMenu';
import { ConfirmationDialog, DetailsDailogue } from 'app/components';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

function RoleList({
    heading,
    tableData,
    paginate,
    pageNumber,
    pageSize,
    page,
    setPageSize,
    totalItems,
    indexOfFirstData,
    indexOfLastData,
    filterDetails
}) {

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
        root: {
            '& .MuiButton-label': {
                justifyContent: "left !important"
            }
        },
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
            paddingBottom: "1rem",
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

    const classes = useStyles();
    const anchorRef = useRef(null);
    const history = useHistory();
    const [isOpen, setIsOpen] = useState(false);
    // const [columnToSort, setColumnToSort] = useState("");
    const [filteredTableHeading, setFilteredTableHeading] = useState([]);
    const [checkedValues, setCheckedValues] = useState(["actionHeader"]);
    const [showDeletePopup, setshowDeletePopup] = useState(false);
    const [showInfoPopup, setShowInfoPopup] = useState(false);
    const [description, setDescription] = useState("");

    const { rolesList } = useSelector((state) => state.roles);
    function selectColumn(key) {
        setCheckedValues(checkedValues.includes(key) ? checkedValues.filter(c => c !== key) : [...checkedValues, key]);
    }
    const handleDelete = () => {
        setshowDeletePopup(true);
    }
    const handleInfo = (roleInfo) => {
        setDescription(roleInfo.description)
        setShowInfoPopup(true);
    }
    const handleView = (selectedRole) => {
        if (selectedRole
            && selectedRole.id) {
            const id = selectedRole.id;
            history.push(`/role/view?id=${id}`);
        }
    }
    const handleEdit = (selectedRole) => {
        if (selectedRole && selectedRole.id) {
            const id = selectedRole.id
            history.push(`/role/edit?id=${id}`);
        }
    }
    const closeClientDetailsPopup = () => {
        setShowInfoPopup(false);
    }
    const handleSort = () => {
        return;
    }

    useEffect(() => {
        const filterHeading = heading.filter((el) => checkedValues.includes(el.key));
        setFilteredTableHeading(filterHeading);
    }, [checkedValues]);

    return (
        <div>
            <PopoverMenu
                width={200}
                open={isOpen}
                onClose={() => setIsOpen(false)}
                anchorEl={anchorRef.current}

            >
                <ClickAwayListener onClickAway={() => setIsOpen(false)}>
                    {/* Keep your code here */}
                    <div className={classes.popOverMenu}>
                        {heading.map((el, index) => {
                            return <div key={index} className={classes.tablePopupContainer}>
                                {el.icon ? null :
                                    <Button onClick={() => selectColumn(el.key)}
                                        className={`w-full mt-2 pl-3 pr-3 ml-5 mr-5 justify-start ${checkedValues.includes(el.key) ? "color-primary border-primary" : "color-gray border-gray"}`}
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
                tableHeading={filteredTableHeading.length > 1 ? filteredTableHeading : heading}
                hasEditIcon={true}
                hasInfoIcon={true}
                tableData={tableData}
                setIsOpen={setIsOpen}
                isOpen={isOpen}
                reference={anchorRef}
                handleDelete={handleDelete}
                handleInfo={handleInfo}
                handleView={handleView}
                handleSort={handleSort}
                handleEdit={handleEdit}
                filterDetails={filterDetails}
            />
            <div className={classes.paginationContainer}>
                <div className="flex items-end justify-centers">
                    <Paginate page={page} paginate={paginate} pageSize={pageSize} listSize={rolesList.total} />
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
                        {indexOfFirstData + 1}-{indexOfLastData > totalItems ? totalItems : indexOfLastData} items of{' '}
                        {totalItems}
                    </p>
                </div>
            </div>
            <ConfirmationDialog
                open={showDeletePopup}
                onConfirmDialogClose={() => setshowDeletePopup(false)}
                text={`All users mapped under this role will lose access to Modules mapped as well. Are you sure want to delete?`}
            // onYesClick={confirmDelete}
            />
            <DetailsDailogue
                description={description}
                hasBtn={false}
                open={showInfoPopup}
                descriptionHeading="Description"
                closeAction={closeClientDetailsPopup}
            />
        </div>
    )
}

export default RoleList
