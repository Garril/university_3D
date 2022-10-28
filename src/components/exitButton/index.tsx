import React, { useState } from 'react';
import './index.css'

const App: React.FC = () => {

  return (
    <div id="exit">
      <span onClick={() => window.location.href="/login" }>退出</span>
    </div>
  );
};

export default App;
