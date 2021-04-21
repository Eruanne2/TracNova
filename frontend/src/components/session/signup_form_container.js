import {connect} from "react-redux";
import {signup, clearSessionErrors} from "../../actions/session_actions";
import SignupForm from "./signup_form"

const mapSTP = ({session, errors}) => ({
  errors: errors.session
});

const mapDTP = (dispatch) => ({
  signup: user => dispatch(signup(user)),
  clearSessionErrors: () => dispatch(clearSessionErrors())
});

export default connect(mapSTP, mapDTP)(SignupForm);