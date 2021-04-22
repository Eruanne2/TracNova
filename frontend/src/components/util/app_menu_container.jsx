import { connect } from "react-redux";
import { logout } from "../../actions/session_actions";
import AppMenu from "./app_menu";

const mapSTP = ({entities}) => ({
  variables: Object.values(entities.variables)
});

const mapDTP = dispatch => ({
  logout: () => dispatch(logout())
});

export default connect(mapSTP, mapDTP)(AppMenu);