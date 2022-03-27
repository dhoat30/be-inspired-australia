import React from 'react'
import styled from 'styled-components'
function Errors(props) {
  return (
    <Container align={props.align}>{props.children}</Container>
  )
}

export default Errors

const Container = styled.p`
  color: red;
  font-size: 1rem;
  margin: 5px 0;
  text-align: ${props => props.align ? props.align : "left"};
`