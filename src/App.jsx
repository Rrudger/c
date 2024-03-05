import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import Header from './components/Header.jsx';
import Main from './components/Main.jsx';
import Page404 from './components/Page404.jsx';
import CurrencyList from './components/CurrencyList.jsx';
import LangContext from './contexts';
import { actions as actions } from './slices/mainSlice.js';

const getCurrencyRates = async (currency) => {
  try {
     const responce = await axios.get(`${'https://open.er-api.com/v6/latest/'}${currency}`);
     return new Promise((resolve) => resolve([currency, responce.data.rates]))
   } catch (e) {
     console.log(e.message);
     throw(e);
   }
 };

 const setRates = async (list) => {
   try {
     return await Promise.all(list.map((currency) => getCurrencyRates(currency)));
   } catch (e) {
     console.log(e.message);
     throw(e);
   }
 };

const LangProvider = ({ children }) => {
  const langsList = ['en', 'ru']
  const [lang, setLang] = useState(langsList[0]);

  return (
    <LangContext.Provider value={{ lang, langsList, setLang }}>
      {children}
    </LangContext.Provider>
  );
};

const App = () => {
  const dispatch = useDispatch();

  const currenciesList = Object.keys(useSelector((state) => state.mainState.currList));
  setRates(currenciesList)
    .then((result) => dispatch(actions.setRates(result)))
    .catch((error) => toast.error(error.message))

  setInterval(() => {
    setRates(currenciesList)
      .then((result) => dispatch(actions.setRates(result)))
      .catch((error) => toast.error(error.message))
  }, 10000)


  return (
  <LangProvider>
  <div className="d-flex flex-column h-100">
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Page404 />} />
          <Route path="/" element={<Main />} />
          <Route path="/currency_list" element={<CurrencyList />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
    </LangProvider>
)};

export default App;
