import React from "react";
import {Link, withRouter} from "react-router-dom";

function CorrelationPage({logout, history}){
  const handleClick = e => {
    e.preventDefault();
    logout();
    history.push('/');
  }
  return (
    <section className="page correlation">
      <Link to="#" onClick={handleClick}>Logout</Link>
    </section>
  )
}

export default withRouter(CorrelationPage);