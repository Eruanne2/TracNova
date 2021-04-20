// fetchVariable(id),
// fetchUserVariables(userId),
// createVariable(varData),
// updateVariable(varData),
// destroyVariable(id)

import { connect } from "react-redux";
import AddCorrelation from "./add_correlation";

const mapDTP = dispatch => ({
  //createCorrelation: (data) => dispatch(createCorrelation(data))
});

const AddCorrelationContainer = connect(null, mapDTP)(AddCorrelation);

export default AddCorrelationContainer;