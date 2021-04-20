import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Link, withRouter } from 'react-router-dom';

function CorrelationFormContainer(){
  return null;
}

function AddCorrelationChart({history}){
  const [_editMode, _setEditMode] = useState(false);
  
  const handleButtonClick = e => {
    e.preventDefault();
    _setEditMode(true);
  };

  const handleCreate = e => {
    e.preventDefault();
    history.push(`/correlations`);
  };
  
  const handleBlur = e => {
    e.preventDefault();
    _setEditMode(false);
  }

  return (
    <div className="button add-chart">
      <Link to="#" onClick={handleButtonClick}>
        <FontAwesomeIcon icon={faPlus}/>
      </Link>
      { _editMode ? 
          <CorrelationFormContainer {...{handleCreate, handleBlur}} /> : 
          null
      }
    </div>
  );
}

export default withRouter(AddCorrelationChart);