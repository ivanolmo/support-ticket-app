import Modal from 'react-modal';
import { FaWindowClose } from 'react-icons/fa';

Modal.setAppElement('#root');

const customStyles = {
  content: {
    width: '600px',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    position: 'relative',
  },
};

function NoteModal({
  noteText,
  setNoteText,
  modalIsOpen,
  toggleModal,
  onNoteSubmit,
}) {
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={toggleModal}
      contentLabel='Add note'
      style={customStyles}
    >
      <h2>Add Note</h2>
      <button
        className='absolute top-4 right-4 text-red-700 hover:scale-125'
        onClick={toggleModal}
      >
        <FaWindowClose />
      </button>
      <form onSubmit={onNoteSubmit}>
        <div className='mb-3'>
          <textarea
            name='note-text'
            id='note-text'
            className='w-full p-3 mb-3 border border-solid border-gray-300'
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            placeholder='Please enter your note'
          ></textarea>
        </div>
        <div className='mb-3'>
          <button
            type='submit'
            className='flex justify-center items-center bg-black text-white text-base font-bold text-center py-2.5 px-5 border border-solid border-black rounded-md hover:scale-95'
          >
            Create Note
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default NoteModal;
