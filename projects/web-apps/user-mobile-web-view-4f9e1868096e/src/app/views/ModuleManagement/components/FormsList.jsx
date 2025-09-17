import React, { Fragment, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@mui/styles';
import { Grid, Button, ClickAwayListener, alertTitleClasses, IconButton, Tooltip, Icon } from '@mui/material';
import DataTable from 'app/components/V5GlobalDataTable/DataTable';
import DataTable1 from 'app/components/V5GlobalDataTable/DataTable1';
import PopoverMenu from 'app/components/PopoverMenu/PopoverMenu';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import { V5GlobalHeaderActionList, V5GlobalIconButtons } from 'app/components'
import FilterChips from './FilterChips';
import { styled } from '@mui/system';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useParams } from 'react-router-dom';

const useStyles = makeStyles(({ palette, ...theme }) => ({
    arrowIcon: {
        color: "#bbb",
        fontSize: "1.3rem"
    },
    boxStyle: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        border: 'none !important',
        borderRadius: "2px",
        width: '360px'
    },
    tablePopupContainer: {
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        marginTop: '0.3rem',
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
    topHeadingContainer: {
        borderRadius: "10px",
        marginLeft: "1.7rem",
        marginRight: "0.8rem",
        alignItems: "center",
        backgroundColor: "#fff"
    },
    mobileBackIconPosition: {
        position: "relative",
        top: "-3.2rem"
    }
}));

const OutlinedButton = styled(Button)(({primaryColor, isAllCoumnsSelected }) => ({
    backgroundColor: `rgba(${primaryColor}, .2)`,
    color: isAllCoumnsSelected? primaryColor: 'rgba(0, 0, 0, 0.6)',
    border: isAllCoumnsSelected? `1px solid ${primaryColor}`: '1px solid rgba(0, 0, 0, 0.6)'
}))

// const OutlinedButton = styled(Button)(({primaryColor, isAllCoumnsSelected }) => ({
//     backgroundColor: `rgba(${primaryColor}, .2)`,
//     color: isAllCoumnsSelected? primaryColor: 'rgba(0, 0, 0, 0.6)',
//     border: isAllCoumnsSelected? `1px solid ${primaryColor}`: '1px solid rgba(0, 0, 0, 0.6)'
// }))

function FormsList(props) {
    const {
        activeModuleName,
        allFormsData,
        columnsAndFilters,
        formattedColumns,
        formattedRows,
        handleFilterClick,
        isFilterPopupOpen,
        selectedModuleName,
        handleView,
        handleIconClick,
        fetchData,
        primaryColor,
        handleDownloadExel,
    } = props;
    const classes = useStyles();
    const [isOpen, setIsOpen] = useState(false);
    const anchorRef = useRef(null);
    const { moduleFilterDetails, moduleChipsFilterDetails, workflowData } = useSelector((state) => state.modules);
    const [isAllCoumnsSelected, setIsAllCoumnsSelected] = useState(false);
    const [checkedValues, setCheckedValues] = useState(['actionHeader']);
    const [filteredTableHeading, setFilteredTableHeading] = useState([]);
    const { mid } = useParams();
    const navigate = useNavigate();
    const isMobile = localStorage.getItem("isMobile");
    function selectColumn(key) {
        if (checkedValues && checkedValues.length > 0) {
            if (key !== "all") {
                setCheckedValues(
                    checkedValues.includes(key)
                        ? checkedValues.filter((c) => {
                            if (key === "subModules") {
                                return c !== key && c !== "drop"
                            } else {
                                return c !== key
                            }

                        })
                        : key === "subModules" ? [...checkedValues, key, "drop", "name"] : [...checkedValues, key]
                );
                const cv = checkedValues.includes(key)
                    ? checkedValues.filter((c) => c !== key)
                    : [...checkedValues, key];
                let all = true;
                formattedColumns.forEach((el) => {
                    if (!cv.includes(el.id)) {
                        all = false;
                    }

                });
                setIsAllCoumnsSelected(all);
            } else {
                if (!isAllCoumnsSelected) {
                    let cv = [];
                    formattedColumns.forEach((el) => {
                        cv.push(el.id);
                    });
                    setCheckedValues(cv);
                    setIsAllCoumnsSelected(true);
                } else {
                    setCheckedValues(['actionHeader']);
                    setIsAllCoumnsSelected(!isAllCoumnsSelected);
                }
            }
        }
    }
    useEffect(() => {
        if (formattedColumns && formattedColumns.length) {
            const filterHeading = formattedColumns.filter((el) =>
                checkedValues.includes(el.id)
            );
            setFilteredTableHeading(filterHeading);
        }
    }, [checkedValues]);

    useEffect(() => {
        let cv = [];
        formattedColumns.forEach((el) => {
            cv.push(el.id);
        });
        setCheckedValues(cv);
        setIsAllCoumnsSelected(true)
    }, [formattedColumns]);
    const handleBack = () => {
        navigate(`/module/${activeModuleName.name}/${mid}`);
    }
    return (
        <div>
            <Grid container direction="row" sx={{ marginLeft: "10px", marginTop: "10px" }}>

            </Grid>
            <Grid container direction="row"
                // style={{ justifyContent: "right" }}
                spacing={2}
                className="justify-between flex items-center">
                <Grid item>
                    <Icon className={`ml-5 mb-8 mt-1 cursor-pointer ${isMobile === "true" && classes.mobileBackIconPosition}`} onClick={handleBack}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="20px" fill="#000000">
                            <path d="M0 0h24v24H0z" fill="none" />
                            <path d="M11.67 3.87L9.9 2.1 0 12l9.9 9.9 1.77-1.77L3.54 12z" />
                        </svg>
                    </Icon>
                </Grid>
                {formattedRows && formattedRows.length || Object.values(moduleChipsFilterDetails).some(v=>v)?
                    <Grid style={{ border: `1px solid ${primaryColor}`, marginTop: `${isMobile === 'true' && '-2.3rem'}` }} className={`flex justify-between w-full mb-3 pt-1 pb-1 ${classes.topHeadingContainer}`}>
                        <Grid className="flex items-center ml-4">
                            {/* <ArrowBackIcon className="mr-3 cursor-pointer" onClick={handleBack} /> */}
                            <h3 className='mt-1 font-medium'>{selectedModuleName}</h3>
                        </Grid>
                        <Grid>
                        <V5GlobalIconButtons
                            key={2}
                            iconType={'Filter'}
                            tooltipTitle={'Filter'}
                            areaLabel={'Filter Popup'}
                            iconComponent={'span'}
                            iconClickHandler={handleFilterClick}
                            filterPopupOpen={isFilterPopupOpen}
                                color={primaryColor}
                        />
                         <V5GlobalIconButtons
                            key={1}
                            iconType={'download'}
                            tooltipTitle={'Download Excel'}
                            areaLabel={'Download Excel'}
                            iconComponent={'span'}
                            iconClickHandler={handleDownloadExel}
                            length={allFormsData.records?.length}
                            isDisabled={formattedRows?.length > 0 ? false : true}
                                color={primaryColor}
                        />
                        </Grid>

                    </Grid> : null
                }
            </Grid>
            <FilterChips chipInfo={moduleChipsFilterDetails} filtersInfo={moduleFilterDetails} primaryColor={primaryColor}/>
            <Grid
                sx={{ maxWidth: '100%', overflowX: 'scroll' }}
                spacing={3}
                direction="column">
                <Grid item>
                    <DataTable1
                        allFormsData={allFormsData}
                        formattedColumns={filteredTableHeading.length > 1 ? filteredTableHeading : formattedColumns}
                        formattedRows={formattedRows}
                        reference={anchorRef}
                        setIsOpen={setIsOpen}
                        isOpen={isOpen}
                        workflowData={workflowData}
                        handleView={handleView}
                        handleIconClick={handleIconClick}
                        fetchData={fetchData}
                        primary={primaryColor}
                    />
                </Grid>
            </Grid>
            <PopoverMenu
                width={200}
                open={isOpen}
                onClose={() => setIsOpen(false)}
                anchorEl={anchorRef.current}
            >
                <ClickAwayListener onClickAway={() => setIsOpen(false)}>
                    {/* Keep your code here */}
                    <div
                        style={{
                            paddingTop: "1rem",
                            paddingBottom: "1rem"
                        }}
                        className={`${classes.popOverMenu}`}>
                        <div key={"all_0"} className={classes.tablePopupContainer}  >
                            <OutlinedButton 
                                onClick={() => selectColumn("all")}
                                style={{ 
                                    justifyContent: "left",
                                }}
                                className={`w-full mt-2 pl-3 pr-3 ml-5 mr-5`}
                                isAllCoumnsSelected={isAllCoumnsSelected}
                                variant="outlined"
                                primaryColor={primaryColor}
                            >
                                {"Select All"}
                            </OutlinedButton>
                        </div>
                        {formattedColumns && formattedColumns.map((el, index) => {
                            return el.id !== "actionHeader" &&
                                (
                                    <div key={index} className={classes.tablePopupContainer}>
                                        {el.icon ? null :
                                            <OutlinedButton
                                                onClick={() => selectColumn(el.id)}
                                                style={{ justifyContent: "left" }}
                                                className={`w-full mt-2 pl-3 pr-3 ml-5 mr-5`}
                                                isAllCoumnsSelected={checkedValues.includes(el.id)}
                                                primaryColor={primaryColor}
                                            >
                                               <Tooltip title={el.label.length >= 14? el.label : ``} enterTouchDelay={0} ><div>{el.label && el.label.length > 14 ? el.label.slice(0, 14) + "..." : el.label}</div></Tooltip>
                                            </OutlinedButton>
                                        }
                                    </div>
                                )
                        })}
                    </div>
                </ClickAwayListener>
            </PopoverMenu>
        </div>
    )
}

export default FormsList;