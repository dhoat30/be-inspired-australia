import React from 'react'
import TradeContactForm from '../../../../UI/ContactForm/TradeContactForm'
import styled from 'styled-components'
function ProfessionalContactForm({ singleData, cancelPass }) {
    return (
        <React.Fragment>
            <Container>
                <TradeContactForm
                    cancelPass={cancelPass}
                    title={`Message ${singleData.title}`}
                    emailTo={`${singleData.acf.email_address}`}
                    emailRouteUrl="https://inspiry.co.nz/wp-json/inspiry/v1/professional-email"
                />
            </Container>
        </React.Fragment>


    )
}

export default ProfessionalContactForm
const Container = styled.section`
position: fixed;
width: 95%;
max-width: 400px;
background: white;
border-radius: var(--cardBorderRadius);
z-index: 10;
top: 50%; 
left: 50%;
transform: translate(-50%, -50%);
`