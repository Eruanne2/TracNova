// fetchVariable(id),
// fetchUserVariables(userId),
// createVariable(varData),
// updateVariable(varData),
// destroyVariable(id)

import { connect } from "react-redux";
import AddCorrelationChart from "./add_correlation_chart";

const mapDTP = dispatch => ({
  
});

const AddCorrelationChartContainer = connect(null, mapDTP)(AddCorrelationChart);

export default AddCorrelationChartContainer;