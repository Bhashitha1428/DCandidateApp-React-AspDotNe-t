import React from 'react';
import logo from './logo.svg';
import './App.css';
import {store} from './actions/store';
import {Provider} from 'react-redux'
import DCandidates from './component/DCandidate';

import {Container} from '@material-ui/core';
import {ToastProvider} from 'react-toast-notifications'

function App() {
  return (
  

  <Provider store={store}>
   
    <ToastProvider autoDismiss={true}>{/* notification display kirimata npm package eka use kirima */}
    < Container maxWidth='lg'> {/* //material ui Container component */} 
     <DCandidates/>
     </Container>
     </ToastProvider> 

    </Provider>
  );
}

export default App;
