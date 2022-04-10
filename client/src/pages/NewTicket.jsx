import { useState } from 'react';
import { useSelector } from 'react-redux';

function NewTicket() {
  const [product, setProduct] = useState('');
  const [description, setDescription] = useState('');
  const { user } = useSelector((state) => state.auth);

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <section className='heading'>
        <h1>Create new ticket</h1>
        <p>Please enter information below</p>
      </section>
      <section className='form'>
        <div className='form-group'>
          <label htmlFor='name'>Customer Name</label>
          <input
            type='text'
            className='form-control'
            value={user.name}
            disabled
          />
        </div>
        <div className='form-group'>
          <label htmlFor='name'>Customer Email</label>
          <input
            type='text'
            className='form-control'
            value={user.email}
            disabled
          />
        </div>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <label htmlFor='product'>Product</label>
            <select
              name='product'
              id='product'
              value={product}
              onChange={(e) => setProduct(e.target.value)}
            >
              <option value='iphone'>iPhone</option>
              <option value='ipad'>iPad</option>
              <option value='macbook'>MacBook</option>
              <option value='imac'>iMac</option>
            </select>
          </div>
          <div className='form-group'>
            <label htmlFor='description'>Please describe the issue</label>
            <textarea
              name='description'
              id='description'
              value={description}
              className='form-control'
              placeholder=''
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className='form-group'>
            <button className='btn btn-block'>Submit</button>
          </div>
        </form>
      </section>
    </>
  );
}

export default NewTicket;
