import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import './index.css';
import App from './App';
import store from './Components/redux-store/Index';
import persistStore from 'redux-persist/es/persistStore';

let persistor = persistStore(store)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <Provider store={store}>
            <PersistGate loading = {null} persistor = {persistor}>
                <App />
            </PersistGate>
        </Provider>
    </BrowserRouter>
);
