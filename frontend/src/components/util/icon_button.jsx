import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function IconButton ({icon, title, onClick, className, ...props}){
  return (
    <div className={`button react-icon-button${className ? ` ${className}` : ''}`} onClick={onClick}>
      <a title="delete">
        <FontAwesomeIcon icon={icon}/>
      </a>
    </div>
  )
}