import React from 'react'
import styled from 'styled-components'
import ContactForm from '../UI/ContactForm/ContactForm'
import ColumnTitle from '../UI/Titles/Titles/ColumnTitle'
import LargeTitle from '../UI/Titles/Titles/LargeTitle'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserHardHat, faClipboardListCheck, faChartNetwork } from '@fortawesome/pro-duotone-svg-icons'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'

import Paragraph from '../UI/Titles/Paragraph/Paragraph'
function JoinTrade() {
    return (
        <Container>
            <Content>
                <LargeTitleStyle align="center">INSPIRY TRADE</LargeTitleStyle>
                <ColumnTitle fontWeight="400" align="center"> Be part of inspiry project gallery  connecting you to potential customers.</ColumnTitle>
                <FlexBox>
                    <Box>
                        <IconStyle icon={faUserHardHat} size="5x" />
                        <Paragraph align="center">Inspiry trade connects you with your target audience</Paragraph>
                    </Box>
                    <Box>
                        <IconStyle icon={faClipboardListCheck} size="5x" />
                        <Paragraph align="center">Be listed on our trade directory promoting your business and service</Paragraph>
                    </Box>
                    <Box>
                        <IconStyle icon={faGoogle} size="5x" />
                        <Paragraph align="center">Quality traffic from google to your projects and listing</Paragraph>
                    </Box>
                    <Box>
                        <IconStyle icon={faChartNetwork} size="5x" />
                        <Paragraph align="center">Become part of our collaborative hub connecting you with our viewers</Paragraph>
                    </Box>
                </FlexBox>
            </Content>
            <ContactFormContainer>
                <Paragraph>Complete the form, we&apos;ll be in touch</Paragraph>
                <ContactForm
                    emailTo="hello@inspiry.co.nz"
                    emailRouteUrl="https://inspiry.co.nz/wp-json/inspiry/v1/join-trade-email"
                />
            </ContactFormContainer>

        </Container>
    )
}

export default JoinTrade
const Container = styled.section`
display: flex; 
padding: 100px 20px;

justify-content: center;

@media (max-width: 1100px){ 
flex-direction: column;
}
`
const LargeTitleStyle = styled(LargeTitle)`
@media (max-width: 500px ){ 
   font-size: 3rem;
   line-height: 3rem;
}
`
const Content = styled.div`
width: 55%;
margin: 0 20px;
@media (max-width: 1100px){ 
width: 100%;
margin: 0 0;
}
`
const ContactFormContainer = styled.div`
width: 35%; 
margin: 0 20px;
@media (max-width: 1100px){ 
width: 100%;
margin: 0 0;

}
`
const FlexBox = styled.div`
display: flex;
justify-content: center;
margin: 50px 0;
flex-wrap: wrap;
`
const Box = styled.div`
width: 100%;
max-width: 250px;
display: flex;
flex-direction: column;
align-items: center;
margin:  0 30px 50px 30px;
`
const IconStyle = styled(FontAwesomeIcon)`
color: var(--darkGrey);
margin-bottom: 20px;
`