import React, { useContext } from 'react'
import styled from 'styled-components'
import Content from './Content/Content'

function AllPins(props) {

    return (
        <Container>
            <Content projectData={props.projectData} />
        </Container>
    )
}

export default AllPins

const Container = styled.section`
margin: 50px 0;
`