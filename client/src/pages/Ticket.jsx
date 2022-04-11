import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import {
  getOneTicket,
  closeTicket,
  reset,
} from '../features/tickets/ticketSlice';
import LoadingSpinner from '../components/LoadingSpinner';

function Ticket() {
  const { ticket, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.tickets
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { ticketId } = useParams();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    dispatch(getOneTicket(ticketId));

    return () => {
      if (isSuccess) {
        dispatch(reset());
      }
    };
  }, [dispatch, ticketId, isSuccess, isError, message]);

  const onTicketClose = () => {
    dispatch(closeTicket(ticketId));

    toast.success('Ticket successfully closed');

    navigate('/tickets');
  };

  return isLoading ? (
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
      </header>
      {ticket.status !== 'closed' && (
        <button className='btn btn-block btn-danger' onClick={onTicketClose}>
          Close Ticket
        </button>
      )}
    </div>
  );
}

export default Ticket;
