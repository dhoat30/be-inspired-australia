import React, { useContext, useState } from 'react'
import UploadBox from '../../../../UI/UploadBox/UploadBox'
import styled from 'styled-components'
import AuthContext from '../../../../../store/auth-context'
import BoardsDataContext from '../../../../../store/boards-data-context'
import { useRouter } from 'next/router'
function UploadImage({ parentSlug, parentBoardID }) {
    const authCtx = useContext(AuthContext)
    const boardDataCtx = useContext(BoardsDataContext)

    const router = useRouter()

    const uploadDataHandler = (uploadedImage) => {

        if (uploadedImage.length !== 0) {
            //    get existing gallery
            let newGalleryArray = boardDataCtx.pinsData[0].gallery
            // set new uploaded images data to pinsData
            if (!newGalleryArray) {
                newGalleryArray = [uploadedImage]
            }
            else if (newGalleryArray.length > 0) {
                newGalleryArray.push(uploadedImage)
            }
            const formData = {
                parentSlug: parentSlug,
                parentBoardID: parentBoardID,
                uploadedImages: true,
                gallery: newGalleryArray
            }
            console.log(formData)

            fetch("https://inspiry.co.nz/wp-json/inspiry/v1/upload-image-board", {
                method: "POST",
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${authCtx.token}`
                }
            })
                .then(res => res.json())
                .then(res => {
                    console.log(res)
                    if (res === 200) {
                        router.reload()
                    }
                    else {
                        console.log(res)
                    }
                })
                .catch(err => console.log(err))
        }
    }

    return (
        <Container>
            <UploadBox
                onUploadData={uploadDataHandler}
            />
        </Container>
    )
}

export default UploadImage

const Container = styled.section`
width: 200px;
position: fixed;
top: 50%; 
left: 50%; 
transform: translate(-50%, -50%);
z-index: 10;
`