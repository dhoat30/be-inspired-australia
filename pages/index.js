import LoggedOut from '../Components/LoggedOut/LoggedOut'
import cookie from 'cookie'
import Head from 'next/head'
import React from 'react'

export default function Home({ typewriterData, pinsData }) {

  return (

    < React.Fragment >
      <Head>
        <title>Inspiry | Live an Inspired Life | Find Trade Professionals and Projects</title>
      </Head>
      <LoggedOut typewriterData={typewriterData} pinsData={pinsData} />

    </React.Fragment >

  )
}

export async function getServerSideProps(context) {
  let headerCookie = context.req.headers.cookie

  if (typeof headerCookie !== 'string') {
    headerCookie = '';
  }
  // check if user is login 
  const cookies = cookie.parse(headerCookie)
  if (cookies.inpiryAuthToken) {
    return {
      redirect: {
        destination: "/pins",
        permanent: false
      }
    }
  }

  const response = await fetch("https://inspiry.co.nz/wp-json/wp/v2/typewriter_effect")
  const data = await response.json()

  const pinsResponse = await fetch("https://inspiry.co.nz/wp-json/wp/v2/projects")
  let pinsData = await pinsResponse.json()

  pinsData = pinsData.map(item => {
    return {
      id: item.id,
      slug: item.slug,
      title: item.title.rendered,
      gallery: item.acf.gallery
    }
  })

  const typewriterData = data.map(item => {
    return {
      title: item.title.rendered,
    }
  })


  return {
    props: {
      typewriterData: typewriterData,
      pinsData: pinsData
    }
  }
}