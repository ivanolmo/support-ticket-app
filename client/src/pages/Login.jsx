import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FaSignInAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';

import { login, reset } from '../features/auth/authSlice';
import LoadingSpinner from '../components/LoadingSpinner';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate('/');
    }

    dispatch(reset());
  }, [dispatch, navigate, isError, isSuccess, user, message]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = { email, password };

    dispatch(login(userData));
  };

  return isLoading ? (
    <LoadingSpinner />
  ) : (
    <>
      <section className='font-bold mb-12 py-0 px-5'>
        <h1 className='flex justify-center align-center text-[2rem]'>
          <FaSignInAlt className='mt-2 mr-4' /> Login
        </h1>
        <p className='text-2xl text-gray-500 sm:text-[2rem]'>
          Please login to create a support request
        </p>
      </section>
      <section className='w-4/5 mx-auto' onSubmit={onSubmit}>
        <form>
          <div className='mb-3'>
            <input
              type='email'
              className='w-full p-3 mb-3 border border-solid border-gray-300 rounded-md'
              id='email'
              value={email}
              name='email'
              placeholder='Email'
              required
              onChange={onChange}
            />
          </div>
          <div className='mb-3'>
            <input
              type='password'
              className='w-full p-3 mb-3 border border-solid border-gray-300 rounded-md'
              id='password'
              value={password}
              name='password'
              placeholder='Password'
              required
              onChange={onChange}
            />
          </div>
          <div>
            <button className='flex justify-center items-center w-full bg-black text-white text-base font-bold text-center py-2.5 px-5 border border-solid border-black rounded-md hover:scale-95'>
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Login;
