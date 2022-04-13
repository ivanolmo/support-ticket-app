import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import TicketItem from '../components/TicketItem';
import { getAllTickets, reset } from '../features/tickets/ticketSlice';
import LoadingSpinner from '../components/LoadingSpinner';
import { toast } from 'react-toastify';

function Tickets() {
  const { tickets, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.tickets
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    dispatch(getAllTickets());

    return () => {
      if (isSuccess) {
        dispatch(reset());
      }
    };
  }, [dispatch, isSuccess, isError, message]);

  return isLoading ? (
    <LoadingSpinner />
  ) : (
    <>
      <h1 className='text-3xl font-bold mb-3'>Tickets</h1>
      <div>
        <div className='grid grid-cols-4 gap-5 justify-between items-center text-xl text-center font-bold bg-gray-200 mb-5 py-3 px-4 rounded-md'>
          <div>Date</div>
          <div>Product</div>
          <div>Status</div>
          <div></div>
        </div>
        {tickets.map((ticket) => (
          <TicketItem key={ticket._id} ticket={ticket} />
        ))}
      </div>
    </>
  );
}

export default Tickets;
