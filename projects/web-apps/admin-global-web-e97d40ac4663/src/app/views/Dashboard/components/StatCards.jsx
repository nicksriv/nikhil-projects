import React, { useState, useEffect } from 'react'
import { Grid, Paper, Divider, MenuItem, Tooltip, TextField } from '@material-ui/core'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import SecurityIcon from '@material-ui/icons/Security'
import InfoIcon from '@material-ui/icons/Info'
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment'
import { Line } from 'react-chartjs-2'
import { Chart, registerables } from 'chart.js'
import { capitalizeFirstLetter } from 'helper/utils'
import UserAvatar from './UserAvatar'

Chart.register(...registerables)
const toolTipStyle = { 
    usePointStyle: true,
    backgroundColor:'black',
    displayColors: false,
    // titleColor:'black',
    titleFont:{
        size:0
    },
    caretSize:0,
    caretPadding:5,
    yAlign:'top',
}
//const myRef = React.createRef();
const lineOptions = {
    responsive: true,
    scales: {
        x: {
          grid: {
            display: false,
            drawBorder: false, 
          }
        },
        y: {
          grid: {
            drawBorder: false,  
          }
        }
      },
    plugins: {
        legend: {
            display: true,
            position: "bottom",
        },
        tooltip: toolTipStyle
    }
}
const CustomTextField = withStyles({
    root: {
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderRadius: `25px`,
        },
      },
      '& .MuiSelect-outlined': {
          padding:'0.4rem 0.6rem 0.4rem 0.8rem'
      }
    },
  })(TextField);

const useStyles = makeStyles(({ palette, ...theme }) => ({
    text: {
        fontSize: '36px',
        lineHeight: '43px',
        letterSpacing: '1.8px',
        color: '#000000',
        fontFamily: 'SF Pro Display',
    },
    customCrCard: {
        background: '#F4EAE0 0% 0% no-repeat padding-box',
        borderRadius: '4px',
        opacity: 1,
    },
    securityIcon: {
        '& svg': {
            fontSize: '20px',
            color: '#757575',
            opacity: 1,
        },
    },
    chartWrapper: {
        padding: '11px 10px 8px 24px',
    },
    flexItemsApart: {
        justifyContent: 'space-between',
        display: 'flex',
        alignItems: 'center',
    },
    acessCount: {
        fontSize: '14px',
        lineHeight: '10px',
        letterSpacing: '0.6px',
        color: '#000000',
        fontWeight: 'bold',
        padding: '1.5rem 1rem 1rem 1rem'
    },
    adminAcessCount: {
        fontSize: '14px',
        lineHeight: '10px',
        letterSpacing: '0.6px',
        color: '#000000',
        fontWeight: 'bold',
        padding: '1.5rem 1rem 1rem 1rem',
        marginBottom:'2rem'
    },
    subHeading: {
        fontSize: '14px',
        lineHeight: '10px',
        letterSpacing: '0.6px',
        color: '#000000',
        fontWeight: 'bold',
    },
    selectBox: {
        maxHeight: '150px',
        overflow: 'scroll',
        borderRadius: '34px',
        border: '1px solid #cccccc',
        fontSize: '10px',
        padding: '3px 13px',
        color: '#333333',
        '&.MuiInput-underline:before, &.MuiInput-underline:after, &.MuiInput-underline:hover:before':
            {
                borderBottom: 'none',
            },
        '& .MuiSelect-select:focus': {
            backgroundColor: 'transparent',
        },
    },
    img: {
        padding: 1,
        marginBottom: 0,
        borderRadius: '50%',
        width: '3rem',
        height: '3rem',
    },
    chartMargin: {
        marginLeft: '-20px',
    },
    assetsText: {
        fontSize: '10px',
        color: '#00000061',
    },
    assetsCount: {
        fontWeight: 'bold',
        fontSize: '24px',
    },
    fullHeight: {
        height: '100%',
    },
    fullWidth: {
        width: '100%',
    },
    securityInfo: {
        justifyContent: 'space-between',
        display: 'flex',
        flexDirection: 'column',
    },
    teamHeading: {
        width: '100%',
        lineHeight: '19px',
        color: '#00000099',
        letterSpacing: '0.53px',
        fontFamily: 'SF Pro Display',
        marginLeft: '15px',
        display: 'flex',
        alignItems: 'center',
        marginTop: '15px',
        marginBottom: '13px',
        padding:"10px,0px",
        '& svg': {
            fontSize: '14px',
        },
        fontWeight: 'bold',
    },
    empName: {
        color: '#000000DE',
        letterSpacing: '0.5px',
        lineHeight: '24px',
    },
    empId: {
        fontSize: '10px',
        color: '#00000061',
    },
    employeeCard: {
        width: '100%',
        marginRight: '1%',
        display: 'inline-block',
        whiteSpace: 'break-spaces',
    },
    scrollX: {
        overflowX: 'scroll',
        whiteSpace: 'noWrap',
        '&::-webkit-scrollbar': {
            display: 'none',
        },
    },
    welcomeCard: {
        backgroundColor: '#F5F5F5',
        position: 'fixed',
        zIndex: 99,
        width: '100%',
        marginTop: '-10px',
    },
    firstRow: {
        paddingTop: '5%',
    },
    emptyDataWrapper: {
        color: '#00000061',
        background: '#FFFFFF',
        padding: '10px',
        '& img': {
            width: '125px',
        },
    },
    dFlex: {
        display: 'flex',
    },
    flexOne: {
        flex: '1',
    },
    customWidth:{
        width:"10rem",
        padding:" 2px 12px",
        textAlign:"center",
        fontSize:"10px",
        color: "#CBCBCB",
        
    },
    hovers:{
        '&:hover': {
            color: "#2C3E93",
        }, 
    },
    hoverState:{
    opacity:0,
    fontSize:"22px !important"
    },
    activeState:{
        opacity:1,
        fontSize:"22px !important"
    }
    
}))

const StatCards = () => {
    // const [hoverState, setHoverState]=useState("");
    const [activeClients, setActiveClients] = useState([]);
    const dispatch = useDispatch()
    const classes = useStyles()
    const {
        sitesCount,
        usersCount,
        clientsCount,
        lastLoginInfo,
        teams,
        chartsData,
        clientInfo: { id },
    } = useSelector((state) => state.dashboard)
    const { activeClientsList } = useSelector((state) => state.clients)
    const {
        userProfileDetails: { fullName, firstName, lastName },
    } = useSelector((state) => state.profile)

    const usersStatisticsData = {}
    for (let item of chartsData) {
        usersStatisticsData[item.xAxis] = item.yAxis
    }
    const lastSixMonths = []
    for (let i = 5; i >= 0; i--) {
        lastSixMonths.push(
            moment()
                .subtract(i, 'month')
                .format('MMMM')
                .slice(0, 3)
                .toLocaleUpperCase() +
                ' ' +
                moment()
                    .subtract(i, 'month')
                    .format('YY')
                    .slice(0, 3)
                    .toLocaleUpperCase()
        )
    }

    const data = {
        labels: lastSixMonths,
        datasets: [
            {
                label: 'Users',
                fill: false,
                lineTension: 0.4,
                backgroundColor: '#FFAD00',
                borderColor: '#FFAD00',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: '#FFAD00',
                pointBackgroundColor: '#FFAD00',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: '#FFAD00',
                pointHoverBorderColor: '#FFAD00',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: lastSixMonths.map((month) =>
                    usersStatisticsData[month] ? usersStatisticsData[month] : 0
                ),
            },
        ],
    }

    const typeOfUser = localStorage.getItem('typeOfUser')
    const lastLoginDate = lastLoginInfo?.time
        ? moment(lastLoginInfo.time).format('DD MMMM YYYY')
        : ''
    const lastLoginTime = lastLoginInfo?.time
        ? moment(lastLoginInfo.time).format('h:mm a')
        : ''

    useEffect(() => {
        if (activeClientsList && activeClientsList.length) {
            let listOfActiveClients = activeClientsList.filter((client) => {
                return client.status.toLowerCase() === 'active'
            })
            setActiveClients(listOfActiveClients)
        }
    }, [activeClientsList])

    // useEffect(() => {
    //     dispatch({type: "getUserProfileDetailsAction"})
    // },[]);

    const handleChange = (e) => {
        dispatch({
            type: 'getStatisticsAction',
            payload: e.target.value,
        })
    }

    const UserCard = (user) => (
        <div className={classes.employeeCard}>
            <Paper elevation={0} className="p-3">
                <UserAvatar user={user} />
                <div className={classes.empName}>
                    {capitalizeFirstLetter(user.name)}
                </div>
                <div className={classes.empId}>Emp ID: {user.employeId}</div>
            </Paper>
        </div>
    )

    const renderEmptyState = (image, copyText) => (
        <div align="center" className={classes.emptyDataWrapper}>
            <img src={image} alt="empty-data" />
            <div>{copyText}</div>
        </div>
    )

    const renderTeamData =
        teams?.length > 0
            ? teams?.map((user) => (
                <Grid item sm={2}>
                    {UserCard(user)}
                </Grid>
            ))
            : renderEmptyState(
                '/assets/images/illustration.svg',
                'No colleagues & teams has been added.'
            )

    const renderChartData =
        typeOfUser === 'Admin' && activeClients.length === 0 ? (
            renderEmptyState(
                '/assets/images/No Data Illustration-gray.svg',
                'No clients available.'
            )
        ) : chartsData.length > 0 ? (
            <Line data={data} options={lineOptions} />
        ) : (
            renderEmptyState(
                '/assets/images/No Data Illustration-gray.svg',
                'No users have been onboarded yet.'
            )
        )
    const AdminStyle = {marginTop:0}
    const clientStyle = {marginTop: '2.5rem'}
    return (
        <>
            <div className={`${classes.text} ${classes.welcomeCard}`}>
                Welcome back,{' '}
                <strong>
                    {capitalizeFirstLetter(fullName? fullName : `${firstName} ${lastName}`)}{' '}
                    {/* {typeOfUser === 'Admin' ? '- Admin' : 'Client Admin'} */}
                </strong>
            </div>
            <Grid container spacing={2} className={classes.firstRow}>
                <Grid item sm={5} className={classes.dFlex}>
                    <Paper elevation={0} className={classes.flexOne}>
                        <div className={classes.chartWrapper}>
                            <div className={`${classes.flexItemsApart} mb-3`}>
                                <div className={classes.subHeading}>
                                    Users’ statistics
                                </div>
                                {typeOfUser === 'Admin' && (
                                    <CustomTextField
                                        label=""
                                        select
                                        value={id}
                                        onChange={handleChange}
                                        variant="outlined"
                                        size="small"
                                        style={{width:"7rem"}}
                                    >
                                    {activeClients.map((client) => {
                                        return (
                                            <MenuItem
                                                value={client.id}
                                                key={client.id}
                                            >
                                                {client.clientName}
                                            </MenuItem>
                                        )
                                    })}
                                </CustomTextField>
                                )}
                                {/* <input className={classes.form} type="text" /> */}
                            </div>
                            {renderChartData}
                        </div>
                    </Paper>
                </Grid>
                <Grid item sm={3} className={classes.fullWidth}>
                    <Paper className={classes.fullHeight} elevation={0}>
                        <h4 className={`${classes.subHeading} pt-5 pl-5 pb-2` }>
                            Assets Count
                        </h4>
                        <div className={`${classes.flexItemsApart} px-6 py-5 mt-8`} style={typeOfUser === "Admin" ? AdminStyle : clientStyle}>
                            <div className={classes.assetsText}>Sites</div>
                            <div className={classes.assetsCount}>
                                {sitesCount || '-'}
                            </div>
                        </div>
                        {typeOfUser === 'Admin' && (
                            <>
                                <Divider />
                                <div
                                    className={`${classes.flexItemsApart} px-6 py-5 mt-8`}
                                >
                                    <div className={classes.assetsText}>
                                        Clients
                                    </div>
                                    <div className={classes.assetsCount}>
                                        {clientsCount || '-'}
                                    </div>
                                </div>
                            </>
                        )}
                        <Divider />
                        <div className={`${classes.flexItemsApart} px-6 py-5 mt-8`}>
                            <div className={classes.assetsText}>Users</div>
                            <div className={classes.assetsCount}>
                                {usersCount || '-'}
                            </div>
                        </div>
                    </Paper>
                </Grid>
                <Grid item sm={4} className={classes.fullWidth}>
                    <div
                        className={`${classes.customCrCard} ${classes.fullHeight}`}
                    >
                        <div className={`${classes.flexItemsApart} pt-4 px-6`}>
                            <h4 className={classes.subHeading}>Security</h4>
                            <div className={classes.securityIcon}>
                                <SecurityIcon />
                            </div>
                        </div>
                        <Divider />
                        <div className={`px-6 mt-3 ${classes.securityInfo}`}>
                            <div className="mb-18">
                                <div className="mb-1">
                                    Last login: <strong>{lastLoginDate}</strong>{' '}
                                    at {lastLoginTime}
                                </div>
                                <div>
                                    IP: <strong>{lastLoginInfo?.ip}</strong>
                                </div>
                            </div>
                            <div className="mb-3">
                                <div className="mb-1">Recent Browser</div>
                                <strong>{lastLoginInfo?.browser}</strong>
                            </div>
                        </div>
                    </div>
                </Grid>
            </Grid>
            <div className={classes.teamHeading}>
                {/* <DragIndicatorIcon 
                className={hoverState === "dragIndicator"? classes.activeState:classes.hoverState } />  */}
                <span 
                //  onMouseEnter={e => {setHoverState("dragIndicator")}}
                //  onMouseLeave={e => {setHoverState("")}}
                className="mr-2" >My Colleagues & Team</span>
                <Tooltip title={"Users with same role & location will be listed here."}
                    placement="top"  classes={{ tooltip: classes.customWidth }} >
                    <InfoIcon className={classes.hovers} />
                </Tooltip>
            </div>
            <div className={`${classes.scrollX} mb-4`}>
                <Grid container spacing={2}>
                    {renderTeamData}
                </Grid>
            </div>
        </>
    )
}

export default StatCards;
