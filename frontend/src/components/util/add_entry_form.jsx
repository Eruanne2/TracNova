import React from 'react';

export default function AddEntryForm({defaultVar}) {
  return(
    <div className='entry-form-div'>
      {defaultVar ? <h1>Update {defaultVar.name}</h1> : <h1>Log a Habit</h1>}
    </div>
  )
};