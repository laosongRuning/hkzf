import React from 'react';
import ReactDOM from 'react-dom';
// 引入全局样式（全局样式优先级低于自己组件的样式优先级）
import './index.css';
// 字体图标库样式
import  './assets/fonts/iconfont.css'
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  // <React.StrictMode>
    <App />,
  // </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
