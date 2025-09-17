import React from 'react'
import { Card, Grid, Icon, IconButton, Tooltip, Typography } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit';

const BackgroundCard = ({
    children,
    title,
    subtitle,
    linkText,
    linkUrl,
    icon,
    iconText,
    iconClick,
    headerContainerStyle,
    titleStyle,
    contentStyle,
    containerStyle,
    editIcon=false,
    containerClass = "p-0 m-4",
    handleEditIconClick = ()=>{}
}) => {
    return (
        <Card elevation={6} className={containerClass} style={containerStyle}>
            <div className="p-4" style={headerContainerStyle}>
                <div
                    style={{
                        fontWeight: 'bold',
                        borderBottom: '1px solid rgb(219, 216, 216)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <Typography
                        variant="subtitle1"
                        style={{
                            fontWeight: 'bold',
                            ...titleStyle
                        }}
                    >
                        {title}
                    </Typography>
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        {linkUrl ? (
                            <a
                                href={linkUrl}
                                download
                                target="_blank"
                                style={{
                                    color: 'blue',
                                    textDecoration: 'underLine',
                                    fontSize: 12,
                                    cursor: 'pointer',
                                    marginRight: 8,
                                }}
                            >
                                {linkText}
                            </a>
                        ) : null}

                        {icon ? (
                            <a
                                href="iconClick"
                                onClick={iconClick}
                                download
                                style={{
                                    color: 'blue',
                                    textDecoration: 'underLine',
                                    fontSize: 12,
                                    cursor: 'pointer',
                                    marginRight: 8,
                                }}
                            >
                                {iconText}
                            </a>
                        ) : // <Tooltip
                        //     title={
                        //         <span className="text-11">{iconText}</span>
                        //     }
                        // >
                        //     <Icon
                        //         className="material-icons-two-tone"
                        //         onClick={iconClick}
                        //         style={{ cursor: 'pointer' }}
                        //     >
                        //         <svg
                        //             style={{
                        //                 filter: 'invert(0.2)',
                        //                 '&:hover': {
                        //                     filter: 'invert(0)',
                        //                     '&>*': {
                        //                         opacity: 1,
                        //                     },
                        //                     '& > *': {
                        //                         opacity: 1,
                        //                     },
                        //                 },
                        //             }}
                        //             xmlns="http://www.w3.org/2000/svg"
                        //             viewBox="0 0 24 24"
                        //         >
                        //             <path d="M9,16V10H5L12,3L19,10H15V16H9M5,20V18H19V20H5Z" />
                        //         </svg>
                        //     </Icon>
                        // </Tooltip>
                        null}
                    </div>
                    {editIcon && (
                        <Grid style={{marginBottom:""}}>
                            <EditIcon
                                className="cursor-pointer text-light-gray"
                                fontSize="small"
                                onClick={handleEditIconClick}
                            />
                        </Grid>
                    )}
                </div>

                {subtitle && <div className="card-subtitle">{subtitle}</div>}
            </div>

            <div style={{ padding: '0.2rem 1rem 1rem 1rem', ...contentStyle }}>
                {children}
            </div>
        </Card>
    )
}

export default BackgroundCard
