import React from 'react'
import Image from 'next/image'
import styled from 'styled-components'
function WideImage({ src }) {
    return (
        <ImageStyle src={src} layout="fill" alt="Wide Image" />
    )
}

export default WideImage
const ImageStyle = styled(Image)`
object-fit: cover;
`