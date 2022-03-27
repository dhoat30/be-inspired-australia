async function handler(req, res) {
    if (req.method === 'POST') {
        res.status(201).json({ message: "this is post response" })
    }

    else {
        res.status(200).json({ data: "get request received " })

    }
}

export default handler
