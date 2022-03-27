import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

function SEO({ seo }) {
    const router = useRouter()

    return (
        <Head>
            <title>{seo.title} | Be Inspired Projects</title>
            <meta name="description"
                content={seo.description.length > 160
                    ? seo.description.substring(0, 160)
                    : seo.description
                }>
            </meta>

            {/* open graph meta */}
            <meta property="og:title" content={`${seo.title} | Be Inspired Projects`} key="ogtitle" />
            <meta property="og:description" content={seo.description.length > 160
                ? seo.description.substring(0, 160)
                : seo.description
            }
                key="ogdesc" />
            <meta property="og:url" content={`https://inspiry.co.nz/home${router.asPath}`} key="ogurl" />
            <meta property="og:image" content={seo.imageSrc} key="ogimage" />
            <meta property="og:site_name" content={"Be Inspired"} key="ogsitename" />
        </Head>
    )
}

export default SEO
