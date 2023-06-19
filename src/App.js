import { useState } from 'react';
import './App.css';
import Home from './components/Home';

const appStyle = {
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
};

const contentStyle = {
  flexGrow: 1,
};

const headerStyle = {
  backgroundColor: '#f5f5f5',
  padding: '20px',
  textAlign: 'center',
};

const footerStyle = {
  backgroundColor: '#f5f5f5',
  padding: '20px',
  textAlign: 'center',
  marginTop: 'auto',
};

function App() {
  return (
    <div style={appStyle}>
      <header style={headerStyle}>
        <h1>Fun and Simple Games</h1>
      </header>
      <div style={contentStyle}>
        {/* Add your app's main content */}
        <main>
          <Home/>
          {/* Add other components or content here */}
        </main>
      </div>
      <footer style={footerStyle}>
        {/* Add footer content, such as links or copyright information */}
        <p>Authored by <a href="https://github.com/zainulmustafa">Zain Ul Mustafa</a></p>
      </footer>
    </div>
  );
}

export default App;
