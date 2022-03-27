import { serialize } from 'cookie'
async function handler(req, res) {
    /* remove cookies from request header */
    if (req.method === 'POST') {
        res.setHeader('Set-Cookie', [
            serialize('inpiryAuthToken', '', {
                maxAge: -1,
                path: '/',
            })
        ]);

        res.writeHead(302, { Location: '/home/api/login' });
        res.end();
    }
}

export default handler
