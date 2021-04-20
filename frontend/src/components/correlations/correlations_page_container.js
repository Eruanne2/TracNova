import { connect } from "react-redux";
import { logout } from "../../actions/session_actions";
import CorrelationPage from "./correlation_page";

const mapDTP = dispatch => ({
  logout: () => dispatch(logout())
});

const CorrelationPageContainer = connect(null, mapDTP)(CorrelationPage);
export default CorrelationPageContainer;