async function handler(req, res) {
    if (req.method === 'POST') {
        const response = await fetch(`https://inspiry.co.nz/wp-json/inspiry/v1/get-orders`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${req.body.token}`,
                "Content-Type": "application/json"
            }
        })
        const data = await response.json()
        // const data = JSON.stringify(response)
        res.status(201).json({ data: data })
    }
    else {
        // const data = JSON.stringify(response)
        res.status(200).json({ data: "get request received" })
    }
}

export default handler
