import React, {useState} from 'react';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import ButtonModal from '../util/button_modal';

function CorrelationFormModal({variables, editMode, handleCreate, handleBlur}){
  const [_name, _setName] = useState('');
  const [_varIds, _setVarIds] = useState([]);
  const nameStates = [useState(''), useState('')];
  const typeStates = [useState('metric'), useState('metric')];
  const unitStates = [useState(''), useState('')];

  const setVarId = (e, i) => {
    e.preventDefault();
    _varIds[i] = e.currentTarget.value;
    _setVarIds([..._varIds]);
  };

  const handleSubmit = (e) => {
    handleCreate(e, {
      name: _name,
      varIds: _varIds,
      newVars: [
        {name: nameStates[0][0], type: typeStates[0][0], unit: unitStates[0][0]},
        {name: nameStates[1][0], type: typeStates[1][0], unit: unitStates[1][0]}
      ]
    });
  }

  variables = [{_id: "1", name: 'a'}, {_id: "3", name: 'cc'}, {_id: "5", name: '111'}, {_id: "4", name: 'ae86'},];

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
              <div key={i}>
                <label>
                  <p>{`Variable ${i + 1}:`}</p>
                  <select className="correlation input select"
                    value={_varIds[i]}
                    onChange={e => setVarId(e, i)}
                  > 
                    <option value="">Create new variable</option>
                    { variables
                        .filter(variable => 
                          !_varIds.filter((id, j) => j !== i)
                            .includes(variable._id)
                        )
                        .map(({_id, name, unit}) => (
                          <option key={_id} value={_id}>
                            {`${name}${unit ? ` (${unit})` : ''}`}
                          </option>
                        ))
                    }
                  </select>
                </label>
              </div>
            ))
          }
          <input className="button correlation-button" type="submit" value="Create correlation!"/>
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

function AddCorrelation(){
  const handleCreate = (e, {name, varIds}) => {
    e.preventDefault();
    // console.log(name, varIds);
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