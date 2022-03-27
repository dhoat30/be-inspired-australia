import React, { useState } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/pro-light-svg-icons'
import Paragraph from '../Titles/Paragraph/Paragraph'
import ToolTip from '../ToolTip/ToolTip'

function BackButton({ onClick, title, className, toolTip }) {
    const [showToolTip, setShowToolTip] = useState(false)
    return (
        <Section className={className}>
            <Container onClick={onClick} onMouseEnter={() => setShowToolTip(true)} onMouseLeave={() => setShowToolTip(false)}>
                <IconStyle icon={faArrowLeft} />
            </Container>
            {showToolTip && toolTip ? <ToolTip title={title} /> : null}
        </Section>
    )
}

export default BackButton
const Section = styled.div`
position: relative;
`

const Container = styled.div`
background:var(--beige); 
display: inline-block;
border-radius: 50%;
padding: 10px 15px 10px 15px;
cursor: pointer;
&:hover{ 
    background: var(--darkBeige);
}
`
const IconStyle = styled(FontAwesomeIcon)`
font-size: 30px; 
`