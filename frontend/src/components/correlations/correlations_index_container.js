import { connect } from "react-redux";
import { createCorrelation, destroyCorrelation } from "../../actions/correlations_actions";
import CorrelationsIndex from "./correlations_index";

const mapSTP = ({entities}) => ({
  correlations: Object.values(entities.correlations),
  variables: Object.values(entities.variables)
});

const mapDTP = dispatch => ({
  createCorrelation: corrData => dispatch(createCorrelation(corrData)),
  destroyCorrelation: correlationId => destroyCorrelation(correlationId)
})

const CorrelationsIndexContainer = connect(mapSTP, mapDTP)(CorrelationsIndex);

export default CorrelationsIndexContainer;

