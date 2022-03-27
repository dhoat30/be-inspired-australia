import React from 'react'
import styled from 'styled-components'
function TextArea(props) {
    return (
        <Container
            placeholder={props.placeholder}
            value={props.value}
            onChange={props.onChange}
            isInvalid={props.isInvalid}
            onBlur={props.onBlur}
            onFocus={props.onFocus}
            className={props.className}
        >
        </Container>
    )
}

export default TextArea

const Container = styled.textarea`
    display: block;
    background: var(--offWhite); 
    width: calc(100% - 2px);
    height: 100px;
    border: 2px solid #ddd;
    outline: none;
    margin: 10px 0 0 0;
    padding: 10px 5px 0 5px;
    border-radius: var(--cardBorderRadius);
    border: ${props => props.isInvalid ? "2px solid red" : null}; 
`