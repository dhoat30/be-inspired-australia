import React, { useState, useContext } from 'react'
import ILogo from '../Logo/ILogo/ILogo';
import ColumnTitle from '../Titles/Titles/ColumnTitle';
import Paragraph from '../Titles/Paragraph/Paragraph';
import LoginForm from './LoginForm/LoginForm';
import styled from 'styled-components';

function RegisterModal(props) {
    return (
        <React.Fragment>
            <Container >
                <LoginModal>
                    <ILogo />
                    <ColumnTitle >Be Inspired</ColumnTitle>
                    <Paragraph >Find new ideas to try</Paragraph>
                    <LoginForm />
                </LoginModal>
            </Container>
        </React.Fragment>

    )
}
export default RegisterModal

const Container = styled.div`

`
const LoginModal = styled.div`
width: 100%;
  max-width: 400px;
  padding: 50px 0;
  height: auto;
  background: white;
  z-index: 10;
  margin: 0 auto;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: var(--cardBorderRadius);
box-shadow: var(--boxShadow);
`