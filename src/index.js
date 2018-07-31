import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import MissionClockApp from './MissionClockApp';
  // ========================================
  
  ReactDOM.render(
    <MissionClockApp />,
    document.getElementById('root')
  );

  if(module.hot){
    module.hot.accept();
  }
  