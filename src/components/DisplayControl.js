import DisplayBox from "./DisplayBox";
import CalculatingBox from "./CalculatingBox";
import '../componentCSS/display.css';

const DisplayControl = ({
  displayValue,
  operatorValue,
  expression,
  result,
  historicalExpressions
}) => {
  return (
    <div className="DisplayControl">
      <CalculatingBox
        expressionToDisplay={expression}
        operatorValue={operatorValue}
        historicalExpressions={historicalExpressions}
      />
      <DisplayBox displayValue={displayValue} result={result}/>
    </div>
  );
};

export default DisplayControl;
