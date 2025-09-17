import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const useStyles = makeStyles((theme) => ({
    TableContainer: {
        overflowX: 'hidden',
        border: '1px solid lightgray',
        borderBottom: 'none',
        marginTop: '1rem',
    },
    TableRow: {
        color: '#9F9E9F',
        borderRight: '1px solid lightgray',
        paddingRight: '3rem',
        width: '9rem',
    },
    viewIcon: {
        color: '#9E9E9E',
        fontSize: '1.3rem !important',
        marginLeft: '2rem',
        marginBottom: '.2rem',
    },
}))

function BasicTable(props) {
    const {
        tableData,
        showPassword,
        handleClickShowPassword,
        handleMouseDownPassword
    } = props;
    const classes = useStyles()

    return (
        <div>
            <TableContainer className={classes.TableContainer}>
                <Table className={classes.table} aria-label="simple table">
                    <TableBody>
                        {tableData.map((tableProp, index) => {
                            return Object.entries(tableProp).map(
                                ([key, value]) => {
                                    return (
                                        <TableRow key={key} className="w-300">
                                            <TableCell
                                                component="th"
                                                scope="row"
                                                className={`${classes.TableRow} pl-3`}
                                            >
                                                {key}
                                            </TableCell>
                                            <TableCell className="font-medium pl-3">
                                                <div className="flex items-center">
                                                    <span className="w-108">
                                                        {key === 'Password' ?
                                                            (showPassword ? value : '* * * * * * * * *')
                                                            : value}
                                                    </span>
                                                    {
                                                        key === 'Password' ? (
                                                            showPassword ?
                                                                <VisibilityOff
                                                                    className={classes.viewIcon}
                                                                    onClick={handleClickShowPassword}
                                                                    onMouseDown={handleMouseDownPassword}
                                                                />
                                                                :
                                                                <Visibility
                                                                    className={classes.viewIcon}
                                                                    onClick={handleClickShowPassword}
                                                                    onMouseDown={handleMouseDownPassword}
                                                                />

                                                        ) : null}
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    )
                                }
                            )
                            //
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default BasicTable
