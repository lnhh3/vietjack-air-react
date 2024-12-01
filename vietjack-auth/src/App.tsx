import 'normalize.css';
import './styles/common.scss';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { rootAuthRouter } from './routes';

function App() {
  return <RouterProvider router={createBrowserRouter(rootAuthRouter)} />;
}

export default App;
