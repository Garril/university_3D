import React, { useMemo, useState } from 'react';

import './classList.css'

import AntTable from './antTable'


const App: React.FC = () => {

  return (
    <div id="classlist_container" >
        <AntTable></AntTable>
    </div>
  );
};



export default App;