import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook } from '@fortawesome/free-brands-svg-icons'
import styled from 'styled-components'

function FacebookButton({ className, onClick }) {
    return (
        <FacebookLoginButton onClick={onClick} className={className}>
            <IconStyle icon={faFacebook} />
            <Span> Log in With Facebook</Span>
        </FacebookLoginButton>
    )
}

export default FacebookButton

const FacebookLoginButton = styled.button`
    color: white; 
    padding: 10px 20px;
    width: 100%;
  border: none;
  border-radius: 30px;
  font-size: 1.2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px auto;
  background: #4c69ba;
  &:hover{
    background: ${props => props.bkColor === "var(--beige)" ? "var(--black)" : "black"}; 
    color: ${props => props.bkColor === "var(--beige)" ? "white" : "white"}; 
  }
`
const Span = styled.span`
margin-left: 10px; 
`
const IconStyle = styled(FontAwesomeIcon)`

`
