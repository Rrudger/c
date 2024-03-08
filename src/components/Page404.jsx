import React from 'react';
import { Row } from 'react-bootstrap';
import i18n from '../i18n';

const Page404 = () => {
  const pageText = i18n.t('page404').split('/');
  return (
    <Row className="bg-light text-center">
      <h1 className="h4 text-muted mt-4">
        {pageText[0]}
      </h1>
      <p className="text-muted">
        {pageText[1]}
        <a href="/">{pageText[2]}</a>
      </p>
    </Row>
  );
};

export default Page404;
