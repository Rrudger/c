import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import Main from './components/Main.jsx';
import Page404 from './components/Page404.jsx';
import CurrencyList from './components/CurrencyList.jsx';
import LangContext from './contexts';

const LangProvider = ({ children }) => {
  const langsList = ['en', 'ru']
  const [lang, setLang] = useState(langsList[0]);

  return (
    <LangContext.Provider value={{ lang, langsList, setLang }}>
      {children}
    </LangContext.Provider>
  );
};

const App = () => (
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
    </div>
    </LangProvider>
);

export default App;
