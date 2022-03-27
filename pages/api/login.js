import cookie from 'cookie'
import axios from 'axios'
async function handler(req, res) {
    if (req.method === 'POST') {
        axios.post("https://inspiry.co.nz/wp-json/jwt-auth/v1/token",
            {
                username: req.body.username,
                password: req.body.password
            }).then(response => {
                res.setHeader('Set-Cookie', cookie.serialize('inpiryAuthToken', response.data.token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV !== 'development',
                    sameSite: "strict",
                    maxAge: 162000,
                    path: "/"
                }))

                res.json({
                    message: response.data.token,
                    status: 200
                })

            }).catch(err => {
                console.log(err.response)
                res.json({
                    message: err.response.data.message,
                    status: 401
                })
            })

    }

    else {
        const response = await fetch(`https://inspiry.co.nz/wp-json/wp/v2/pages?slug=contact`)
        const data = await response.json()
        // const data = JSON.stringify(response)
        res.status(200).json({ data: data })
    }
}

export default handler
