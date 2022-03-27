import React from 'react'
import OrderTopMeta from '../../../../UI/Orders/OrderTopMeta/OrderTopMeta'
import styled from 'styled-components'
import DeliveryAddress from '../../../../UI/Orders/DeliveryAddress/DeliveryAddress'
import CustomerOrderNote from '../../../../UI/Orders/CustomerOrderNote/CustomerOrderNote'
import PaymentMethod from '../../../../UI/Orders/PaymentMethod/PaymentMethod'
import ProductDetails from '../../../../UI/Orders/ProductDetails/ProductDetails'
import Timeline from '../../../../UI/Orders/Timeline/Timeline'
function SingleOrder({ singleOrderData }) {
    console.log(singleOrderData)
    return (
        <SingleOrderContainer>
            <OrderTopMeta orderData={singleOrderData} />

            <TimeLineContainer>
                <Timeline orderData={singleOrderData} />
            </TimeLineContainer>

            {singleOrderData.orderCustomerNote.length > 0 &&
                <CustomerOrderNote orderData={singleOrderData} />
            }

            <RowContainer>
                <div>
                    <DeliveryAddress orderData={singleOrderData} />
                    <PaymentMethod orderData={singleOrderData} />
                </div>
                <ProductDetailsContainer>
                    <ProductDetails orderData={singleOrderData} />
                </ProductDetailsContainer>
            </RowContainer>

        </SingleOrderContainer>
    )
}

export default SingleOrder

const SingleOrderContainer = styled.div`


`
const TimeLineContainer = styled.div`
`
const RowContainer = styled.div`
margin: 50px 0;
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: flex-start;
@media (max-width: 1000px ){ 
    flex-wrap: wrap;
}
`
const ProductDetailsContainer = styled.div`
width: 100%;
max-width: 700px; 
`