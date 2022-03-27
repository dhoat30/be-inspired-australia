import React from 'react'
import styled from 'styled-components'
function ToolTip({ title }) {
    return (
        <ToolTipContainer>
            <Text>{title}</Text>
        </ToolTipContainer>
    )
}

export default ToolTip

const ToolTipContainer = styled.div`
position: absolute;
top: -40px;
background: var(--darkGrey);
box-shadow: var(--boxShadow);
padding: 2px 20px; 
border-radius: 10px;
color: white;
&::after{ 
    position: absolute;
    content: "";
    left: 10px;
 
    width:0px;
            height:0px;
            border:10px solid;
            border-top-color: var(--darkGrey);
            border-left-color: transparent;
            border-right-color: transparent;
            border-bottom-color: transparent;
}
`
const Text = styled.div``