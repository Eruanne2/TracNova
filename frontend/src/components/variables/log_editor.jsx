import React, {useState} from "react";
import IconButton from "../util/icon_button"
import {toYesNo, mDYToYMD, dateToYMD} from "../../util/converters";
import { faCheck, faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";

export default function LogEditor({isBoolean, date, count, range, handleFinishEdit, handleChange, handleIncDec, handleBooleanChange, handleDateChange}){
  const [_date, _setDate] = useState(mDYToYMD(date));
console.log(dateToYMD(new Date()))
  return (
    <>
      <input className="input date react-log-date-input" 
        type="date" value={_date} 
        onChange={e => _setDate(e.currentTarget.value)}
        max={dateToYMD(new Date())}
        onBlur={handleDateChange}
      />

      { isBoolean ? (
        <div onClick={(e) => handleBooleanChange()}>
          {toYesNo(count)}
        </div> ) : (
        <>
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
          <input className="input range react-log-input"
            type="text" value={count}
            onChange={e => handleChange({date: date, value: Number(e.target.value) || 0})}
          />
        </>
      )}
      <IconButton onClick={e => handleFinishEdit(e, 1)} title="confirm" icon={faCheck} />
    </>
  );
};