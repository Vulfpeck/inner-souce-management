import React from 'react';
import ReactDOM from 'react-dom';
import App from './Components/App';
import '../assets/style/index.css';
import { createStore, combineReducers } from 'redux';
import modalReducer from './Store/reducers/modal';
import { Provider } from 'react-redux';

const rootReducer = combineReducers({
    modal: modalReducer,
});

const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(<Provider store = {store}><App /></Provider>, document.getElementById("App"));