import React from 'react'
import MediumTitle from '../../Titles/Titles/MediumTitle'
import styled from 'styled-components'
import Paragraph from '../../Titles/Paragraph/Paragraph'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt, faMobileAlt, faEnvelope } from '@fortawesome/pro-solid-svg-icons'
function DeliveryAddress({ orderData }) {
    return (
        <div>
            <MediumTitle>Delivery Address</MediumTitle>
            <Card>
                <Paragraph fontWeight="600">{orderData.customerFirstName} {orderData.customerLastName} </Paragraph>
                <Column>
                    <Paragraph><IconStyle icon={faMapMarkerAlt} />{orderData.address1}</Paragraph>
                    <Paragraph>{orderData.address2}</Paragraph>
                    <Paragraph>{orderData.city} {orderData.postCode} </Paragraph>
                </Column>
                <Column>
                    <Paragraph><IconStyle icon={faMobileAlt} />{orderData.phone}</Paragraph>
                </Column>

                <Column>
                    <Paragraph><IconStyle icon={faEnvelope} />{orderData.email}</Paragraph>
                </Column>
            </Card>

        </div>
    )
}

export default DeliveryAddress
const Card = styled.div`
box-shadow: var(--boxShadow);
width: 100%; 
max-width: 300px;
padding: 20px 50px;
border-radius: var(--cardBorderRadius);
`
const Column = styled.div`
margin: 10px 0;
`

const IconStyle = styled(FontAwesomeIcon)`
position: absolute;
left: -25px;
top: 5px;
`
