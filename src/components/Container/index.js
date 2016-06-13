import React from 'react';
import { Row, Col } from 'antd';
import './_container';

const Container = function Container({ children, className, ...props }) {
  return (
    <Row className={className} {...props}>
      <Col span="24">{children}</Col>
    </Row>
  );
};

export default Container;
