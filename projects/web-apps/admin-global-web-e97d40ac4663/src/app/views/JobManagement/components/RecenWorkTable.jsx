import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import StarBorderIcon from '@material-ui/icons/StarBorder'

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
})

export default function RecenWorkTable(props) {
    const { rowData = [] } = props
    const classes = useStyles()

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {/* {Object.keys(rows[0]).map((item, index) => {
                            return (
                                <>
                                    <TableCell>{item}</TableCell>
                                </>
                            )
                        })} */}
                        <TableCell>Job Title</TableCell>
                        <TableCell>Job Status</TableCell>
                        <TableCell>Rating</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rowData.map((row, idx) => {
                        return (
                            <TableRow>
                                {Object.keys(row).map((col) => {
                                    return (
                                        <TableCell align="left" style={{}}>
                                            <span
                                                style={{
                                                    display: 'flex',
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                }}
                                            >
                                                {row[col]}
                                                {col === 'jobRating' ? (
                                                    <StarBorderIcon
                                                        style={{
                                                            color: 'FDCC0D',
                                                        }}
                                                    />
                                                ) : null}
                                            </span>
                                        </TableCell>
                                    )
                                })}
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
