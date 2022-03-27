async function getSingleOrder(orderNumber) {
    let response
    await fetch("https://inspiry.co.nz/wp-json/inspiry/v1/get-order-with-number", {
        method: "POST",
        body: {
            orderNumber: orderNumber
        }
    }).then(res => res.json())
        .then(res => response = res)
        .catch(err => response = err)
    return response

}

export default getSingleOrder