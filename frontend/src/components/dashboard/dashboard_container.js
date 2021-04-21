import { connect } from 'react-redux';
import Dashboard from './dashboard';

const mapSTP = state => ({
  variables: state.entities.variables,
  correlations: state.entities.correlations
});

const mapDTP = dispatch => ({

});

export default connect(mapSTP, mapDTP)(Dashboard);