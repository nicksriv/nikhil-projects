import React from 'react';
import V5Input from './input';

const V5Phone = (props) => {
    const {

    } = props;

    return (
        <>
            <div style={{ display: "flex" }}>
                <V5Input
                    type="number"
                    customStyle={{ marginRight: "3px", width: "62px" }}
                    placeholderText="+1"
                />
                <V5Input
                    type="number"
                    customStyle={{ marginRight: "3px", width: "62px" }}
                    placeholderText="000"
                />
                <V5Input
                    type="number"
                    customStyle={{}}
                    placeholderText="000-0000"
                />
            </div>
        </>
    );
}

export default V5Phone;