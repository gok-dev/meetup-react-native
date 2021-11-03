import React from 'react';
import {LogBox} from 'react-native';
import Cript from './src/pages/Cripto';
import Request from './src/pages/Request';

LogBox.ignoreAllLogs();

function App() {
  let ROUTE = '';

  ROUTE = 'cript';

  switch (ROUTE) {
    case 'cript':
      return <Cript />;

    default:
      return <Request />;
  }
}

export default App;
