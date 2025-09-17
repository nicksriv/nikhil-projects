import React, { useRef } from 'react';
import { Button, Grid, TableRow, Tooltip } from '@material-ui/core';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import ZoomOutIcon from '@material-ui/icons/ZoomOut';
import { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import V5FormBuilderSlaveScreen from './v5-form-builder-slave-screen';
import V5FormBuilderListingScreen from './v5-form-builder-listing-screen';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import ContextMenu from "simple-context-menu";
import PanTool from "@material-ui/icons/PanTool";
import PanToolAlt from "@material-ui/icons/PanToolTwoTone";
import PlaceHolder from './form-place-holder';
import store from './stores/store';
import V5FormBuilderMasterScreensHeader from './v5-form-builder-master-screens-header';

const useStyles = makeStyles((theme) => ({
    child: {
        backgroundColor: '#FFFFFF',
        width: '15vw',
        height: '50vh',

        "&:hover": {
            border: '1px solid #2C3E93',
        }
    },
    container: {
        width: '100%',
        //height: '80%',
        //padding: '2%',
        position: 'relative',
    },
    parent: {
        backgroundColor: '#DDDDE3',
        //width: '60%',
        // height:'70vh',
        position: 'relative',
        padding: '1rem',
        paddingLeft: '50px',
        flexWrap: 'wrap',
        //margin:'auto'
    },
    icon: {
        margin: 0,
        position: 'relative',
        // left:'10rem',
        // bottom:'53vh',
        // paddingTop:'0.5rem',
        right: '1.4rem',
        bottom: '1.4rem'

    },
    button: {
        display: 'inline-block',
        position: 'relative',
        left: '612px',
        overflow: 'auto',
        zIndex: 1,
    },
    customButton: {
        paddingRight: '5px',
        paddingLeft: '5px',
        minWidth: '20px'
    }
}));

const ContextMenuDataSource = [
    {
        title: "Zoom In",
        key: "zoomIn"
    },
    {
        title: "Zoom Out",
        key: "zoomOut"
    },
    {
        title: "Reset Zoom",
        key: "resetZoom"
    }
];

function V5FormBuilderMasterScreens(props) {
    const {
        masterScreensWorkflowData,
        handleAdd,
        internalScreensChecked,
        handleEdit,
        clientLogo,
        handleWorkflowDataDnD,
        ScreenSkeletonComponent,
        showPrivilegePreviewPlaceholder,
        status,
        handleStatusChange
    } = props;
    const classes = useStyles();
    const contextMenu = new ContextMenu();
    const transformRef = useRef(null);

    const [hover, setHover] = React.useState(false);
    const [icon, setIcon] = React.useState(false);
    const [number, setNumber] = React.useState(null);
    const [indexNumber, setIndexNumber] = React.useState(null)
    const [dragId, setDragId] = React.useState();

    const [panning, setPanning] = React.useState(true)
    // const panning = {
    //     disabled : true
    // }
    const handlePan = () => {
        setPanning(!panning)
    }

    const handleClick = (e) => {
        //e.preventDefault();
        // const md = masterScreensWorkflowData.slice(0);
        // const sd = md[number].screenData;
        // store.dispatch('updateOrder', sd);
        //handleEdit(indexNumber);
        e.preventDefault();
        // e.stopPropagation();
        //const tempData = [...featureTemplates];
        const tempData = masterScreensWorkflowData.slice(0);
        const formData = tempData[number].screenData;
        const screenTitle = tempData[number].screenTitle;
        //store.dispatch('load', { data: formData || [] });
        store.dispatch('updateOrder', formData);
        handleEdit(indexNumber, screenTitle);
    }

    const handleIndex = (e) => {
        //e.preventDefault();
        store.dispatch('updateOrder', []);
        handleAdd(number);
    }
    const handleCardMouseOver = (e, index) => {
        setIcon(true);
        setIndexNumber(index);
        setNumber(index);
    }
    const handleCardMouseLeave = (e) => {
        setIcon(false);
        setIndexNumber(null);
    }
    const handleArrowMouseOver = (e, index) => {
        setHover(true);
        setNumber(index);
    }
    const handleArrowMouseLeave = (e) => {
        setHover(false);
        setNumber(null);
    }

    const callBack = (key) => {
        if (key === "resetZoom") {
            //setDrag(false);
            transformRef.current?.resetTransform();
        } else if (key === "zoomOut") {
            transformRef.current?.zoomOut();
        } else {
            //setDrag(true);
            transformRef.current?.zoomIn();
        }
    };

    const options = {
        delay: 500 //delay submenu
    };

    useEffect(() => {
        contextMenu.register("#target", callBack, ContextMenuDataSource, options);
    });

    const dragStart = (e, x) => {
        e.stopPropagation();
        //console.log(e.currentTarget.id)
        setDragId(x.screenTitle);
    }

    const drop = (e, x) => {
        e.stopPropagation();
        e.preventDefault();
        const dragBox = masterScreensWorkflowData.find((box) => box.screenTitle === dragId);
        const dropBox = masterScreensWorkflowData.find((box) => box.screenTitle === x.screenTitle);

        const dragBoxOrder = dragBox.displayIndex;
        const dropBoxOrder = dropBox.displayIndex;

        if (!x.isListingPage) {
            const newBoxState = masterScreensWorkflowData.map((box) => {
                if (box.screenTitle === dragId) {
                    box.displayIndex = dropBoxOrder;
                }
                if (box.screenTitle === x.screenTitle) {
                    box.displayIndex = dragBoxOrder;
                }
                return box;
            });

            handleWorkflowDataDnD(newBoxState);
        }

    }

    return (
        <>
            <div className="App react-form-builder clearfix" style={{
                backgroundColor: '#DDDDE3',
                border: "1px solid #0000001F",
                borderRadius: "4px",
                opacity: 1
            }}>
                <TransformWrapper initialScale={1} ref={transformRef} disabled={panning} >
                    {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
                        <>
                            <V5FormBuilderMasterScreensHeader
                                panning={panning}
                                handlePan={handlePan}
                                zoomIn={zoomIn}
                                zoomOut={zoomOut}
                                resetTransform={resetTransform}
                                status={status}
                                handleStatusChange={handleStatusChange}
                                showPrivilegePreviewPlaceholder={showPrivilegePreviewPlaceholder}
                            />
                            {/* <Grid container className={`${classes.container} mt-2`} zIndex='-1' direction='row' justifyContent="space-between">
                                <Grid item style={{ textAlign: "centre", }} >
                                    <div className="mt-2 ml-2">
                                        {
                                            panning ? <Tooltip placement="bottom" title="Enable Panning">
                                                <PanTool onClick={handlePan} />
                                            </Tooltip>
                                                :
                                                <Tooltip placement="bottom" title="Disable Panning">
                                                    <PanToolAlt onClick={handlePan} />
                                                </Tooltip>
                                        }
                                    </div>
                                </Grid>
                                <Grid item style={{ textAlign: "right", margin: '0.2rem', zIndex: 1 }} >
                                    <div className="mt-2 mr-2">
                                        <Button variant="outlined" className={classes.customButton} onClick={() => zoomIn()} ><ZoomInIcon /></Button >
                                        <Button variant="outlined" className={classes.customButton} onClick={() => resetTransform()} >Reset</Button >
                                        <Button variant="outlined" className={classes.customButton} onClick={() => zoomOut()} ><ZoomOutIcon /></Button >
                                    </div>
                                </Grid>
                            </Grid> */}
                            {
                                showPrivilegePreviewPlaceholder && (
                                    <div className={"form-place-holder-workflow"} >
                                        {"Workflow Preview"}
                                    </div>
                                )
                            }
                            <TableRow>
                                <TransformComponent>
                                    <div
                                        className="img-container"
                                        style={{ backgroundColor: "#DDDDE3" }}
                                        id="target"
                                    //draggable="true"
                                    >
                                        <Grid container direction="row"
                                            className={`${classes.parent} ParentDiv target`}
                                            //justifyContent="center"
                                            alignItems="center"
                                            zIndex="-1"
                                        >
                                            {!showPrivilegePreviewPlaceholder && masterScreensWorkflowData
                                                .sort((a, b) => a.displayIndex - b.displayIndex)
                                                .map((x, index) => {
                                                    return (
                                                        <Grid item key={index} style={{ marginTop: '2rem' }}>
                                                            <h6 style={{ textAlign: "left", fontWeight: "normal" }}>{x.screenTitle}</h6>
                                                            <Grid container justifyContent="flex-end" alignItems="center"
                                                                onMouseOver={(e) => handleCardMouseOver(e, index)}
                                                                onMouseLeave={(e) => handleCardMouseLeave(e)}
                                                            >
                                                                <Grid item>
                                                                    <Grid container
                                                                        id={x.displayIndex}
                                                                        onDrop={(e) => drop(e, x)}
                                                                        onDragOver={e => {
                                                                            e.preventDefault();
                                                                            e.stopPropagation();
                                                                        }}
                                                                    >
                                                                        <Grid item
                                                                            draggable={!x.isListingPage ? "true" : "false"}
                                                                            id={x.displayIndex}
                                                                            onDragStart={e => dragStart(e, x)}
                                                                        >
                                                                            <div className={classes.child} >
                                                                                {
                                                                                    x.isListingPage && (
                                                                                        <V5FormBuilderListingScreen
                                                                                            //draggable="false"
                                                                                            header="My Attendance"
                                                                                            tableHeaders={x.tableHeaders}
                                                                                            data={x.tableData}
                                                                                            workFlowData={x}
                                                                                            clientLogo={clientLogo}
                                                                                        />
                                                                                    )
                                                                                }
                                                                                {
                                                                                    !x.isListingPage && (
                                                                                        <V5FormBuilderSlaveScreen
                                                                                            open={true}
                                                                                            //handlePopUpClose={}
                                                                                            download_path=""
                                                                                            // back_action="/"
                                                                                            // back_name="Back"
                                                                                            answer_data={{}}
                                                                                            action_name="Save"
                                                                                            form_action="/api/form"
                                                                                            form_method="POST"
                                                                                            hide_actions={false}
                                                                                            skip_validations={false}
                                                                                            //onSubmit={this._onSubmit}
                                                                                            isFormReadOnly={true}
                                                                                            isBootstrapItems={false}
                                                                                            //imageUploadCallback={""}
                                                                                            // variables={this.props.variables}
                                                                                            internalScreensChecked={internalScreensChecked}
                                                                                            data={x.screenData}
                                                                                            workFlowData={x}
                                                                                            screenTitle={x.screenTitle}
                                                                                            masterScreensWorkflowData={masterScreensWorkflowData}
                                                                                            clientLogo={clientLogo}
                                                                                            ScreenSkeletonComponent={ScreenSkeletonComponent}
                                                                                        // fieldResult={JSON.parse(fieldResult)}
                                                                                        // fieldMedia={JSON.parse(fieldMedia)}
                                                                                        // generateBtnLabel="Generate JSON and Save Form"
                                                                                        // collectFormData={this.collectFormData}
                                                                                        // getGeneratedJSON={this.getGeneratedJSON.bind(this)}
                                                                                        // photoPreview={this.getAllPhotosToPreview.bind(this)}
                                                                                        // closePreview={this.closePreview.bind(this)}
                                                                                        />
                                                                                    )
                                                                                }
                                                                            </div>
                                                                        </Grid>
                                                                        <Grid item >
                                                                            {
                                                                                icon && index === indexNumber && !x.isListingPage && !x.isConsolidatedScreen ?
                                                                                    <span
                                                                                        className={`cursor-pointer ${classes.icon}`} onClick={(e) => handleClick(e)}><EditIcon style={{ color: '#2C3E93' }} /></span>
                                                                                    :
                                                                                    <span className={classes.icon} style={{ visibility: 'hidden' }}><EditIcon /></span>
                                                                            }
                                                                        </Grid>
                                                                    </Grid>
                                                                </Grid>
                                                                <Grid item onMouseOver={(e) => handleArrowMouseOver(e, index)}
                                                                    onMouseLeave={(e) => handleArrowMouseLeave(e)}  >
                                                                    <div className={`${x.isConsolidatedScreen ? '' : 'cursor-pointer'}`} style={{ marginLeft: "-1.4rem" }} onClick={(e) => handleIndex(e)}>
                                                                        {
                                                                            x.isConsolidatedScreen ?
                                                                                (
                                                                                    <>
                                                                                        {
                                                                                            index !== (masterScreensWorkflowData.length - 1) ?
                                                                                                (
                                                                                                    <img src={`/assets/images/icons/Icon_Arrow with long tail.svg`} />
                                                                                                ) :
                                                                                                null
                                                                                        }
                                                                                    </>
                                                                                ) :
                                                                                (
                                                                                    index < masterScreensWorkflowData.length - 1 && !hover
                                                                                        ? <img src={`/assets/images/icons/Icon_Arrow with long tail.svg`} />
                                                                                        : hover && index < masterScreensWorkflowData.length - 1 && index === number
                                                                                            ? <img src={`/assets/images/icons/Icon_Arrow with Plus.svg`} />
                                                                                            : index < masterScreensWorkflowData.length - 1
                                                                                                ? <img src={`/assets/images/icons/Icon_Arrow with long tail.svg`} />
                                                                                                : index < masterScreensWorkflowData.length && icon && index === indexNumber
                                                                                                    ? <img src={`/assets/images/icons/Icon_Plus with tail.svg`} />
                                                                                                    : null
                                                                                )
                                                                        }

                                                                    </div>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    )
                                                })}
                                        </Grid>
                                    </div>
                                </TransformComponent>
                            </TableRow>
                            <Grid container direction="row" justifyContent="flex-end" className='p-2 mr-5'>
                                <Grid item style={{ textAlign: 'right', color: "#707070" }}>
                                    Note: Zoom in & out by mouse scroll or pinch on mobile and tablet
                                </Grid>
                            </Grid>
                        </>
                    )}
                </TransformWrapper>



            </div>


        </>

    );
}
export default V5FormBuilderMasterScreens;
