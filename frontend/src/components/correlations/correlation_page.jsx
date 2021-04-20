import React from "react";
import {Link, withRouter} from "react-router-dom";
import CorrelationChart from "./correlation_chart"
import CorrelationButtons from "./correlation_buttons"

function CorrelationPage({logout, history}){
  const handleClick = e => {
    e.preventDefault();
    logout();
    history.push('/');
  }
  return (
    <section className="page correlation">
      <CorrelationButtons />
      <CorrelationChart />
      <Link to="#" onClick={handleClick}>Logout</Link>
    </section>
  )
}

export default withRouter(CorrelationPage);