
async function handler(req, res) {
    if (req.method === 'POST') {

        const response = await fetch('https://inspiry.co.nz/wp-json/inspiry/v1/get-single-user-pin', {
            method: "POST",
            body: JSON.stringify(req.body),
            headers: {
                'Content-Type': 'application/json',
                "Accept": "application/json",
                "Authorization": `Bearer ${req.cookies.inpiryAuthToken}`
            },
            redirect: 'follow'
        })

        const data = await response.json()

        res.status(201).json({ data: data })
    }

    else {
        console.log(req.query.slug)

        // const data = JSON.stringify(response)
        res.status(200).json({ data: "message" })
    }
}

export default handler
