import React from 'react';
import'../componentCSS/controlPanel.css';

const ControlPanel = ({onClick}) => {
    
    const feedback = (e) => {
        const target = e.target;
        e.target.style.backgroundColor = 'white';
        setTimeout(function(){
            target.style.backgroundColor = 'black';
        }, 100);
    }

    
    return (
        <div className="ControlPanel" onClick={onClick}>
            
            <button onClick={feedback} value='clear'>Clear</button>
            <button onClick={feedback} value='backspace'>Backspace</button>
            <button onClick={feedback} value='reset'>Reset</button>
            <button onClick={feedback} value='*' className='operator'> X </button>

            <button onClick={feedback} value={7}>7</button>
            <button onClick={feedback} value={8}>8</button>
            <button onClick={feedback} value={9}>9</button>
            <button onClick={feedback} value='/' className='operator'> / </button>

            <button onClick={feedback} value={4}>4</button>
            <button onClick={feedback} value={5}>5</button>
            <button onClick={feedback} value={6}>6</button>
            <button onClick={feedback} value='-' className='operator'> - </button>

            <button onClick={feedback} value={1}>1</button>
            <button onClick={feedback} value={2}>2</button>
            <button onClick={feedback} value={3}>3</button>
            <button onClick={feedback} value='+' className='operator'> + </button>

            <button onClick={feedback} value='.'> . </button>
            <button onClick={feedback} value={0}>0</button>
            <button onClick={feedback} className ='operator equal' value='='> = </button>
            <button onClick={feedback} value='History'> History </button>
  
        </div>
    )
}

export default ControlPanel;