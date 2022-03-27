import React from 'react'
import MediumTitle from '../../Titles/Titles/MediumTitle'
import styled from 'styled-components'
import Paragraph from '../../Titles/Paragraph/Paragraph'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt, faClipboard, faEnvelope } from '@fortawesome/pro-solid-svg-icons'
function CustomerOrderNote({ orderData }) {
    const orderCustomerNote = orderData.orderCustomerNote[0].content

    console.log(orderCustomerNote.content)
    return (
        <div>
            <MediumTitle>Order Notes</MediumTitle>
            <Card>

                <Column>
                    <Paragraph><IconStyle icon={faClipboard} />{orderCustomerNote}</Paragraph>
                </Column>
            </Card>

        </div>
    )
}

export default CustomerOrderNote
const Card = styled.div`
box-shadow: var(--boxShadow);
width: 100%; 

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
