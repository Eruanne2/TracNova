import { connect } from "react-redux";
import VariablePage from "./variable_page";
import * as VariableActions from "../../actions/variables_actions";

const mapSTP = ({entities, session}, {match}) => {
  const {variableId} = match.params;

  return {
    entities,
    currentUser: session.user,
    variable: variableId ? entities.variables[variableId] : null
  };
}

const mapDTP = dispatch => ({
  createVariable: varData => dispatch(VariableActions.createVariable(varData)),
  updateVariable: varData => dispatch(VariableActions.updateVariable(varData))
});

const VariablePageContainer = connect(mapSTP, mapDTP)(VariablePage);

export default VariablePageContainer;