import React from "react";
import {Link, withRouter} from "react-router-dom";
import CorrelationChart from "./correlation_chart"
import CorrelationButtons from "./correlation_buttons"
import AddCorrelationChartContainer from "./add_correlation_chart_container";
import CorrelationChartContainer from "./correlation_chart_container";

function DropdownMenu({logout, history}){
  const handleLogout = e => {
    e.preventDefault();
    logout();
    history.push('/');
  }

  return (
    <section className="modal dropdown-menu">
      <section className="lightbox dropdown-menu">
        <ul>
          <li className="menu-item">
            <Link to="#" onClick={handleLogout}>Logout</Link>
          </li>
        </ul>
      </section>
    </section>
  )
}

function CorrelationPage({logout, history, correlation, correlations}){
  return (
    <section className="page correlation">
      <CorrelationButtons />
      <CorrelationChart />
      <Link to="#" onClick={handleClick}>Logout</Link>
//       <DropdownMenu {...{logout, history}}/>
//       <section className="charts">
//         { correlations
//             .filter(corr => corr !== correlation)
//             .map(corr => (
//               <CorrelationChartContainer
//                 key={corr.id} correlationId={corr.id} editable={false}
//               />
//             ))
//         }
//         <AddCorrelationChartContainer />
      </section>
    </section>
  )
}

export default CorrelationPage;