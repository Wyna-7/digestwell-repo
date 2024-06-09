import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import MyLists from './components/pages/MyLists';

export const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/my-lists', element: <MyLists /> },
]);
