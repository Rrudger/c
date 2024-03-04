import React, { useState, useContext } from 'react';
import {
  Container,
  Navbar,
  ButtonGroup,
  ToggleButton,
} from 'react-bootstrap';
import { uniqueId } from 'lodash';
import i18n from '../i18n';
import LangContext from '../contexts';

const Header = () => {
  const { lang, langsList, setLang } = useContext(LangContext);
  const radios = langsList;
  const [radioValue, setRadioValue] = useState(lang);

  const handleChangeLang = (e) => {
    const newLang = e.currentTarget.value;
    setRadioValue(newLang);
    i18n.changeLanguage(newLang);
    setLang(newLang);
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
