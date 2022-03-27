import React from 'react'

function About({ singleData }) {
    if (!singleData.content) {
        return null
    }

    return (
        <div dangerouslySetInnerHTML={{ __html: singleData.content }}></div>

    )
}

export default About