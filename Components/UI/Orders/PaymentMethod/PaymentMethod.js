import React from 'react'
import MediumTitle from '../../Titles/Titles/MediumTitle'
import styled from 'styled-components'
import Paragraph from '../../Titles/Paragraph/Paragraph'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt, faMobileAlt, faEnvelope } from '@fortawesome/pro-solid-svg-icons'
function PaymentMethod({ orderData }) {
    return (

        <div>
            {!orderData.PaymentMethod ? null :
                <React.Fragment>
                    <MediumTitle>PaymentMethod</MediumTitle>
                    <Card>
                        <Column>
                            <Paragraph>{orderData.PaymentMethod}</Paragraph>
                        </Column>
                    </Card>
                </React.Fragment>
            }

        </div>
    )
}

export default PaymentMethod
const Card = styled.div`
box-shadow: var(--boxShadow);
width: 100%; 
max-width: 300px;
padding: 20px 50px;
border-radius: var(--cardBorderRadius);`
const Column = styled.div`
margin: 10px 0;
`

