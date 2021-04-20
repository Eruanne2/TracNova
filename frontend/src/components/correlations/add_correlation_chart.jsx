import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

function CorrelationForm({handleCreate}){
  return (
    <section className="correlation-form modal">
      <section className="correlation-form lightbox">
        <form onSubmit={handleCreate}>
          <input className="correlation input"
            type="text" value={_name} placeholder="Name of the correlation"
            onChange={e => _setName(e.currentTarget.value)}
          />
          <input className="correlation input"
            type="text" value={_name} placeholder="Name of the correlation"
            onChange={e => _setName(e.currentTarget.value)}
          />
        </form>
      </section>
      placeholder (click me to blur)
    </section>
  );
}

const mapSTP = state => ({});

const CorrelationFormContainer = connect()(CorrelationForm);

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
  };

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