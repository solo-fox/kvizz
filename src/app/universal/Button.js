'use client'

import React from 'react';
import styled from 'styled-components';

const Button3D = ({ children, b1, b2, ...rest }) => {
  return (
    <Button style={{ background: b1 }} {...rest}>
      <Front style={{ background: b2 }}>
        {children}
      </Front>
    </Button>
  );
}

const Front = styled.span`
  border-radius: 12px;
  color: white;
  font-weight: bold;
  padding: 5px 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transform: translateY(-3px);
`;

const Button = styled.button`
  border-radius: 12px;
  border: none;
  padding: 0;
  cursor: pointer;
  outline-offset: 4px;
  &:focus:not(:focus-visible) {
    outline: none;
  }
  &:active {
    transform: translateY(-3px);
  }
`;

export default Button3D;
