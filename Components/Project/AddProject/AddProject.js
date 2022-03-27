import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import DetailForm from './DetailForm/DetailForm'
import UploadBox from './UploadBox/UploadBox'
import UnderlineLink from '../../UI/Titles/Links/UnderlineLink'
function AddProject(props) {
    const [categoryData, setCategoryData] = useState('')
    const [tradeData, setTradeData] = useState('')
    const [galleryData, setGalleryData] = useState()
    const [clearImage, setClearImage] = useState(false)

    useEffect(() => {
        // get project categories 
        fetch('/home/api/projects/projects')
            .then(res => res.json())
            .then(res => setCategoryData(res))
            .catch(err => console.log(err))

        // get trade professionals 
        fetch('/home/api/trade-professionals/trade-professionals')
            .then(res => res.json())
            .then(res => setTradeData(res))
            .catch(err => console.log(err))
    }, [])

    let categories
    let trade
    if (categoryData && tradeData) {
        categories = categoryData.data.map(item => {
            return {
                id: item.id,
                name: item.name,
                slug: item.slug,
                parent: item.parent
            }
        })
        trade = tradeData.data.map(item => {
            return {
                id: item.id,
                name: item.title,
                slug: item.slug
            }
        })
    }

    // get existing categories if user is editing a project
    let existingParentCategory
    let existingChildCategory
    if (props.singleProjectData) {
        existingParentCategory = props.singleProjectData.projectCategories.filter(item => {
            if (!item.parent) {
                return {
                    parentCategoryID: item.term_id
                }
            }
        })
        existingChildCategory = props.singleProjectData.projectCategories.filter(item => {
            if (item.parent) {
                return {
                    childCategoryID: item.term_id
                }
            }
        })

    }

    function uploadHandler(res) {
        setGalleryData(res)
    }

    const clearImageUploader = () => {
        setClearImage(true)
    }
    console.log(galleryData)
    return (
        <Container>

            <UnderlineLinkStyle href="/pins">{props.singleProjectData ? "Edit Your Project" : "Create a Project"}</UnderlineLinkStyle>
            <ContentBox>
                <UploadBox authToken={props.authToken}
                    onUploadData={uploadHandler}
                    clearImage={clearImage}
                    singleProjectData={props.singleProjectData}
                />

                <DetailForm categories={categories}
                    trade={trade}
                    authToken={props.authToken}
                    galleryData={galleryData}
                    clearImageUploader={clearImageUploader}
                    singleProjectData={props.singleProjectData}
                    existingChildCategory={existingChildCategory}
                    existingParentCategory={existingParentCategory}
                />
            </ContentBox>
        </Container>
    )
}

export default AddProject

const Container = styled.section`
    background: var(--offWhite);
    height: 100vh;
    width: 100%;
    border: solid var(--offWhite);
    padding: 10px;
    display: flex;
    flex-direction: column;
    @media(max-width: 1000px){ 
        padding: 0;
            }
`
const ContentBox = styled.div`
    width: 100%;
    margin: 0 auto;
    max-width: 1200px;
    background: white;
    box-shadow: var(--boxShadow); 
    border-radius: var(--cardBorderRadius);
    padding: 50px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    flex-wrap: wrap;
    @media(max-width: 1000px){ 
        padding: 10px;
            }
`
const UnderlineLinkStyle = styled(UnderlineLink)`
max-width: 1200px;
margin: 50px auto 30px auto;
`
