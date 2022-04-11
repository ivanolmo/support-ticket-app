import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import TicketItem from '../components/TicketItem';
import { getAllTickets, reset } from '../features/tickets/ticketSlice';
import LoadingSpinner from '../components/LoadingSpinner';

function Tickets() {
  const { tickets, isLoading, isSuccess } = useSelector(
    (state) => state.tickets
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllTickets());

    return () => {
      if (isSuccess) {
        dispatch(reset());
      }
    };
  }, [dispatch, isSuccess]);

  return isLoading ? (
    <LoadingSpinner />
  ) : (
    <>
      <h1>Tickets</h1>
      <div className='tickets'>
        <div className='ticket-headings'>
          <div>Date</div>
          <div>Product</div>
          <div>Status</div>
          <div></div>
        </div>
        {tickets.map((ticket, idx) => (
          <TicketItem key={ticket._id} ticket={ticket} />
        ))}
      </div>
    </>
  );
}

export default Tickets;
