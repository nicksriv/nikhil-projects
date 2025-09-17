import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
//import { useSelector } from 'react-redux';


const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            marginTop: theme.spacing(2),
        },

        '& .MuiPaginationItem-root': {
            color: '#2C3E93',
            fontWeight: '500',
            margin: '0',
            border: '1px solid lightgray',
            borderRadius: '2px',
        },
        '& .Mui-selected': {
            backgroundColor: '#2C3E93',
            color: '#000 !important',
        },
        '& .Mui-selected:hover': {
            backgroundColor: '#2C3E93'
        },
        '& .MuiPaginationItem-ellipsis': {
            height: '32px'
        }
    },
}))

function Paginate({ page, paginate, pageSize, listSize }) {
    const pages = Math.ceil(listSize / pageSize);
    const [pagesToShow, setPagesToShow] = useState(pages);
    const classes = useStyles();
    const showPageNumbers = () => {
        setPagesToShow(pages);
    }

    useEffect(() => {
        showPageNumbers();
        if (pages > 5) {
            setPagesToShow(5);
        }
    }, [pages]);

    return (
        <div className={classes.root}>
            <Pagination
                count={pagesToShow}
                defaultPage={page + 1}
                page={page + 1}
                showFirstButton
                showLastButton
                shape="rounded"
                onClick={showPageNumbers}
                onChange={(event, value) => paginate(value - 1)}
                pageSize={pageSize}
                siblingCount={1}
                boundaryCount={1}
            />
        </div>
    )
}

export default Paginate
