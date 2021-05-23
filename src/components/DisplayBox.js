import React from 'react';
import '../componentCSS/display.css';

const DisplayBox = ({ displayValue, result }) => {

    // console.log('result: ', result);
    const valueToDisplay = !result ? displayValue : result;

    return (
        <>
            <input 
                className="input"
                readOnly
                type='text'
                value={valueToDisplay}
                />
        </>
    )
}

export default DisplayBox;