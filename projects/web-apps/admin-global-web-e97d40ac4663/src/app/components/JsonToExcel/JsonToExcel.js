import React from 'react'
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

export const JsonToExcel = ({ errosDetails, componentToPassDown }) => {
    const fileType =
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";

    const exportToCSV = () => {
        let formattedErrorDetails = [];
        errosDetails.forEach((rowData, rIndex) => {
            if (rowData.rowErrors) {
                rowData.rowErrors.forEach((columnData, cIndex) => {
                    formattedErrorDetails.push({ rowId: rowData.rowId, message: rowData.message, ...columnData });
                })
            } else {
                formattedErrorDetails.push({ rowId: rowData.rowId, message: rowData.message });
            }


        });        
        const ws = XLSX.utils.json_to_sheet(formattedErrorDetails);
        const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
        const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
        const data = new Blob([excelBuffer], { type: fileType });
        FileSaver.saveAs(data, 'log_report' + fileExtension);
    return null;
    };

    
    

    return (
        <div onClick={(e) => exportToCSV()}>{componentToPassDown}</div>
    );
};