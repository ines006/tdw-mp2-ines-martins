import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css'; // CSS?
import Home from './pages/Home';
import About from './pages/About';
import Detail from './pages/Detail';
import Favorite from './pages/Favorite';
import Navbar from './components/Navbar'
import reportWebVitals from './reportWebVitals';
import store from './store'; 
import { Provider } from 'react-redux';  
import { CategoryContextProvider } from "./contexts/CategoryContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}> 
      <CategoryContextProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/favorite" element={<Favorite />} />
            <Route path="/about" element={<About />} />
            <Route path="/detail/:category/:id" element={<Detail />} />
          </Routes>
        </BrowserRouter>
      </CategoryContextProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
