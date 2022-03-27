async function handler(req, res) {
    if (req.method === 'DELETE') {
        const response = await fetch(`https://inspiry.co.nz/wp-json/inspiry/v1/delete-board`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${req.body.token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(req.body)
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