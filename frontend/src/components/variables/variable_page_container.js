import { connect } from "react-redux";
import VariablePage from "./variable_page";
import * as VariableActions from "../../actions/variables_actions";

const mapSTP = ({entities}, {variableId}) => ({
  variable: entities.variables[variableId]
});

const mapDTP = dispatch => ({
  updateVariable: varData => dispatch(VariableActions.updateVariable(varData))
});

const VariablePageContainer = connect(mapSTP, mapDTP)(VariablePage);

export default VariablesPageContainer;