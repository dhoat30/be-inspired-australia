import { createContext, useState } from 'react'

const OrdersDataContext = createContext({
    ordersData: null,
    getOrdersData: function (ordersData) { },
})

export function OrdersDataContextProvider(props) {
    const [ordersData, setOrdersData] = useState()

    // get boards data
    function getOrdersDataHandler(ordersData) {
        setOrdersData(ordersData)
    }

    // set context
    const context = {
        ordersData: ordersData,
        getOrdersData: getOrdersDataHandler,
    }

    return (<OrdersDataContext.Provider value={context}>
        {props.children}
    </OrdersDataContext.Provider>)
}

export default OrdersDataContext