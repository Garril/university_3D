import React, { useState } from 'react';

import LoginForm from './loginForm/index';

import './index.css';

const App: React.FC = () => {

  return (
    <div id="login">
      <div id='form_container'>
        <LoginForm></LoginForm>
      </div>
    </div>
  );
};

export default App;
