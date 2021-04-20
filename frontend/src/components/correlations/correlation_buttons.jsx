import React from "react";
// import clouds from "../../assets/images/clouds.png"
import stars from "../../images/stars.png"
import twinkling from "../../images/twinkling.png"
import clouds from "../../images/clouds.png"
// import twinkling from "../../assets/images/twinkling.png"

import '../../styles/buttons.css'
import '../../styles/stars.css'

export default function CorrelationButtons(){
  function probablyNothing(){

  }
  return (

    <div className="button-page">
  
      <div className="button-block">
        
        <div className="button-time">
          <div className="button-1">TRAIN NINJITSU</div>
          <div className="button-2">MEAL PREP</div>
          <div className="button-3">💪</div>
          <div className="button-4">MEDITATE</div>
          <div className="button-5">RUN</div>
          <div className="button-6">😴</div>

        </div>

        <div className="buttons-2">
          <div className="button-21">TRAIN NINJITSU</div>
          <div className="button-22">MEAL PREP</div>
          <div className="button-23">💪</div>
          <div className="button-24">MEDITATE</div>
          <div className="button-25">RUN</div>
          <div className="button-26">😴</div>

        </div>

        <div className="buttons-3">
          <div className="button-31">TRAIN NINJITSU</div>
          <div className="button-32">MEAL PREP</div>
          <div className="button-33">💪</div>
          <div className="button-34">MEDITATE</div>
          <div className="button-35">RUN</div>
          <div className="button-36">😴</div>

        </div>
        </div>
       
       <div style={{ backgroundImage: `(${process.env.PUBLIC_URL + 'images/stars.png'})` }} className="stars"></div>
       <div style={{ backgroundImage: `(${process.env.PUBLIC_URL + 'images/twinkling.png'})` }} className="twinkling"></div>
       <div style={{ backgroundImage: `(${process.env.PUBLIC_URL + 'images/clouds.png'})` }} className="clouds"></div>
       {/* <div style="%PUBLIC_URL%/images/stars.png"  className="stars"></div>  */}
       {/* <img src={process.env.PUBLIC_URL + 'images/stars.png'} /> */}
       {/* <img src={process.env.PUBLIC_URL + stars } /> */}
       {/* <div style={{ backgroundImage: twinkling }} className="twinkling"></div> */}
       {/* <div style={{ backgroundImage: clouds }} className="clouds"></div> */}
       </div>
    )

}