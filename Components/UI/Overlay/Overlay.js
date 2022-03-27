import React from 'react'
import styled from 'styled-components'

function Overlay({ onClick, className }) {
    return (
        <OverlayStyle className={className} onClick={onClick}></OverlayStyle>
    )
}

export default Overlay
const OverlayStyle = styled.div`
position: fixed;
background: rgba(1,1,1,0.4);
width: 100%;
bottom: 0;
top: 0;
left: 0;
z-index: 1;
cursor:pointer; 
`