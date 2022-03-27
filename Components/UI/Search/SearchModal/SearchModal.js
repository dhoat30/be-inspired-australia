import React from 'react'
import styled from 'styled-components'
import Loading from '../../Loading/Loading'
import LoadingOverlay from '../../LoadingOverlay/LoadingOverlay'
import Item from './Item/Item'
function SearchModal({ showLoading, projectData, tradeData, clickPass }) {
    let project
    let tradeProfessional
    if (projectData && tradeData) {
        project = projectData.map(item => {
            return (
                <Item
                    onClick={() => clickPass()}
                    key={item.id}
                    title={item.title.rendered}
                    img={item.acf.gallery[0].url}
                    link={`/pins/${item.slug}`}
                />
            )
        })

        tradeProfessional = tradeData.map(item => {
            return (
                <Item
                    onClick={() => clickPass()}
                    key={item.id}
                    title={item.title.rendered}
                    img={item.acf.logo.url}
                    link={`/professionals/${item.slug}`}
                />
            )
        })
    }
    return (
        <Container >
            {showLoading &&
                <LoadingContainer>
                    <LoadingOverlay show={showLoading} />
                </LoadingContainer>
            }
            <ItemContainer onClick={() => clickPass()}>
                {project}
                {tradeProfessional}
            </ItemContainer>
        </Container>
    )
}

export default SearchModal
const Container = styled.div`   
    padding: 20px 0;
    position: absolute;
    background: white;
    width: 100%;
    max-width: 1200px;
    height: auto;
    min-height: 400px;
    max-height: 80vh;
    overflow: scroll;
    top: 45px;
    z-index: 12; 
    left: 50%;
    transform: translate(-50%, 0);
`
const LoadingContainer = styled.div`

position: relative;
height: 100%;
`
const LoadingStyle = styled(Loading)`
 top: 50%;
 left: 50% ;
 position: relative;
    transform: translate(-50%, -50%) !important;
 font-size: 8rem;
 
`
const ItemContainer = styled.div`

`