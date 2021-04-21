import { connect } from "react-redux";
import { logout } from "../../actions/session_actions";
import AppMenu from "./app_menu";

const mapDTP = dispatch => ({
  logout: () => dispatch(logout())
})

export default connect(null, mapDTP)(AppMenu);