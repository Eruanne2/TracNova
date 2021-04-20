import {connect} from "react-redux";
import {login} from "../../actions/session_actions";

import LoginForm from "./login_form";

const mapSTP = ({errors}) => ({
  errors: errors.session
});

const mapDTP = dispatch => ({
  login: user => dispatch(login(user))
})
export default connect(mapSTP, mapDTP)(LoginForm);