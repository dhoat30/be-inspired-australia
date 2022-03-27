import React from 'react'
import MenuItems from './MenuItems/MenuItems'
import styled from 'styled-components'

function Menu(props) {

    const menuItem = props.menuItems.map(item => {
        return (<MenuItems
            key={item.title}
            title={item.title}
            link={item.url}
            linkType={item.linkType}
        />)
    })
    return (
        <Container>
            {menuItem}
        </Container>
    )
}

export default Menu

const Container = styled.ul`
display: flex;
flex-direction: row;
width: 300px;
justify-content: space-between;
padding: 0;
background: white;
margin: 0;
@media(max-width: 1000px){ 
    flex-direction: column ;
    width: 250px;
}
`