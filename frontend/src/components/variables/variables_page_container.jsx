import { connect } from "react-redux";
import VariablesPage from "./variables_page";

const mapSTP = ({entities}) => ({
  variables: Object.values(entities.variables)
});

export default connect(mapSTP)(VariablesPage);
