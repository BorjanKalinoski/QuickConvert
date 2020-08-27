import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
// import 'antd/dist/antd.less';
import './style.less';
import configureStore from './store/index';

const store = configureStore();

const ROOT = document.getElementById('root');

ReactDOM.render(<App className={"bg-primary"} store={store}/>, ROOT);