import { useSelector } from 'react-redux';

import React from 'react';

function NoteItem({ note }) {
  const { user } = useSelector((state) => state.auth);

  const isStaff = note.isStaff;

  return (
    <div className={`note ${isStaff ? 'note-staff' : ''}`}>
      <h4>
        Note from: {user.name}
        {isStaff ? <span className='staff-name'> (Staff Member )</span> : ''}
      </h4>
      <p>{note.text}</p>
      <div className='note-date'>
        {new Date(note.createdAt).toLocaleString('en-US')}
      </div>
    </div>
  );
}

export default NoteItem;
