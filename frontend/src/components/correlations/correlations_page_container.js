import { connect } from "react-redux";
import CorrelationsPage from "./correlations_page";

const mapSTP = ({entities}) => ({
  correlations: Object.values(entities.correlations)
});

const CorrelationsPageContainer = connect(mapSTP)(CorrelationsPage);

export default CorrelationsPageContainer;