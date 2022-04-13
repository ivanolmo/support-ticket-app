import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';

import { logout, reset } from '../features/auth/authSlice';

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());

    navigate('/');
  };

  return (
    <header className='header flex justify-between items-center py-5 mb-14 border-b border-solid border-gray-500'>
      <div className='text-2xl font-bold hover:scale-105 hover:transition-all duration-300'>
        <Link to='/' className='text-black hover:text-black/70'>
          Support Desk
        </Link>
      </div>
      <ul className='flex justify-between items-center'>
        {user ? (
          <li className='ml-5'>
            <button
              className='flex justify-center items-center bg-black text-white text-base font-bold text-center py-2.5 px-5 border border-solid border-black rounded-md hover:scale-95'
              onClick={onLogout}
            >
              <FaSignOutAlt className='mr-2' /> Logout
            </button>
          </li>
        ) : (
          <>
            <li className='ml-5'>
              <Link
                to='/login'
                className='flex items-center text-black text-xl hover:text-zinc-500'
              >
                <FaSignInAlt className='mr-2' /> Login
              </Link>
            </li>
            <li className='ml-5'>
              <Link
                to='/register'
                className='flex items-center text-black text-xl hover:text-zinc-500'
              >
                <FaUser className='mr-2' /> Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
}

export default Header;
