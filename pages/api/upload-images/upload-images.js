import { fs } from "fs";


async function handler(req, res) {
    if (req.method === 'POST') {
        console.log(req.body)
        const response = await fetch('https://inspiry.co.nz/wp-json/wp/v2/media', {
            method: "POST",
            body: req.body,
            headers: {
                "content-type": '',
                "Authorization": `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvaW5zcGlyeS5jby5ueiIsImlhdCI6MTYyOTkxMDA5NSwibmJmIjoxNjI5OTEwMDk1LCJleHAiOjE2MzA1MTQ4OTUsImRhdGEiOnsidXNlciI6eyJpZCI6IjEifX19.1EmpA-RWXI5S3uDVABa382OZBAvHeq1sFJ55oaQjmSo`
            },
            redirect: 'follow'
        })

        const data = await response.json()

        res.status(201).json({ data: data })
    }

    else {
        const response = await fetch(`https://inspiry.co.nz/wp-json/wp/v2/project-categories`)
        const data = await response.json()
        // const data = JSON.stringify(response)
        res.status(200).json({ data: data })
    }
}

export default handler
