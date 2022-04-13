import { useSelector } from 'react-redux';
import { FaWindowClose } from 'react-icons/fa';

function NoteItem({ note }) {
  const { user } = useSelector((state) => state.auth);

  const isStaff = note.isStaff;

  const deleteNote = () => {
    console.log('delete note');
  };

  return (
    <div
      className={`relative text-left p-5 mb-5 border border-solid border-gray-400 rounded-md ${
        isStaff ? 'bg-black/70 text-white' : ''
      }`}
    >
      <h4 className='font-bold'>
        Note from: {user.name.toUpperCase()}
        {isStaff ? (
          <span className='text-green-300'> (Staff Member )</span>
        ) : (
          ''
        )}
      </h4>
      <p>{note.text}</p>
      <div className='absolute top-5 right-3 text-sm'>
        <span className='font-bold'>Note added on: </span>
        {new Date(note.createdAt).toLocaleString('en-US')}
      </div>
      {/* TODO add delete note */}
      <button
        className='absolute bottom-2 right-4 font-bold text-red-500'
        onClick={deleteNote}
      >
        Delete
      </button>
    </div>
  );
}

export default NoteItem;
