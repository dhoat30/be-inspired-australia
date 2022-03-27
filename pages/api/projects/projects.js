async function handler(req, res) {
    if (req.method === 'POST') {
        res.status(201).json({ message: "this is post response" })
    }

    else {
        const response = await fetch(`https://inspiry.co.nz/wp-json/wp/v2/project_categories`)
        const data = await response.json()
        // const data = JSON.stringify(response)
        res.status(200).json({ data: data })
    }
}

export default handler