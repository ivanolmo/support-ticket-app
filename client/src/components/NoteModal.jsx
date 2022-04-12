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
      <button className='btn btn-close' onClick={toggleModal}>
        <FaWindowClose />
      </button>
      <form onSubmit={onNoteSubmit}>
        <div className='form-group'>
          <textarea
            name='note-text'
            id='note-text'
            className='form-control'
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            placeholder='Please enter your note'
          ></textarea>
        </div>
        <div className='form-group'>
          <button type='submit' className='btn'>
            Create Note
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default NoteModal;
