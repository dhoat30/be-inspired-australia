import React, { useState } from 'react'
import MercCards from '../../UI/Cards/MercCards/MercCards'
import styled from 'styled-components'
import Overlay from '../../UI/Overlay/Overlay'
function ImageCards({ src, showOverlay }) {
    return (
        <Container >
            <div>
                <MercCards src={src} />
                {showOverlay ? <OverlayStyle></OverlayStyle> : null}
            </div>
        </Container>
    )
}

export default ImageCards
const Container = styled.div`
position: relative;
`
const OverlayStyle = styled(Overlay)`
bottom: 8px;
border-radius: var(--cardBorderRadius);
position: absolute;
`