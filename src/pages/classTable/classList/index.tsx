import React, { useMemo, useState } from 'react';

import './index.css'

import AntTable from './childCpns/antTable'


const App: React.FC = () => {

  return (
    <div id="classlist_container" >
        <AntTable></AntTable>
    </div>
  );
};



export default App;