import React from 'react'
import Image from 'next/image'
import styled from 'styled-components'

function GoogleButton({ onClick, className }) {
  return (
    <GoogleLoginButton onClick={onClick} className={className}>
      <Image src="https://inspiry.co.nz/wp-content/uploads/2021/11/Google__G__Logo.svg_.png" layout="fixed" width="20px" height="20px" alt="google social login" />
      <Span> Log in with Google</Span>
    </GoogleLoginButton>
  )
}

export default GoogleButton
const GoogleLoginButton = styled.button`
    
    color: var(--darkGrey); 
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
  &:hover{
    background: ${props => props.bkColor === "var(--beige)" ? "var(--black)" : "black"}; 
    color: ${props => props.bkColor === "var(--beige)" ? "white" : "white"}; 
  }
`
const Span = styled.span`
margin-left: 10px; 
`