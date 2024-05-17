import { ToastContainer } from 'react-toastify';
import Form from './Form';
import Items from './Items';
import { useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { HomeLayout, Error, Landing, Login, Register } from './pages';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 1000 * 60 * 5 }
  }
})

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />
      },
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'register',
        element: <Register />
      }
    ]
  }
])
const App = () => {

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};
export default App;










// const App = () => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [item, setItem] = useState({ name: '', id: '' });

//   return (
//     <section className='section-center'>
//       <ToastContainer position='top-center' />
//       <Form isEditing={isEditing} item={item} setItem={setItem} setIsEditing={setIsEditing} />
//       <Items setIsEditing={setIsEditing} setItem={setItem} />
//     </section>
//   );
// };