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
    <div className='ticket-page'>
      <header className='ticket-header'>
        <h2>
          Ticket ID: {ticket._id}
          <span className={`status status-${ticket.status}`}>
            {ticket.status}
          </span>
        </h2>
        <h3>
          Date Submitted: {new Date(ticket.createdAt).toLocaleString('en-US')}
        </h3>
        <h3>Product: {ticket.product}</h3>
        <hr />
        <div className='ticket-desc'>
          <h3>Description</h3>
          <p>{ticket.description}</p>
        </div>
        <h2>Notes</h2>
      </header>

      {ticket.status !== 'closed' && (
        <button className='btn' onClick={toggleModal}>
          <FaPlus /> Add Note
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
        <button className='btn btn-block btn-danger' onClick={ticketClose}>
          Close Ticket
        </button>
      )}
    </div>
  );
}

export default Ticket;
