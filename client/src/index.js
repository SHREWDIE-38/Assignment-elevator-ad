import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);
// useEffect가 두번 실행되는것을 막기위해 React.StrictMode 컴포넌트를 제거했습니다.

reportWebVitals();
