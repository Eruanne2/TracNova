import {connect} from "react-redux";
import {signup} from "../../actions/session_actions";
import SignupForm from "./signup_form"

const mapSTP = ({session, errors}) => ({
  signedIn: session.isSignedIn,
  errors: errors.session
});

const mapDTP = (dispatch) => ({
  signup: user => dispatch(signup(user))
});

export default connect(mapSTP, mapDTP)(SignupForm);