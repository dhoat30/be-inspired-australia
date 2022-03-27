import React from 'react'
import styled from 'styled-components'
function UnderlineLink({ children, className, href }) {
    return (
        <Container className={className} href={href}>
            {children}
        </Container>
    )
}

export default UnderlineLink
const Container = styled.a`
font-weight: 700;
letter-spacing: 0.02rem;
position: relative;
color: var(--darkGrey);
padding: 0 0 10px 0;
cursor: pointer;
text-decoration: none;
&:after{
    border-bottom: 3px solid var(--darkGrey);
    position: absolute;
    width: 100%;
    left: 0;
    bottom: 0;
    content: '';
}
`