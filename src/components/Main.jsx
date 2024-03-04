import React, { useContext, useState, useEffect } from 'react';
import {
  Container,
  Col,
  Row,
  Button,
  Image,
  Form,
  FloatingLabel,
} from 'react-bootstrap';
import axios from 'axios';
import i18n from '../i18n';
import * as yup from 'yup';
import { uniqueId } from 'lodash';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import LangContext from '../contexts';


const Main = () => {
  const currList = {
    "EUR": '\u20ac',
    "USD": '\u0024',
    "BHD": '\u00A4',
    "CHF": '\u20a3',
    "GBP": '\u00A3',
    "GIP": '\u00A3',
    "JPY": '\u00A5',
    "OMR": '\ufdfc',
    "RUB": '\u20bd',
    "TRY": '\u20ba',
  };

  const curNamesList = Object.keys(currList);
  let amountValidateSchema = yup.number().positive().integer();
  const { lang, setLang } = useContext(LangContext);

  const [ amount, setAmount] = useState(0);
  const [ currency1, setCurrency1 ] = useState(curNamesList[0]);
  const [ currency2, setCurrency2 ] = useState(curNamesList[0]);
  const [ rate, setRate ] = useState(1);
  const [ amountValid, setValidation ] = useState(false);

  useEffect(() => {
    document.getElementById('inputAmount').focus()
  });

  const getRatesList = async (currency) => {
    try {
       return await axios.get(`${'https://open.er-api.com/v6/latest/'}${currency}`);
     } catch (e) {
       console.log(e.message);
       throw(e);
     }
   };

   const placeholderGen = () => {
     const result = (amount * rate).toFixed(2);
     return `${result} ${currList[currency2]}`;
   };

   const handleChangeCurrency = (e) => {
     e.target.id === 'leftDropList' ? setCurrency1(e.target.value) : setCurrency2(e.target.value);
     getRatesList(e.target.value)
        .then((responce) => {
          setRate(responce.data.rates[currency2])
        })
        .catch((err) => {
          toast.error(err.message);
          setAmount(0);
          setCurrency1('EUR');
          setCurrency2('EUR');
          setRate(1);
          document.getElementById('inputAmount').value = '';
        })
   };

   const handleChangeAmount = (e) => {
     e.preventDefault();
     setValidation(false);
     const value = e.target.value;
      if (amountValidateSchema.isValidSync(value)) {
        setAmount(value);
      } else {
        setValidation(true);
      }
   };

   const handleCurrencySwop = (e) => {
     const currencySwop = currency1;
     setCurrency1(currency2);
     setCurrency2(currencySwop)
   }


   return (
    <Container className="h-100 my-2 mb-3 overflow-hidden rounded shadow">
    <Row className='my-4 py-4'>
      <Row >
        <Col>
          <FloatingLabel
            label={i18n.t('amount')}
            className="mb-3"
          >
          <Form.Control className={amountValid ? 'is-invalid' : ''} id='inputAmount' onChange={handleChangeAmount} size="lg" type="text" />
          <div className="invalid-feedback">
            {i18n.t('validationError')}
          </div>
          </FloatingLabel>
        </Col>
        <Col className='col-1'>
        </Col>
        <Col>
          <Form.Control id='resultInput' size="lg" plaintext readOnly type="text" placeholder={placeholderGen()} />
        </Col>
      </Row>

      <Row >
      <Col>
        <Form.Select onChange={handleChangeCurrency} aria-label="Currency select" value={currency1} id='leftDropList'>
          {curNamesList.map((currency) => (
            <option key={uniqueId()}>{currency}</option>
        ))}
      </Form.Select>
      </Col>
      <Col className='col-1 d-flex justify-content-center'>
        <Button variant='outline-primary' onClick={handleCurrencySwop}>
          &#8646;
        </Button>
      </Col>
      <Col>
      <Form.Select onChange={handleChangeCurrency} aria-label="Currency select" value={currency2} id='rightDropList'>
        {curNamesList.map((currency) => (
          <option key={uniqueId()}>{currency}</option>
      ))}
    </Form.Select>
    </Col>
      </Row>
      <ToastContainer />
      </Row>

    </Container>
  );
};

export default Main;
