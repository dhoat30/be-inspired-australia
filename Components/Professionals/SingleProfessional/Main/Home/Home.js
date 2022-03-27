import React from 'react'

function Home({ singleData }) {

    if (!singleData.content) {
        return null
    }
    var maxLength = 500 // maximum number of characters to extract
    //trim the string to the maximum length
    var trimmedString = singleData.content.substr(0, maxLength);

    //re-trim if we are in the middle of a word
    trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" ")))

    return (
        <React.Fragment>
            <div dangerouslySetInnerHTML={{ __html: trimmedString }}></div>

        </React.Fragment>

    )
}

export default Home
