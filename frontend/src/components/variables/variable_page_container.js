import { connect } from "react-redux";
import { withRouter } from "react-router";
import VariablePage from "./variable_page";
import * as VariableActions from "../../actions/variables_actions";

const mapSTP = ({entities}, {match}) => {
  const {variableId} = match.params;

  return {
    variable: variableId ? entities.variables[variableId] : null
  };
}

const mapDTP = dispatch => ({
  updateVariable: varData => dispatch(VariableActions.updateVariable(varData))
});

const VariablePageContainer = connect(mapSTP, mapDTP)(VariablePage);

export default VariablePageContainer;