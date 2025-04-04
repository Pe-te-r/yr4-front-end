import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {store} from './store.ts'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { ToastContainer  } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ChatbotWidget from './components/ChatWidget.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    <ChatbotWidget/>
    <ToastContainer />
    </Provider>
  </StrictMode>,
)
