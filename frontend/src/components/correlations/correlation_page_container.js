import { connect } from "react-redux";
import { logout } from "../../actions/session_actions";
import { withRouter } from "react-router-dom";
import CorrelationPage from "./correlation_page";

const mapSTP = ({entities}, {match}) => ({
  correlation: entities.correlations[match.params.correlationId],
  correlations: Object.values(entities.correlations)
});

const mapDTP = dispatch => ({
  logout: () => dispatch(logout())
});

const CorrelationPageContainer = connect(mapSTP, mapDTP)(CorrelationPage);
export default withRouter(CorrelationPageContainer);