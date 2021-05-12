import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function IconButton ({icon, title, onClick, className, children, ...props}){
  return (
    <div className={`button react-icon-button${className ? ` ${className}` : ''}`} onClick={onClick}>
      <div title={title}>
        <FontAwesomeIcon icon={icon}/>
      </div>
      {children}
    </div>
  )
}