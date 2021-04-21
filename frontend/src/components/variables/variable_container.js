import {connect} from "react-redux";
import { withRouter } from "react-router";
import Variable from "./variable";

const mapSTP = ({entities}, {match}) => {
  const {variableId} = match.params;

  return {
    variable: variableId ? entities.variables[variableId] : null
  };
}

const mapDTP = ({})

const VariableContainer = connect()(Variable);

export default withRouter(VariableContainer);