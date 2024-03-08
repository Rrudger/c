import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  Container,
  Col,
  Row,
  Button,
  Form,
  FloatingLabel,
} from 'react-bootstrap';
import * as yup from 'yup';
import { uniqueId } from 'lodash';
import 'react-toastify/dist/ReactToastify.css';
import i18n from '../i18n';

const Main = () => {
  const currList = useSelector((state) => state.mainState.currList);
  const curNamesList = Object.keys(currList);
  const ratesList = useSelector((state) => state.mainState.rates);

  const amountValidateSchema = yup.number().min(0);
  const emptyStringShema = yup.string().length(0);

  const [amount, setAmount] = useState('');
  const [currency1, setCurrency1] = useState(curNamesList[0]);
  const [currency2, setCurrency2] = useState(curNamesList[0]);
  const [amountValid, setValidation] = useState(false);

  const setResultPlaceholder = () => {
    const rate = Object.keys(ratesList).length === 0 ? 1 : ratesList[currency1][currency2];
    const result = (amount * rate).toFixed(2);
    return `${result} ${currList[currency2]}`;
  };

  useEffect(() => {
    document.getElementById('inputAmount').focus();
  });

  const handleChangeCurrency = (e) => {
    if (e.target.id === 'leftDropList') {
      setCurrency1(e.target.value);
    } else {
      setCurrency2(e.target.value);
    }
  };

  const handleChangeAmount = (e) => {
    e.preventDefault();
    setValidation(false);
    const { value } = e.target;
    if (amountValidateSchema.isValidSync(value) || emptyStringShema.isValidSync(value)) {
      setAmount(value);
    } else {
      setValidation(true);
    }
  };

  const handleCurrencySwop = () => {
    const currencySwop = currency1;
    setCurrency1(currency2);
    setCurrency2(currencySwop);
    const { placeholder } = document.getElementById('resultInput');
    const result = placeholder.slice(0, placeholder.length - 1);
    setAmount(result);
  };

  return (
    <Container className="h-100 my-2 mb-3 overflow-hidden rounded shadow">
      <Row className="my-4 py-4">
        <Row>
          <Col>
            <FloatingLabel label={i18n.t('amount')} className="mb-3">
              <Form.Control className={amountValid ? 'is-invalid' : ''} id="inputAmount" value={amount} onChange={handleChangeAmount} size="lg" type="text" />
              <div className="invalid-feedback">
                {i18n.t('validationError')}
              </div>
            </FloatingLabel>
          </Col>
          <Col className="col-1" />
          <Col>
            <Form.Control id="resultInput" size="lg" plaintext readOnly type="text" placeholder={setResultPlaceholder()} />
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Select onChange={handleChangeCurrency} aria-label="Currency select" value={currency1} id="leftDropList">
              {curNamesList.map((currency) => (
                <option key={uniqueId()}>{currency}</option>
              ))}
            </Form.Select>
          </Col>
          <Col className="col-1 d-flex justify-content-center">
            <Button variant="outline-primary" onClick={handleCurrencySwop}>
              &#8646;
            </Button>
          </Col>
          <Col>
            <Form.Select onChange={handleChangeCurrency} aria-label="Currency select" value={currency2} id="rightDropList">
              {curNamesList.map((currency) => (
                <option key={uniqueId()}>{currency}</option>
              ))}
            </Form.Select>
          </Col>
        </Row>
      </Row>
    </Container>
  );
};

export default Main;
