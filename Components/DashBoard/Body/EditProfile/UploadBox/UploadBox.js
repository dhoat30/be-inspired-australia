import React, { useState, useRef, useEffect, useContext } from 'react'
import styled from 'styled-components'
import Loading from '../../../../UI/Loading/Loading'
import uploadImages from '../../../../../util/upload-images-function'
import AuthContext from '../../../../../store/auth-context'
import Overlay from '../../../../UI/Overlay/Overlay'
import ColumnTitle from '../../../../UI/Titles/Titles/ColumnTitle'
import Button from '../../../../UI/Button/Button'
import { useRouter } from 'next/router'
import UserDataContext from '../../../../../store/user-data-context'
function UploadBox(props) {

    const [enteredImages, setEnteredImages] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [showImage, setShowImage] = useState('')
    const uploadRef = useRef()

    const overlayClickHandler = () => {
        props.onClickPass()
    }
    // auth context 
    const authCtx = useContext(AuthContext)
    const router = useRouter()
    // user data context to get the id 
    const userDataCtx = useContext(UserDataContext)

    useEffect(() => {
        // // set profile image in user profile 
        if (!enteredImages[0]) {
            return
        }
        else {
            const body = {
                profile_image: enteredImages[0].source_url,
                userID: userDataCtx.userData.data[0].userID
            }

            fetch("https://inspiry.co.nz/wp-json/inspiry/v1/update-image", {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${authCtx.token}`
                },
                method: "POST",
                body: JSON.stringify(body)
            }
            )
                .then(res => res.json())
                .then(res => {
                    router.reload(window.location.pathname)

                })
                .catch(err => console.log(err))
        }

    }, [enteredImages])

    const imageChangeHandler = async (e) => {
        let imagesArray = []
        if (e.target.files) {
            for (let i = 0; i < e.target.files.length; i++) {
                // send request to upload image
                let formdata = new FormData();
                setLoading(true) //set loading to true 
                formdata.append("file", e.target.files[i], e.target.files[i].name);

                const headers = {
                    "Authorization": `Bearer ${authCtx.token}`
                }
                uploadImages('https://inspiry.co.nz/wp-json/wp/v2/media', formdata, headers)
                    .then(res => {
                        setLoading(false)
                        if (res.code) {
                            setError(res.message)
                        }
                        else {
                            setEnteredImages(oldArray => [...oldArray, res])
                            if (res.media_details.sizes.shop_catalog) {
                                setShowImage(res.media_details.sizes.shop_catalog.source_url)
                            }
                            else {
                                setShowImage(res.source_url)
                            }
                        }
                    })
                    .catch(err => {
                        setLoading(false)
                    })
            }
        }

    }

    const boxClickHandler = () => {
        if (!enteredImages && !props.clearImage) {
            uploadRef.current.click()
        }
        else {
            uploadRef.current.click()
        }
    }

    const submitHandler = async (e) => {
        e.preventDefault()
    }

    return (
        <React.Fragment>
            <FormContainer onSubmit={submitHandler}>
                <Container onClick={boxClickHandler}>

                    {!loading ?
                        <Content>
                            {showImage && !props.clearImage ? <ImgStyle src={showImage} /> :
                                <>
                                    <ColumnTitle align="center">Choose your picture</ColumnTitle>
                                    <ButtonStyle>Choose Photo</ButtonStyle>
                                    <div className="error"> {error} </div>
                                </>
                            }
                        </Content>
                        : <Loading />}
                </Container>


                <input
                    style={{ display: "none" }}
                    type="file"
                    onChange={imageChangeHandler}
                    multiple accept="image/*"
                    ref={uploadRef} />
            </FormContainer>
            <Overlay onClick={overlayClickHandler} />
        </React.Fragment>
    )
}

export default UploadBox
const FormContainer = styled.form`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 10;
`
const Container = styled.div`
background: white;
width: 95%;
min-width: 400px;
min-height: 150px;
border-radius: var(--cardBorderRadius);
padding: 20px 10px;
display: flex;
justify-content: center;
`
const Content = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;  
    justify-content: center;
    align-items: baseline;
`
const ImgStyle = styled.img`
width: 100%;
height: auto;
`
const ButtonStyle = styled(Button)`
 margin-top: 30px;
`