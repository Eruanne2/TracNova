import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function IconButton ({icon, title, onClick, className, children, ...props}){
  return (
    <div className={`button react-icon-button${className ? ` ${className}` : ''}`} onClick={onClick}>
      <a title={title}>
        <FontAwesomeIcon icon={icon}/>
      </a>
      {children}
    </div>
  )
}