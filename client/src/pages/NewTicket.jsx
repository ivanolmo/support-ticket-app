import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { createTicket, reset } from '../features/tickets/ticketSlice';
import LoadingSpinner from '../components/LoadingSpinner';

function NewTicket() {
  const [product, setProduct] = useState('iPhone');
  const [description, setDescription] = useState('');
  const { user } = useSelector((state) => state.auth);
  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.tickets
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      navigate('/tickets');
    }

    dispatch(reset());
  }, [dispatch, navigate, isError, isSuccess, message]);

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(createTicket({ product, description }));
  };

  return isLoading ? (
    <LoadingSpinner />
  ) : (
    <>
      <section className='text-[2rem] font-bold mb-12 py-0 px-5 sm:text-4xl'>
        <h1 className='mb-3'>Create new ticket</h1>
        <p className='text-2xl text-gray-500 sm:text-[2rem]'>
          Please enter information below
        </p>
      </section>
      <section className='w-4/5 mx-auto'>
        <div className='mb-3'>
          <label htmlFor='name' className='block font-bold text-left mb-2 ml-2'>
            Customer Name
          </label>
          <input
            type='text'
            className='w-full p-3 mb-3 border border-solid border-gray-300 rounded-md'
            value={user.name}
            disabled
          />
        </div>
        <div className='mb-3'>
          <label
            htmlFor='email'
            className='block font-bold text-left mb-2 ml-2'
          >
            Customer Email
          </label>
          <input
            type='text'
            className='w-full p-3 mb-3 border border-solid border-gray-300 rounded-md'
            value={user.email}
            disabled
          />
        </div>
        <form onSubmit={onSubmit}>
          <div className='mb-3'>
            <label
              htmlFor='product'
              className='block font-bold text-left mb-2 ml-2'
            >
              Product
            </label>
            <select
              name='product'
              id='product'
              className='w-full p-3 mb-3 border border-solid border-gray-300 rounded-md'
              value={product}
              onChange={(e) => setProduct(e.target.value)}
            >
              <option value='iphone'>iPhone</option>
              <option value='ipad'>iPad</option>
              <option value='macbook'>MacBook</option>
              <option value='imac'>iMac</option>
            </select>
          </div>
          <div className='mb-3'>
            <label
              htmlFor='description'
              className='block font-bold text-left mb-2 ml-2'
            >
              Please describe the issue
            </label>
            <textarea
              name='description'
              id='description'
              value={description}
              className='w-full p-3 mb-3 border border-solid border-gray-300 rounded-md'
              placeholder=''
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className='mb-3'>
            <button className='flex justify-center items-center w-full bg-black text-white text-base font-bold text-center py-2.5 px-5 mb-5 border border-solid border-black rounded-md hover:scale-95'>
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default NewTicket;
