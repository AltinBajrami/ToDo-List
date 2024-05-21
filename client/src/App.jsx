
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { HomeLayout, Error, Landing, Login, Register } from './pages';
import { action as loginAction } from './pages/Login'
import { action as registerAction } from './pages/Register'
import { loader as landingLoader } from './pages/Landing'

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
        element: <Landing />,
        loader: landingLoader(queryClient)
      },
      {
        path: 'login',
        element: <Login />,
        action: loginAction
      },
      {
        path: 'register',
        element: <Register />,
        action: registerAction
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