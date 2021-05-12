import React, { useState } from "react";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import IconButton from "../util/icon_button"
import LogEditor from "./log_editor";
import {toYesNo, toRating, yMDToMDY, mDYToYMD} from "../../util/converters";

export default function Log({editMode, unit, date, count, range, handleEditMode, handleFinishEdit, handleChange, handleDelete}){
  const handleIncDec = (e, delta) => {
    if (e.shiftKey){
      delta *= 10;

      if (e.metaKey) delta *= 10;
    }
    handleChange({date, value: count + delta});
  }

  const handleBooleanChange = () => {
    handleChange({date, value: Number(!count)});
  }

  const handleDateChange = (e) => {
    debugger
    if (e.currentTarget.value)
      handleChange({date: yMDToMDY(e.currentTarget.value), value: count});
  };

  return (
    <div className="react-log">
      
      { editMode ? 
        <LogEditor {...{
          date, count, range, unit, 
          handleFinishEdit, handleChange, handleIncDec, handleDateChange,
          handleBooleanChange,
        }}/> :
          <div>
            <div className="log date">{date}</div>
            { unit === Symbol.for('boolean') ? toYesNo(count) : 
                ( unit === Symbol.for('rating') ? toRating(count) : count )
            }
            <IconButton onClick={e => handleEditMode()} title="edit" icon={faPen}/>
          </div>
      }
      <IconButton onClick={e => handleDelete()} title="delete" icon={faTrash}/>
    </div>
  )
}