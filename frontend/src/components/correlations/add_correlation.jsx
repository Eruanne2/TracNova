import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import ButtonModal from '../util/button_modal' 

function CorrelationFormModal({variables, editMode, handleCreate, handleBlur}){
  const [_name, _setName] = useState('');
  const [_varIds, _setVarIds] = useState([]);

  const addVarId = (e, i) => {
    e.preventDefault();
    _varIds[i] = e.currentTarget.value;
    _setVarIds([..._varIds]);
  };

  const handleSubmit = (e) => {
    handleCreate(e, {
      name: _name,
      varIds: _varIds
    });
  }

  return (
    <section className={`correlation-form modal${editMode ? ' hidden' : ''}`}>
      <section className="correlation-form lightbox">
        <div className="mask" onClick={handleBlur}>
          placeholder (click me to blur)
        </div>
        <form onSubmit={handleSubmit}>
          <input className="correlation input"
            type="text" value={_name} placeholder="Name of the correlation"
            onChange={e => _setName(e.currentTarget.value)}
          />

          { [0, 1].map(i => (
              <label key={i}>
                {`Variable #${i + 1}:`}
                <select className="correlation input select"
                  onChange={e => addVarId(e.currentTarget.value, i)}
                > 
                  <option value="">--Please select a variable--</option>
                  { variables
                      .filter(variable => 
                        !_varIds.filter((x, j) => j !== i)
                          .includes(variable._id)
                      )
                      .map(variable => (
                        <option key={variable._id} value={variable._id}>
                          {`variable.name (${variable.unit})`}
                        </option>
                      ))
                  }
                </select>
                <input className="button correlation-button" type="submit" value="submit"/>
              </label>
            ))
          }
          
        </form>
      </section>
    </section>
  );
}

const mapSTP = ({entities}) => ({
  variables: Object.values(entities.variables)
});

const createCorrelation = () => {};
const mapDTP = dispatch => ({
  createCorrelation: (...args) => dispatch(createCorrelation(...args))
});

const CorrelationFormModalContainer = connect(mapSTP, mapDTP)(CorrelationFormModal);

function AddCorrelation({history, createCorrelation}){
  const [_editMode, _setEditMode] = useState(false);

  const handleCreate = (e, data) => {
    e.preventDefault();
    // history.push(`/correlations`);
  };

  return (
    <ButtonModal 
      component={CorrelationFormModalContainer}
      icon={faPlus}
      handleCreate={handleCreate}
    />
  );
}

export default withRouter(AddCorrelation);