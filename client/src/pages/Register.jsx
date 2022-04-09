import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaUser } from 'react-icons/fa';
import { toast } from 'react-toastify';

import { register } from '../features/auth/authSlice';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });

  const { name, email, password, passwordConfirm } = formData;

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

  return (
    <>
      <section className='heading'>
        <h1>
          <FaUser /> Register {user}
        </h1>
        <p>Please create an account</p>
      </section>
      <section className='form' onSubmit={onSubmit}>
        <form>
          <div className='form-group'>
            <input
              type='text'
              className='form-control'
              id='name'
              value={name}
              name='name'
              placeholder='Name'
              required
              onChange={onChange}
            />
          </div>
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
            <input
              type='password'
              className='form-control'
              id='passwordConfirm'
              value={passwordConfirm}
              name='passwordConfirm'
              placeholder='Confirm password'
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

export default Register;
