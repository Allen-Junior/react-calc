import '../componentCSS/history.css';

const HistoryBox = ({ historicalExpressions }) => {
        return (
          <div className='history hidden'>
            <button className='reset-history' /*onClick={clearHistory}*/>RESET</button>
            {
              historicalExpressions.map((expression, i) => {
                return (
                    <p key={i}>{expression}</p>
                );
              })
            }
          </div>
        );
      }
            
export default HistoryBox;