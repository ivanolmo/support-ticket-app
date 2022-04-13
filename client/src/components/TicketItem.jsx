import { Link } from 'react-router-dom';

function TicketItem({ ticket }) {
  const { _id, product, status, createdAt } = ticket;

  return (
    <div className='grid grid-cols-4 gap-5 justify-between items-center text-center bg-gray-200 mb-5 py-3 px-4 rounded-md'>
      <div>{new Date(createdAt).toLocaleString('en-US')}</div>
      <div>{product}</div>
      <div
        className={`text-base text-center justify-self-center bg-green-500 text-white w-24 py-1 px-5 rounded-lg ${
          status === 'closed'
            ? 'bg-red-600'
            : status === 'open'
            ? 'bg-blue-500'
            : ''
        }`}
      >
        {status}
      </div>
      <Link
        to={`/tickets/${_id}`}
        className='flex justify-center items-center bg-white text-black text-xs font-bold text-center py-1 px-4 border border-solid border-black rounded-md hover:scale-95'
      >
        View
      </Link>
    </div>
  );
}

export default TicketItem;
