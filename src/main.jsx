import React, { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import LoadingScreen from './components/LoadingScreen.jsx';

function RootWithLoader() {
  const [loadingDone, setLoadingDone] = useState(false);
  return (
    <StrictMode>
      {!loadingDone && <LoadingScreen onDone={() => setLoadingDone(true)} />}
      {loadingDone && <App />}
    </StrictMode>
  );
}

createRoot(document.getElementById('root')).render(<RootWithLoader />);
