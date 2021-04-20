import {connect} from "react-redux";
import CorrelationChart from "./correlation_chart";

const mapSTP = ({entities}, {correlationId}) => ({
  correlation: entities.correlations[correlationId],
  variables: entities.correlations[correlationId].variableIds.map( id => entities.variables[id] )
});

const CorrelationChartContainer = connect(mapSTP)(CorrelationChart);
export default CorrelationChartContainer;