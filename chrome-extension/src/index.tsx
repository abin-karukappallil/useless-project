import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Browser from 'webextension-polyfill';
import { Settings, Github } from 'lucide-react';

const VERSION = "Version: 1.2.5";

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
        <div className="headerContent">
          <div className="logoTitle">
            <img src="/favicon.ico" alt="Logo" className="logo" />
            <h1>Fumbl-iFy</h1>
          </div>
          <Settings className="settingsIcon" />
        </div>
      </header>
      <div className="contentWrap">
        { isActive ? <h1 style={{color: "#6EE173"}}>iFy: Enabled</h1> : <h1 style={{color: "#b7b7b7"}}>iFy: Disabled</h1> }
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
        <h4 className="toggleInstructionText">{ isActive ? "To disable iFy click on the toggle." : "To enable iFy click on the toggle."}</h4>
      </div>
      <div className="howToUseSection">
        <h2 className="howToUseTitle">How to use?</h2>
        <div className="howToUseDivider"></div>
        <div className="howToUseContent">
          <p>{`• You can call iFy() on any textarea/input field.`}</p>
          <p>{`• iFy() enhances your typing experience!`}</p>
          <p>{`Example usuage: iFy("hello") or iFy("Tell a joke")`}</p>
        </div>
      </div>
      <div className="versionInfo">
        <span className="versionNumber">{VERSION}</span>
      </div>
      <footer>
        <div className='footerContent'>
          <h4><a href="https://fumbl-ify.vercel.app/" target="_blank" rel="noopener noreferrer">Visit our site</a></h4>
          <a href="https://github.com/aravind-manoj/useless-project" target="_blank" rel="noopener noreferrer">
            <Github className="githubIcon" />
          </a>
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