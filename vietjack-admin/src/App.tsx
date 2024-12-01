import '@/assets/styles/app.scss';
import 'react-toastify/dist/ReactToastify.css';

import { QueryClientProvider } from '@tanstack/react-query';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import Notifications from './components/common/Notification';
import queryClient from './libs/react-query';
import i18n from './locales';
import RootRouterProvider from './routes';
import { store } from './stores';

const App = () => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <I18nextProvider i18n={i18n}>
          <RootRouterProvider />
          <ToastContainer />
          <Notifications />
        </I18nextProvider>
      </QueryClientProvider>
    </Provider>
  );
};

export default App;
