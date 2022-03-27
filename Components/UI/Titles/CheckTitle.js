import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/pro-solid-svg-icons'
import styled from 'styled-components'
function Check({ title, showTradeBadge }) {
    return (
        <PinTitleContainer>
            <PinTitle dangerouslySetInnerHTML={{ __html: title }}></PinTitle>

            {
                showTradeBadge ?
                    <IconContainer>
                        <IconStyle icon={faCheckCircle} />
                        <BadgeText>
                            Trade
                        </BadgeText>
                    </IconContainer>
                    :
                    null

            }


        </PinTitleContainer>
    )
}

export default Check
const PinTitleContainer = styled.div`
    display: flex;
    align-items: center;
`

const PinTitle = styled.h3`
color: var(--darkGrey); 
text-decoration: none; 
font-weight: 500;
font-size: 1rem;
margin: 0;
`
const IconContainer = styled.div`
margin-left: 10px;
display: flex; 
align-items: center; 
background: var(--darkGrey);
padding: 3px 10px;
border-radius: 30px;
`
const IconStyle = styled(FontAwesomeIcon)`
color: var(--beige); 
`

const BadgeText = styled(PinTitle)`
color: var(--beige); 
font-size: 0.9rem;
margin-left: 5px;
`