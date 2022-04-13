import { Link } from 'react-router-dom';
import { FaQuestionCircle, FaTicketAlt } from 'react-icons/fa';

function Home() {
  return (
    <>
      <section className='text-[2rem] font-bold mb-12 py-0 px-5 sm:text-4xl'>
        <h1 className='mb-3'>What do you need help with?</h1>
        <p className='text-2xl text-gray-500 sm:text-3xl'>
          Please choose an option
        </p>
      </section>

      <Link
        to='/new-ticket'
        className='flex justify-center items-center w-full bg-white text-black text-base font-bold text-center py-2.5 px-5 mb-5 border border-solid border-black rounded-md hover:scale-95'
      >
        <FaQuestionCircle className='mr-2' /> Create a new support request
      </Link>
      <Link
        to='/tickets'
        className='flex justify-center items-center w-full bg-black text-white text-base font-bold text-center py-2.5 px-5 mb-5 border border-solid border-black rounded-md hover:scale-95'
      >
        <FaTicketAlt className='mr-2' /> View my tickets
      </Link>
    </>
  );
}

export default Home;
