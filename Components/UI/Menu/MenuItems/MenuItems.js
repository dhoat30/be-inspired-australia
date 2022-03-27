import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
function MenuItems(props) {
    return (
        <Container>
            {props.linkType === 'local' ?
                <Link className="link" href={props.link} passHref><LinkStyle>{props.title}</LinkStyle></Link> :
                <LinkStyle href={props.link} target="_blank">{props.title}</LinkStyle>
            }
        </Container>
    )
}

export default MenuItems

const Container = styled.li`
list-style: none;
@media(max-width: 1000px){ 

}
`
const LinkStyle = styled.a`
color: var(--darkGrey);
text-decoration: none; 
@media(max-width: 1000px){ 
    padding: 10px;
    display: block;
}
&:hover{ 
    color: black;
}
`