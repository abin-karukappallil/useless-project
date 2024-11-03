import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Browser from 'webextension-polyfill';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

interface StorageResult {
  isActive?: boolean;
}

const App = () => {
  const [isActive, setIsActive] = useState<boolean>(false);
  useEffect(() => {
    const fetchToggleState = async () => {
      const result = await Browser.storage.local.get('isActive') as StorageResult;
      setIsActive(Boolean(result.isActive));
    };

    fetchToggleState();
  }, [isActive]);

  const handleToggle = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newState = e.target.checked;
    setIsActive(newState);
    await Browser.storage.local.set({ isActive: newState });
    await Browser.runtime.sendMessage({ type: 'toggle', isActive: newState });
  };

  return (
    <div className="popup">
      <header className="headerSection">
        <h1>Fumbl-iFy</h1>
      </header>
      <div className="contentWrap">
        <h4>abinthomas.dev</h4>
      </div>
      <div className="togglerWrap">
        <label className="switch">
          <input
            type="checkbox"
            checked={isActive}
            onChange={handleToggle}
          />
          <span className="slider round"></span>
        </label>
      </div>
      <footer>
        <div className='footerr'>
          <h4><a href="https://abinthomas.dev">Visit our site</a></h4>
        </div>
      </footer>
    </div>
  );
};

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);