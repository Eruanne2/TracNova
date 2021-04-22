import { connect } from "react-redux";
import VariablePage from "./variable_page";
import * as VariableActions from "../../actions/variables_actions";

const mapSTP = ({entities, session}, {match}) => {
  const {variableId} = match.params;

  return {
    currentUser: session.user,
    variable: entities.variables[variableId]
  };
}

const mapDTP = dispatch => ({
  createVariable: varData => dispatch(VariableActions.createVariable(varData)),
  addVariableEntry: varData => dispatch(VariableActions.addVariableEntry(varData))
});

const VariablePageContainer = connect(mapSTP, mapDTP)(VariablePage);

export default VariablePageContainer;