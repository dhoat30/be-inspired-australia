import React, { useContext, useState } from 'react'
import OrderCard from '../../../../UI/Orders/OrderCard'
import OrdersDataContext from '../../../../../store/orders-context'
import styled from 'styled-components'
import SingleOrder from '../SingleOrder/SingleOrder'
import LoadingOverlay from '../../../../UI/LoadingOverlay/LoadingOverlay'
function AllOrders({ orderClickPass }) {
    const ordersDataCtx = useContext(OrdersDataContext)
    const [showOrderDetail, setShowOrderDetail] = useState(false)
    const [clickedOrderNumber, setClickedOrderNumber] = useState('')

    if (!ordersDataCtx.ordersData) {
        return <LoadingOverlay show={true} />
    }
    const orderClickHandler = (orderNumber) => {
        setClickedOrderNumber(orderNumber)
        setShowOrderDetail(true)
        orderClickPass()
    }
    console.log(ordersDataCtx.ordersData)
    const orderCard = ordersDataCtx.ordersData.map(item => {
        return (
            <OrderCard key={item.orderNumber} orderData={item} orderClickPass={orderClickHandler} />
        )
    })
    const singleOrderData = ordersDataCtx.ordersData.filter(item => {
        if (item.orderNumber === clickedOrderNumber) {
            return item
        }

    })

    return (
        <OrdersContainer>

            {showOrderDetail ?
                <SingleOrder singleOrderData={singleOrderData[0]} /> : orderCard
            }
        </OrdersContainer>
    )
}

export default AllOrders
const OrdersContainer = styled.section`
    padding: 20px;
`