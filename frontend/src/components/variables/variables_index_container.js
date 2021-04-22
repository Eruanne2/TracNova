import { connect } from "react-redux";
import VariablesIndex from "./variables_index";
import * as VariableActions from "../../actions/variables_actions";

const mapSTP = ({entities}) => ({
  variables: Object.values(entities.variables)
});

const mapDTP = dispatch => ({
  createVariable: varData => dispatch(VariableActions.createVariable(varData)),
  destroyVariable: varId => dispatch(VariableActions.destroyVariable(varId))
});

const VariablesIndexContainer = connect(mapSTP, mapDTP)(VariablesIndex);

export default VariablesIndexContainer;