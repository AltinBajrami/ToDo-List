import { ToastContainer } from 'react-toastify';
import Form from './Form';
import Items from './Items';
import { useState } from 'react';

const App = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [item, setItem] = useState({ name: '', id: '' });

  return (
    <section className='section-center'>
      <ToastContainer position='top-center' />
      <Form isEditing={isEditing} item={item} setItem={setItem} setIsEditing={setIsEditing} />
      <Items setIsEditing={setIsEditing} setItem={setItem} />
    </section>
  );
};
export default App;
