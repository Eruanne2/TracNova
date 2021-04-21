import React from "react";

const toYesNo = count => !!count ? 'Yes' : 'No';

export default function LogEditor({editMode, unit, date, count, range, handleChange, handleDelete}){
  const isBoolean = typeof unit === 'symbol';
  editMode = true;

  const handleIncDec = (e, delta) => {
    if (e.shiftKey){
      delta *= 10

      if (e.metaKey){
        delta *= 10
      }
    }
    handleChange(count + delta);
  }

  const handleBooleanChange = () => {
    console.log(count);
    handleChange(Number(!count));
  }

  const $ReactEditComponent = isBoolean ? (
    <div onClick={(e) => handleBooleanChange()}>
      {toYesNo(count)}
    </div> ) : (
    <>
      <div className="button range-button" 
        onClick={e => handleIncDec(e, -1)}
      >-</div>
      <label>
        <input className="input range react-log-input"
          type="range" value={count} step="1"
          min={range.min} max={range.max}
          onChange={e => handleChange(Number(e.target.value))}
        />
      </label>
      <div className="button range-button" 
        onClick={e => handleIncDec(e, 1)}
      >+</div>
      <input className="input range react-log-input"
        type="text" value={count}
        onChange={e => handleChange(Number(e.target.value) || 0)}
      />
    </>
  );

  return (
    <div className="react-log">
      <div className="log date">{date}</div>
      { editMode ? $ReactEditComponent :
          <div>{isBoolean ? toYesNo(count) : count}</div>
      }
      <div onClick={e => handleDelete()}>Delete</div>
    </div>
  )
}