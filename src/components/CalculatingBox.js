import React from 'react';
import HistoryBox from '../components/HistoryBox';
import '../componentCSS/calculatingBox.css';

const CalculatingBox = ({ expressionToDisplay, historicalExpressions }) => {
    
    return (
        <div className='CalculatingBox'>
            <HistoryBox
                historicalExpressions={historicalExpressions} />
            <input 
                readOnly
                type='text'
                value={expressionToDisplay}
                />
        </div>
    )
}

export default CalculatingBox;