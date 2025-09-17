import React from 'react';

const V5InputTable = (props) => {
    const {
    } = props;

    return (
        <div>
            <div style={{
                height: "30px",
                width: "100%",
                borderRadius: "6px",
                backgroundColor: "#0000001F",
                fontSize: "0.5rem",
                fontWeight: "bold"
            }}>
                <div style={{ padding: "8px", display: "flex", justifyContent: "space-between" }}>
                    Header Item 1
                    <div style={{ textAlign: "right" }}>Actions</div>
                </div>

            </div>
            <div style={{
                fontSize: "0.75rem",
                color: "#2a4fbc",
                marginLeft: "8px",
                marginTop: "2px",
                fontWeight: "bold"
            }}>ADD ROW</div>
        </div>
    );
}

export default V5InputTable;