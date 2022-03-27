import React from 'react'
import MediumTitle from '../../Titles/Titles/MediumTitle'
import styled from 'styled-components'
import Paragraph from '../../Titles/Paragraph/Paragraph'
import Product from './Product'

function ProductDetails({ orderData }) {
    const product = orderData.products.map(item => {
        return (
            <Product
                key={item.productID}
                src={item.productImage[0]}
                productName={item.productName}
                quantity={item.quantity}
                productLink={item.productLink}
                total={item.total}
            />
        )
    })
    return (
        <Container>
            <MediumTitle>Your Order Details</MediumTitle>
            <Card>
                {product}
            </Card>
            <TotalContainer>
                <Paragraph fontWeight="700">Cart Totals</Paragraph>
                <Row>
                    <Paragraph>Subtotal</Paragraph>
                    <Paragraph>${orderData.orderSubtotal.toFixed(2)} </Paragraph>
                </Row>
                <Row>
                    <Paragraph>Coupon Discount</Paragraph>
                    <Paragraph>${orderData.totalDiscount.toFixed(2)} </Paragraph>
                </Row>
                <Row>
                    <Paragraph>Shipping Fee</Paragraph>
                    <Paragraph>${orderData.shippingTotal.replace(/\.00$/, '')} </Paragraph>
                </Row>
                <LastRow>
                    <Paragraph fontWeight="600">Total</Paragraph>
                    <Paragraph fontWeight="600">${orderData.orderTotal.replace(/\.00$/, '')} </Paragraph>
                </LastRow>
            </TotalContainer>
        </Container>
    )
}

export default ProductDetails
const Container = styled.div`
margin-left: 30px; 
@media (max-width: 1000px ){ 
    margin-left: 0;
    margin-top: 50px;
}
`
const Card = styled.div`
box-shadow: var(--boxShadow);
border-radius: var(--cardBorderRadius);
width: 100%; 
padding: 20px;

`
const TotalContainer = styled.div`
width: 250px;

margin: 30px 0 0 auto;
`
const Row = styled.div`
display: flex;
justify-content: space-between;
margin: 5px 0; 
`
const LastRow = styled(Row)`
margin: 10px 0;
`
