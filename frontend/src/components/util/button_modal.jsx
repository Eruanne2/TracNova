import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";

export default function ButtonModal({className, component: Component, icon, ...props}){
  const [_editMode, _setEditMode] = useState(false);

  const handleButtonClick = e => {
    e.preventDefault();
    _setEditMode(true);
  };
  
  const handleBlur = e => {
    e.preventDefault();
    _setEditMode(false);
  };

  return (
    <div className={['button', className || ''].join(' ')}>
      <Link to="#" onClick={handleButtonClick}>
        <FontAwesomeIcon icon={icon}/>
      </Link>
      { _editMode ? 
          <Component {...{editMode: _editMode, handleBlur, ...props}} /> : 
          null
      }
    </div>
  );
}