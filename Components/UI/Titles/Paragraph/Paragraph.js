import React from 'react'
import styled from 'styled-components'
function Paragraph(props) {
    return (
        <React.Fragment>
            {props.setDangerHtml ?
                <Container
                    dangerouslySetInnerHTML={{ __html: props.children }}
                    fontWeight={props.fontWeight} className={props.className} onClick={props.onClick} align={props.align}></Container>
                :
                <Container
                    fontWeight={props.fontWeight} className={props.className} onClick={props.onClick} align={props.align}>{props.children}</Container>
            }
        </React.Fragment>

    )
}

export default Paragraph

const Container = styled.p`
position: relative;
    margin: 0;
    font-weight: ${props => props.fontWeight ? props.fontWeight : "400"};
    font-size: 1rem;
    text-align: ${props => props.align ? props.align : "left"};
`
