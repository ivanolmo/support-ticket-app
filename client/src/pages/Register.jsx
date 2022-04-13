import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FaUser } from 'react-icons/fa';
import { toast } from 'react-toastify';

import { register, reset } from '../features/auth/authSlice';
import LoadingSpinner from '../components/LoadingSpinner';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });

  const { name, email, password, passwordConfirm } = formData;

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

    if (password !== passwordConfirm) {
      toast.error('Password mismatch');
    } else {
      const userData = {
        name,
        email,
        password,
      };

      dispatch(register(userData));
    }
  };

  return isLoading ? (
    <LoadingSpinner />
  ) : (
    <>
      <section className='text-[2rem] font-bold mb-12 py-0 px-5 sm:text-4xl'>
        <h1 className='flex justify-center align-center'>
          <FaUser className='mt-2 mr-4 sm:mt-0' /> Register {user}
        </h1>
        <p className='text-2xl text-gray-500 sm:text-[2rem]'>
          Please create an account
        </p>
      </section>
      <section className='w-4/5 mx-auto' onSubmit={onSubmit}>
        <form>
          <div className='mb-3'>
            <input
              type='text'
              className='w-full p-3 mb-3 border border-solid border-gray-300 rounded-md'
              id='name'
              value={name}
              name='name'
              placeholder='Name'
              required
              onChange={onChange}
            />
          </div>
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
          <div className='mb-3'>
            <input
              type='password'
              className='w-full p-3 mb-3 border border-solid border-gray-300 rounded-md'
              id='passwordConfirm'
              value={passwordConfirm}
              name='passwordConfirm'
              placeholder='Confirm password'
              required
              onChange={onChange}
            />
          </div>
          <div className='mb-3'>
            <button className='flex justify-center items-center w-full bg-black text-white text-base font-bold text-center py-2.5 px-5 border border-solid border-black rounded-md hover:scale-95'>
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Register;
