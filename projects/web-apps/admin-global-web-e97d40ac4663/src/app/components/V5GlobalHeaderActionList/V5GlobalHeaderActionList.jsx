import React from 'react'
import PropTypes from 'prop-types'
import { Grid } from '@material-ui/core'
import { Icon } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import V5GlobalIconButtons from '../V5GlobalIconButtons/V5GlobalIconButtons'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import history from 'helper/history.js'


function V5GlobalHeaderActionList(props) {
    const { title, iconsList, length,backIcon,onlyIcons=false,containerStyle } = props
    const useStyles = makeStyles((theme) => ({
        root: {
            height: '65px',
            '& .MuiBreadcrumbs-separator': {
                fontSize: "2.3rem"
            }
        },
        icon: {
            fontSize: "2rem",
            cursor:'pointer'
        }
    }))
    const classes = useStyles();
    const handleBack = (e) => {
        history.goBack()
    }
    return (
        <div className={`analytics mx-6 mb-2 ${classes.root}`} style={containerStyle}>

            {
                onlyIcons ? (
                <Grid
                container
                spacing={2}
                className="items-center"
                data-testid="header-Action-Div"
                style={{display:"flex",justifyContent:"flex-end"}}
            >
               
                <Grid className="mt-5">
                    {iconsList &&
                        iconsList.map((ic, index) => {
                            return (
                                <V5GlobalIconButtons
                                    key={index}
                                    iconType={ic.iconType}
                                    tooltipTitle={ic.tooltipTitle}
                                    areaLabel={ic.areaLabel}
                                    iconComponent={ic.iconComponent}
                                    iconClickHandler={ic.iconClickHandler}
                                    filterPopupOpen={ic.filterPopupOpen}
                                    reference={ic.ref}
                                    length={length}
                                />
                            )
                        })}
                </Grid>
            </Grid>
                ) : (
                    <Grid
                container
                spacing={2}
                className="justify-between flex items-center"
                data-testid="header-Action-Div"
            >
                <Grid className="flex align-middle">
                    <Grid item className="pt-2">
                        <Breadcrumbs>
                            {backIcon ? (
                                <ArrowBackIcon
                                    className={`material-icons-two-tone mt-2 ${classes.icon}`}
                                    onClick={handleBack}
                                />
                            ) : (
                                <Link to="/">
                                    <Icon
                                        className={`material-icons-two-tone mt-2 ${classes.icon}`}
                                    >
                                        home
                                    </Icon>
                                </Link>
                            )}

                            <h1
                                data-testid="title"
                                className="text-black mt-3"
                                title={title}
                            >
                                {title}
                            </h1>
                        </Breadcrumbs>
                    </Grid>
                </Grid>
                <Grid className="mt-5">
                    {iconsList &&
                        iconsList.map((ic, index) => {
                            return (
                                <V5GlobalIconButtons
                                    key={index}
                                    iconType={ic.iconType}
                                    tooltipTitle={ic.tooltipTitle}
                                    areaLabel={ic.areaLabel}
                                    iconComponent={ic.iconComponent}
                                    iconClickHandler={ic.iconClickHandler}
                                    filterPopupOpen={ic.filterPopupOpen}
                                    reference={ic.ref}
                                    length={length}
                                />
                            )
                        })}
                </Grid>
            </Grid>
                )
            }            
        </div>
    )
}

V5GlobalHeaderActionList.propTypes = {
    title: PropTypes.string.isRequired,
    iconsList: PropTypes.array.isRequired,
}

V5GlobalHeaderActionList.defaultProps = {}

export default V5GlobalHeaderActionList
