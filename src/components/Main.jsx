import React, { useContext, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
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
  const { lang, setLang } = useContext(LangContext);

  const currList = useSelector((state) => state.mainState.currList);
  const curNamesList = Object.keys(currList);
  const ratesList = useSelector((state) => state.mainState.rates);

  const amountValidateSchema = yup.number().min(0);
  const emptyStringShema = yup.string().length(0);

  const [ amount, setAmount ] = useState('');
  const [ currency1, setCurrency1 ] = useState(curNamesList[0]);
  const [ currency2, setCurrency2 ] = useState(curNamesList[0]);
  const [ amountValid, setValidation ] = useState(false);
  let resultSum = 0;

  const setResultPlaceholder = () => {
    const rate = Object.keys(ratesList).length === 0 ? 1 : ratesList[currency1][currency2];
    const result = (amount * rate).toFixed(2);
    resultSum = result;
    return `${result} ${currList[currency2]}`;
  };

  useEffect(() => {
    document.getElementById('inputAmount').focus();
  });

  const handleChangeCurrency = (e) => {
    e.target.id === 'leftDropList' ? setCurrency1(e.target.value) : setCurrency2(e.target.value);
  };

  const handleChangeAmount = (e) => {
     e.preventDefault();
     setValidation(false);
     const value = e.target.value;
      if (amountValidateSchema.isValidSync(value) || emptyStringShema.isValidSync(value)) {
        setAmount(value);

      } else {
        setValidation(true);
      }
   };

   const handleCurrencySwop = (e) => {
     const currencySwop = currency1;
     setCurrency1(currency2);
     setCurrency2(currencySwop);
     setAmount(resultSum);
     resultSum = 0;
   };

   return (
    <Container className="h-100 my-2 mb-3 overflow-hidden rounded shadow">
    <Row className='my-4 py-4'>
      <Row >
        <Col>
          <FloatingLabel
            label={i18n.t('amount')}
            className="mb-3"
          >
          <Form.Control className={amountValid ? 'is-invalid' : ''} id='inputAmount' value={amount} onChange={handleChangeAmount} size="lg" type="text" />
          <div className="invalid-feedback">
            {i18n.t('validationError')}
          </div>
          </FloatingLabel>
        </Col>
        <Col className='col-1'>
        </Col>
        <Col>
          <Form.Control id='resultInput' size="lg" plaintext readOnly type="text" placeholder={setResultPlaceholder()} />
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
