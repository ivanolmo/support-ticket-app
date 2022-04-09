import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaSignInAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';

import { login } from '../features/auth/authSlice';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const dispatch = useDispatch();

  const { user, isLoading, isSuccess, message } = useSelector(
    (state) => state.auth
  );

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

  return (
    <>
      <section className='heading'>
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>Please login to create your support request</p>
      </section>
      <section className='form' onSubmit={onSubmit}>
        <form>
          <div className='form-group'>
            <input
              type='email'
              className='form-control'
              id='email'
              value={email}
              name='email'
              placeholder='Email'
              required
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              className='form-control'
              id='password'
              value={password}
              name='password'
              placeholder='Password'
              required
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <button className='btn btn-block'>Submit</button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Login;
