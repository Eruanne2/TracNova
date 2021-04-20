import {connect} from "react-redux";
import CorrelationButtons from "./correlation_buttons";

const mapSTP = ({entities}, {correlationId}) => ({
  correlation: entities.correlations[correlationId],
  variables: entities.correlations[correlationId].variableIds.map( id => entities.variables[id] )
});

const CorrelationButtonsContainer = connect(mapSTP)(CorrelationButtons);
export default CorrelationButtonsContainer;