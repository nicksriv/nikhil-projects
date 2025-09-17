import React from 'react'
import { Box, Modal, Table, TableBody, TableCell, TableHead, TableRow} from '@material-ui/core';

function PreviewPopUp({ tableHeadings, isPreviewOpen, handlePreviewClose }) {

    const previewTableWrapper = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        minWidth: '500px',        
        maxWidth: '620px',
        overflow: 'auto',
        bgcolor: 'background.paper',
        boxShadow: 24,
    };
    return (
        <Modal
            open={isPreviewOpen}
            onClose={() => handlePreviewClose()}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={previewTableWrapper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {tableHeadings.length? tableHeadings.map((heading) => {
                                return <TableCell
                                    key={heading.key}
                                    style={{ whiteSpace: 'nowrap' }}
                                    className={`font-semibold text-14 border-none cursor-pointer `}
                                >
                                    {heading.name}
                                </TableCell>

                            }): null}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            {tableHeadings? tableHeadings.map((heading) => {
                                return <TableCell
                                    key={heading.key}
                                    className={`font-semibold text-14 border-none cursor-pointer`}
                                >
                                    <div style={{ backgroundColor: "#E1E1E0", padding: "0 2rem", height: "1.2rem" }}></div>
                                </TableCell>

                            }): null}
                        </TableRow>
                        <TableRow>
                            {tableHeadings && tableHeadings.map((heading) => {
                                return <TableCell
                                    key={heading.key}
                                    className={`font-semibold text-14 border-none cursor-pointer`}
                                >
                                    <div style={{ backgroundColor: "#E1E1E0", padding: "0 2rem", height: "1.2rem" }}></div>
                                </TableCell>

                            })}
                        </TableRow>
                        <TableRow>
                            {tableHeadings? tableHeadings.map((heading) => {
                                return <TableCell
                                    key={heading.key}
                                    className={`font-semibold text-14 border-none cursor-pointer`}
                                >
                                    <div style={{ backgroundColor: "#E1E1E0", padding: "0 2rem", height: "1.2rem" }}></div>
                                </TableCell>

                            }): null}
                        </TableRow>

                    </TableBody>
                </Table>
            </Box>
        </Modal>
    )
}

export default PreviewPopUp