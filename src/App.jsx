import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import i18n from './i18n';
import Header from './components/Header.jsx';
import Main from './components/Main.jsx';
import Page404 from './components/Page404.jsx';
import { actions } from './slices/mainSlice.js';

const getCurrencyRates = async (currency) => {
  try {
    const responce = await axios.get(`${'https://open.er-api.com/v6/latest/'}${currency}`);
    return [currency, responce.data.rates];
    //  return new Promise((resolve) => resolve([currency, responce.data.rates]))
  } catch (e) {
    console.log(e.message);
    throw (e);
  }
};

const setRates = async (list) => {
  try {
    return await Promise.all(list.map((currency) => getCurrencyRates(currency)));
  } catch (e) {
    console.log(e.message);
    throw (e);
  }
};

const App = () => {
  const dispatch = useDispatch();
  const lang = useSelector((state) => state.mainState.lang);
  i18n.changeLanguage(lang);

  const currenciesList = Object.keys(useSelector((state) => state.mainState.currList));
  setRates(currenciesList)
    .then((result) => dispatch(actions.setRates(result)))
    .catch((error) => toast.error(error.message));

  setInterval(() => {
    setRates(currenciesList)
      .then((result) => dispatch(actions.setRates(result)))
      .catch((error) => toast.error(error.message));
  }, 10000);

  return (
    <div className="d-flex flex-column h-100">
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Page404 />} />
          <Route path="/" element={<Main />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
};

export default App;
