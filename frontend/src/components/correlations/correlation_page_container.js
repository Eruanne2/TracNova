import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import CorrelationPage from "./correlation_page";

const mapSTP = ({entities}, {match}) => {
  const correlation = entities.correlations[match.params.correlationId];

  return ({
    correlation,
    variables: [],//correlation.variableIds.map(id => entities.variables[id]),
    correlations: Object.values(entities.correlations)
  });
}

const CorrelationPageContainer = connect(mapSTP)(CorrelationPage);
export default withRouter(CorrelationPageContainer);