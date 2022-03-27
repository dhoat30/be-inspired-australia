import React from 'react'
import OrderBottomMeta from './OrderBottomMeta/OrderBottomMeta'
import OrderTopMeta from './OrderTopMeta/OrderTopMeta'
import styled from 'styled-components'
function OrderCard({ orderData, orderClickPass }) {

    return (
        <CardContainer >
            <OrderTopMeta orderData={orderData} />
            <OrderBottomMeta orderData={orderData} orderClickPass={orderClickPass} />
        </CardContainer>
    )
}

export default OrderCard

const CardContainer = styled.div`
margin-bottom: 70px;
`