import { connect } from 'react-redux';
import { updateVariable } from '../../actions/variables_actions';
import AddEntryForm from './add_entry_form';

const mapSTP = state => ({
  variables: Object.values(state.entities.variables)
});
const mapDTP = dispatch => ({
  updateVariable: entryData => dispatch(updateVariable(entryData))
});

export default connect(mapSTP, mapDTP)(AddEntryForm);