import React from 'react'
import styled from 'styled-components'
function Button(props) {
  return (
    <ButtonStyle className={props.className} bkColor={props.bkColor} onClick={props.onClick}>
      {props.children}
    </ButtonStyle>
  )
}

export default Button

const ButtonStyle = styled.button`
    background: ${props => props.bkColor || "var(--black)"}; 
    color: ${props => props.bkColor === "var(--beige)" ? "rgba(0,0,0,1)" : "white"}; 
    padding: 10px 20px;
  border: none;
  border-radius: 30px;
  font-size: 1.2rem;
  cursor: pointer;
  &:hover{
    background: ${props => props.bkColor === "var(--beige)" ? "var(--black)" : "black"}; 
    color: ${props => props.bkColor === "var(--beige)" ? "white" : "white"}; 
  }
  
`