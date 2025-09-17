import {
  Grid,
  Box,
  Modal,
  Button,
  Avatar,
  Tooltip,
  IconButton,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Icon,
  TableBody,
  Paper,
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import DesktopMacIcon from '@material-ui/icons/DesktopMac'
import TabletMacIcon from '@material-ui/icons/TabletMac'
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import CancelIcon from '@material-ui/icons/Cancel'
import { makeStyles } from '@material-ui/core/styles'
import React, { useState } from 'react'
import { styled } from '@material-ui/styles'
import MaterialFormGenerator from './materialForm'
import MoreVertIcon from '@material-ui/icons/MoreVert'

const useStyles = makeStyles(({ palette, ...theme }) => ({
  root: {
    '& .MuiTable-root': {
      // width: "auto",
    },
    '& .MuiTableCell-root': {
      wordBreak: 'normal',
    },
    '& .MuiIconButton-root': {
      padding: '0px 3px',
    },
    '& .makeStyles-Paper-10': {
      padding: 0,
    },
    '& .MuiTableCell-sizeSmall': {
      padding: '6px 3px',
      fontSize: '9px',
      fontWeight: 600,
      textAlign: 'center',
    },
    '& .MuiTableHead-root': {
      backgroundColor: '#dce2f4',
    },
  },
  logoClient: {
    //objectFit: 'contain',
    width: 'auto',
    height: '24px',
  },
  arrowIcon: {
    color: '#bbb',
    fontSize: '1.3rem',
  },
  editIcon: {
    color: '#9F9F9E',
    cursor: 'pointer',
  },
  Paper: {
    border: 'none',
    width: '100%',
    // padding: "1rem",
    visibility: 'none',
    '&::-webkit-scrollbar': {
      width: 0,
    },
    textAlign: 'left',
  },
  // tableRow: {
  //     padding: "8px 20px !important",

  // },
  dataTableStyle: {
    backgroundColor: '#efefef',
  },
}))
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(even)': {
    backgroundColor: 'lightgray',
    borderLeft: '15px solid white',
    borderRight: '15px solid white',
  },
  '&:nth-of-type(odd)': {
    backgroundColor: '#F8FDFD',
    borderLeft: '15px solid white',
    borderRight: '15px solid white',
  },
}))

const deviceViewsEnum = {
  MOBILE: 'mobile',
  TABLET: 'tablet',
  DESKTOP: 'desktop',
}
function V5FormBuilderListingScreen(props) {
  const { header, tableHeaders, data, workFlowData, clientLogo } = props
  const classes = useStyles()
  const [currentSelectedView, setCurrentSelectedView] = useState(
    deviceViewsEnum.MOBILE,
  )

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    //width: 300,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    border: 'none !important',
    borderRadius: '2px',
    width: `${currentSelectedView === deviceViewsEnum.MOBILE
        ? '360px'
        : currentSelectedView === deviceViewsEnum.TABLET
          ? '768px'
          : '992px'
      }`,
  }
  return (
    <div className={classes.root}>
      {/* <Box sx={style}> */}
      <div
        className="v5-form-builder-preview"
        style={{ maxHeight: '345px', height: '327px' }}
      >
        <Grid
          container
          justifyContent="space-between"
          style={{ color: '#bbb', padding: '0 9px', marginTop: '10px' }}
        >
          <Grid item>
            <MenuIcon color="#fff" style={{ marginRight: '5px' }} />
            <img
              className={`${classes.logoClient}`}
              src={clientLogo}
              alt="Logo"
            //style={{ marginRight: '10px' }}
            />
          </Grid>
          <Grid item>
            <Avatar
              className="cursor-pointer float-right"
              src={'/assets/images/face-6.jpg'}
              style={{ width: '30px', height: '30px' }}
            />
          </Grid>
        </Grid>
        <div class="hrcover ">
          <hr class="mt-1 mb-0" />
        </div>
        <div
          style={{
            display: 'flex',
            alignItem: 'center',
            justifyContent: 'space-between',
            backgroundColor: 'ghostwhite',
            padding: '5px 9px',
          }}
        >
          <div className="flex align-middle">
            <h6>{header}</h6>
          </div>
          <div
            style={{ display: 'flex', flexDirection: 'row', marginTop: '-4px' }}
          >
            <Tooltip title="Add Data">
              <IconButton
                aria-label="Upload Data"
                component="span"
              // onClick={iconClickHandler}
              >
                <img
                  src={`/assets/images/icons/add_Component.svg`}
                  width="15px"
                />
              </IconButton>
            </Tooltip>
            <Tooltip title="Filter">
              <IconButton
                aria-label="Upload Data"
                component="span"
              // onClick={iconClickHandler}
              >
                <img src={`/assets/images/icons/filter_alt.svg`} width="15px" />
              </IconButton>
            </Tooltip>
          </div>
        </div>

        <TableContainer className={`${classes.Paper}`} component={Paper}>
          <Table size="small" aria-label="simple table">
            <TableHead>
              <TableRow style={{ backgroundColor: 'white' }}>
                {tableHeaders.map((heading) => {
                  return heading.key === 'actionHeader' ? (
                    <TableCell component="th" key={heading.key}>
                      <MoreVertIcon fontSize="small" />
                    </TableCell>
                  ) : (
                    <TableCell component="th" key={heading.key}>
                      {heading.name}
                    </TableCell>
                  )
                })}
              </TableRow>
            </TableHead>

            <TableBody>
              {data.map((data, index) => (
                <StyledTableRow key={index}>
                  <TableCell className={classes.tableRow}></TableCell>
                  <TableCell className={classes.tableRow}></TableCell>
                  <TableCell className={classes.tableRow}></TableCell>
                  <TableCell className={classes.tableRow}></TableCell>
                  <TableCell
                    className={`${classes.tableRow} ${index % 2 == 1 && workFlowData.isDatatableChecked
                        ? classes.dataTableStyle
                        : null
                      }`}
                  >
                    {index % 2 == 1 && workFlowData.isDatatableChecked && (
                      <div style={{ display: 'flex' }}>
                        <CancelIcon
                          style={{ fontSize: '0.75rem', color: '#B00020' }}
                          className="mr-1"
                        />
                        <CheckCircleIcon
                          className="color-primary"
                          style={{ fontSize: '0.75rem' }}
                        />
                      </div>
                    )}
                  </TableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  )
}

export default V5FormBuilderListingScreen
