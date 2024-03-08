import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Navbar,
  ButtonGroup,
  ToggleButton,
} from 'react-bootstrap';
import { uniqueId } from 'lodash';
import i18n from '../i18n';
import { actions } from '../slices/mainSlice.js';

const Header = () => {
  const dispatch = useDispatch();

  const lang = useSelector((state) => state.mainState.lang);
  const langList = useSelector((state) => state.mainState.langList);

  const radios = langList;
  const [radioValue, setRadioValue] = useState(lang);

  const handleChangeLang = (e) => {
    const newLang = e.currentTarget.value;
    setRadioValue(newLang);
    dispatch(actions.setLang(newLang));
  };

  return (
    <Navbar className="navbar-expand-lg navbar-light shadow-sm bg-white mb-4">
      <Container>
        <Navbar.Brand href="/">
          {i18n.t('title')}
        </Navbar.Brand>

        <ButtonGroup>
          {radios.map((radio, idx) => (
            <ToggleButton
              key={uniqueId()}
              id={`${idx}-radio`}
              type="radio"
              variant="outline-primary"
              name="radio"
              value={radio}
              checked={radioValue === radio}
              onChange={handleChangeLang}
            >
              {radio}
            </ToggleButton>
          ))}
        </ButtonGroup>

      </Container>
    </Navbar>
  );
};

export default Header;
