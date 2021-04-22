import React, {useState} from "react";
// import clouds from "../../assets/images/clouds.png"
// import stars from "../../images/stars.png"
// import twinkling from "../../images/twinkling.png"
// import clouds from "../../images/clouds.png"
// import twinkling from "../../assets/images/twinkling.png"

import '../../styles/buttons.css'
// import '../../styles/stars.css'

export default function CorrelationButtons(){
 
  return (

    <div className="button-page">
  
      <div className="button-block">
        
        <div className="var-button-section">
          <div className="var-button-todo">
            <div className="var-name">NINJITSU</div>
            <div className="varmoji">🤼</div>
          </div>
          <br/>
          <div className="var-button-done">
            <div className="var-name">MEAL PREP</div>
            <div className="varmoji">🍩🥗</div>
          </div>
          <br/>
     

        </div>
       </div>
      </div>
    )

}