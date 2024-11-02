import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <div className="popup">
      <header className="headerSection">
        <h1>Grammerless</h1>
      </header>
      <div className="contentWrap">
        <h4>abinthomas.dev</h4>
      </div>
      <div className="togglerWrap">
        <label className="switch">
          <input 
            type="checkbox" 
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
  </React.StrictMode>
);
