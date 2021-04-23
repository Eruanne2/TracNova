import React, {useState} from "react";
import IconButton from "../util/icon_button"
import {RATING_EMOJIS, toYesNo, mDYToYMD, dateToYMD} from "../../util/converters";
import { faCheckCircle, faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";

export default function LogEditor({
  unit, date, count, range, handleFinishEdit, handleChange, handleIncDec, handleBooleanChange, handleDateChange
}){
  const [_date, _setDate] = useState(mDYToYMD(date));

  const generateEditor = (unit) => {
    if (unit === Symbol.for('boolean'))
      return (
        <div onClick={(e) => handleBooleanChange()}>
          <div className="yes-no-indicator">

            {toYesNo(count)}  
          </div>
        </div>
      );
    
    if (unit === Symbol.for('rating'))
      return (
        <div className="input rating-radios">{
          RATING_EMOJIS.slice(1).map((emoji, i) => (
            <label key={i}>
              <input type="radio" value={i} name="rating"
                checked={count === i}
                onChange={ e => handleChange({date, value: Number(e.target.value)})}
              />
              {emoji}
            </label>
          ))
        }</div>
      );

    return (
      <div className="input incdec">
        <div className="input button-slide">
          <IconButton className="button range-button" 
            onClick={e => handleIncDec(e, -1)} title="decrease value" icon={faMinus}
          />
          <label>
            <input className="input range react-log-input"
              type="range" value={count} step="1"
              min={range.min} max={range.max}
              onChange={e => handleChange({date, value: Number(e.target.value)})}
            />
          </label>
          <IconButton className="button range-button" 
            onClick={e => handleIncDec(e, 1)} title="increase value" icon={faPlus}
          />
        </div>
        <input className="input range react-log-input"
          type="text" value={count}
          onChange={e => handleChange({date: date, value: Number(e.target.value) || 0})}
        />
      </div>
    );
  } 
  return (
    <>
      <input className="input date react-log-date-input" 
        type="date" value={_date} 
        onChange={e => _setDate(e.currentTarget.value)}
        max={dateToYMD(new Date())}
        onBlur={handleDateChange}
      />
        {generateEditor(unit)}
      <IconButton onClick={e => handleFinishEdit(e, 1)} title="confirm" icon={faCheckCircle} />
    </>
  );
};