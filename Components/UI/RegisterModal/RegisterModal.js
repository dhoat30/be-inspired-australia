import React, { useState, useContext } from 'react'
import Backdrop from '../Backdrop/BackdropSection'
import * as styles from './RegisterModal.module.css'
import LargeTitle from '../Titles/Titles/LargeTitle';
import ILogo from '../Logo/ILogo/ILogo';
import ColumnTitle from '../Titles/Titles/ColumnTitle';
import Paragraph from '../Titles/Paragraph/Paragraph';
import RegisterForm from './RegisterForm/RegisterForm';
import styled from 'styled-components';
import Logo from '../Logo/Logo';
function RegisterModal(props) {

    const visibleClass = props.visibleClasses ? `${styles.visible}` : `${styles.invisible}`
    return (
        <Container className={props.className}>
            {props.showLargeTitle ? <LargeTitleStyle>Register to get your ideas</LargeTitleStyle> : null}


            <Modal id="registeration-form" >
                <Logo showIcon={true} />
                <ColumnTitle>Be Inspired</ColumnTitle>
                <Paragraph>Find new ideas to try</Paragraph>
                <RegisterForm closeModal={props.closeModal} />
            </Modal>
        </Container>
    )
}

export default RegisterModal
const Container = styled.section`
   position: fixed;
   top: 50%;
   left:50%; 
   z-index: 12; 
   transform: translate(-50%, -50%);

`
const LargeTitleStyle = styled(LargeTitle)`
color: white;
`
const Modal = styled.div`
 width: 100%;
 min-width: 400px;
  max-width: 400px;
    padding: 30px 0;
  background: white;
  z-index: 2;
  margin: 0 0 0 auto;
  border-radius: var(--cardBorderRadius);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`