async function handler(req, res) {
  if (req.method === 'POST') {
    const response = await fetch('https://inspiry.co.nz/wp-json/inspiry/v1/facebook-login', {
      method: "POST",
      body: JSON.stringify(req.body),
      headers: {
        'Content-Type': 'application/json',
        "Accept": "application/json"
      },
      redirect: 'follow'
    })
    const data = await response.json()
    res.status(201).json({ data: data })
  }

  else {

    res.status(200).json({ message: "social login get request" })
  }
}

export default handler
