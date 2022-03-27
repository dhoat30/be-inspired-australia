import React from 'react'
import styled from 'styled-components'
import Paragraph from '../../Titles/Paragraph/Paragraph'
import MediumTitle from '../../Titles/Titles/MediumTitle'
function OrderTopMeta({ orderData }) {
    console.log(orderData)
    let postStatus
    if (orderData.postStatus === "order-placed" || orderData.postStatus === "small-items") {
        postStatus = "processing"
    }
    else if (orderData.postStatus === "sample") {
        postStatus = "processed"
    }
    else {
        postStatus = orderData.postStatus
    }
    return (
        <Container>
            <BoxContainer>
                <Box>
                    <Paragraph>Order Date</Paragraph>
                    <ParagraphStyle>{orderData.orderDate} </ParagraphStyle>
                </Box>
                <Box>
                    <Paragraph>Order Number</Paragraph>
                    <ParagraphStyle>{orderData.orderNumber} </ParagraphStyle>
                </Box>
                <Box>
                    <Paragraph>Total Amount</Paragraph>
                    <ParagraphStyle>${orderData.orderTotal.replace(/\.00$/, '')} </ParagraphStyle>
                </Box>
                <Box>
                    <Paragraph>Estimated Delivery Date</Paragraph>
                    <ParagraphStyle>{orderData.estimatedDelivery ? orderData.estimatedDelivery : "Coming soon..."} </ParagraphStyle>
                </Box>
            </BoxContainer>
            <OrderStatus>
                <MediumTitleStyle>{postStatus}</MediumTitleStyle>
            </OrderStatus>
        </Container>
    )
}

export default OrderTopMeta
const Container = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
position: relative;
@media(max-width: 950px){ 
    flex-wrap: wrap;
}
&::after{ 
    content: '';
    border-bottom: 2px solid var(--beige) ; 
    width: 100%;
    position: absolute;
    bottom: -10px;
    left: 0;
}
`
const BoxContainer = styled.div`
display: flex;
justify-content: space-between;
flex-wrap: wrap;
width: 95%;
max-width: 700px;
`
const Box = styled.div`
margin: 0 15px 15px 0;
`
const ParagraphStyle = styled(Paragraph)`
font-weight: 700;
`
const OrderStatus = styled.div`
`
const MediumTitleStyle = styled(MediumTitle)`
font-weight: 700;
text-transform: capitalize;
`