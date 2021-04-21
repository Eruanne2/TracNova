import { connect } from "react-redux";
import VariablesPage from "./variables_page";
import * as VariableActions from "../../actions/variables_actions";

const mapSTP = ({entities}) => ({
  variables: Object.values(entities.variables)
});

const mapDTP = dispatch => ({
  createVariable: varData => dispatch(VariableActions.createVariable(varData)),
  destroyVariable: varId => dispatch(VariableActions.destroyVariable(varId))
});

const VariablesPageContainer = connect(mapSTP, mapDTP)(VariablesPage);

export default VariablesPageContainer;