import React from 'react';
import { Row } from 'react-bootstrap';
import i18n from '../i18n';

const Page404 = () => (
  <Row className="bg-light text-center">
    <h1 className="h4 text-muted mt-4">
      {i18n.t('page404.part1')}
    </h1>
    <p className="text-muted">
      {i18n.t('page404.part2')}
      <a href="/">{i18n.t('page404.part3')}</a>
    </p>
  </Row>
);

export default Page404;
