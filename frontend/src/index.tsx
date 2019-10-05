import * as React from 'react';
import * as ReactDOM from 'react-dom';
// import { Provider } from 'react-redux'
import App from './components/App';
import 'antd/dist/antd.less';
import './style.less';


const ROOT = document.getElementById('root');

ReactDOM.render(<App/>,ROOT);