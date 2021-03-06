import { connect } from "react-redux";
import * as CorrelationActions from "../../actions/correlations_actions";
import CorrelationPage from "./correlation_page";

const mapSTP = ({entities, session}, {match}) => {
  const {correlationId} = match.params;
  const correlation = entities.correlations[correlationId];
  const allVariables = entities.variables;

  return ({
    currentUser: session.user,
    allVariables,
    variables: (correlation ? 
      correlation.variables.map(id => entities.variables[id]) : []
    ),
    correlation
  });
}

const mapDTP = dispatch => ({
  createCorrelation: corrData => dispatch(CorrelationActions.createCorrelation(corrData)),
  updateCorrelation: corrData => dispatch(CorrelationActions.updateCorrelation(corrData))
});

const CorrelationPageContainer = connect(mapSTP, mapDTP)(CorrelationPage);
export default CorrelationPageContainer;