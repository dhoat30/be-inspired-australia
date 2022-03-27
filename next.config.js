const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        url: "http://localhost:3000/home",
        googleClientId: "207300494956-vdv7cmflcjuim75sd59j02spu13sh4ca.apps.googleusercontent.com",
        facebookAppID: "922872675102426"
      },
      reactStrictMode: true,
      images: {
        domains: ['inspiry.co.nz']
      },
      basePath: "/home"

    }
  }

  return {
    env: {
      url: "https://inspiry.co.nz/home",
      googleClientId: "207300494956-vdv7cmflcjuim75sd59j02spu13sh4ca.apps.googleusercontent.com",
      facebookAppID: "619325815735126"
    },
    reactStrictMode: true,
    images: {
      domains: ['inspiry.co.nz']
    },
    basePath: "/home"
  }
}
