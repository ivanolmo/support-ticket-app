import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { FaPlus } from 'react-icons/fa';

import NoteModal from '../components/NoteModal';
import NoteItem from '../components/NoteItem';
import {
  getOneTicket,
  closeTicket,
  reset,
} from '../features/tickets/ticketSlice';
import { createNote, getAllNotes } from '../features/notes/noteSlice';
import LoadingSpinner from '../components/LoadingSpinner';

function Ticket() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [noteText, setNoteText] = useState('');
  const { ticket, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.tickets
  );
  const { notes, isLoading: notesIsLoading } = useSelector(
    (state) => state.notes
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { ticketId } = useParams();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    dispatch(getOneTicket(ticketId));
    dispatch(getAllNotes(ticketId));

    return () => {
      if (isSuccess) {
        dispatch(reset());
      }
    };
  }, [dispatch, ticketId, isSuccess, isError, message]);

  const ticketClose = () => {
    dispatch(closeTicket(ticketId));

    toast.success('Ticket successfully closed');

    navigate('/tickets');
  };

  const toggleModal = () => setModalIsOpen(!modalIsOpen);

  const onNoteSubmit = (e) => {
    e.preventDefault();

    dispatch(createNote({ noteText, ticketId }));

    setNoteText('');

    toast.success('Note successfully added to ticket');

    toggleModal();
  };

  return isLoading || notesIsLoading ? (
    <LoadingSpinner />
  ) : (
    <div className='relative text-left'>
      <header>
        <h2 className='flex justify-between items-center font-bold mb-3'>
          Ticket ID: {ticket._id}
          <span
            className={`text-base text-center justify-self-center bg-green-500 text-white w-24 py-1 px-5 rounded-lg ${
              ticket.status === 'closed'
                ? 'bg-red-600'
                : ticket.status === 'open'
                ? 'bg-blue-500'
                : ''
            }`}
          >
            {ticket.status}
          </span>
        </h2>
        <h3 className='font-bold mb-3'>
          Date Submitted: {new Date(ticket.createdAt).toLocaleString('en-US')}
        </h3>
        <h3 className='font-bold mb-3'>Product: {ticket.product}</h3>
        <hr />
        <div className='bg-gray-100 text-lg my-5 mx-0 py-3 px-4 border border-solid border-gray-300 rounded-md'>
          <h3 className='font-bold mb-3'>Description</h3>
          <p>{ticket.description}</p>
        </div>
        <h2 className='font-bold mb-3'>Notes</h2>
      </header>

      {ticket.status !== 'closed' && (
        <button
          className='flex justify-center items-center bg-black text-white text-base font-bold text-center py-2.5 px-5 mb-5 border border-solid border-black rounded-md hover:scale-95'
          onClick={toggleModal}
        >
          <FaPlus className='mr-2' /> Add Note
        </button>
      )}

      <NoteModal
        noteText={noteText}
        setNoteText={setNoteText}
        modalIsOpen={modalIsOpen}
        toggleModal={toggleModal}
        onNoteSubmit={onNoteSubmit}
      />

      {notes.map((note) => (
        <NoteItem key={note._id} note={note} />
      ))}

      {ticket.status !== 'closed' && (
        <button
          className='flex justify-center items-center w-full bg-red-700 text-white text-base font-bold text-center py-2.5 px-5 rounded-md hover:scale-95'
          onClick={ticketClose}
        >
          Close Ticket
        </button>
      )}
    </div>
  );
}

export default Ticket;
