import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import Button from '../../Button/Button'
import Overlay from '../../Overlay/Overlay'
import MediumTitle from '../../Titles/Titles/MediumTitle'
import Errors from '../../Notifications/Errors/Errors'
import Input from '../../Input/Input'
import { useRouter } from 'next/router'
import AuthContext from '../../../../store/auth-context'
import TextArea from '../../Input/TextArea'
import Paragraph from '../../Titles/Paragraph/Paragraph'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/pro-light-svg-icons'
import LoadingOverlay from '../../LoadingOverlay/LoadingOverlay'

function EditBoard({ closeHandlerPass, data }) {
    const [enteredName, setEnteredName] = useState(data.title)
    const [enteredNameTouched, setEnteredNameTouched] = useState(false)
    const [enteredDescription, setEnteredDescription] = useState(data.description)
    const [enteredStatus, setEnteredStatus] = useState(data.status === "private" ? true : false)
    const [showLoading, setShowLoading] = useState(false)

    const enteredNameIsValid = enteredName.length > 1
    const enteredNameIsInvalid = !enteredNameIsValid && enteredNameTouched
    const router = useRouter()
    console.log(router)
    // auth context 
    const authCtx = useContext(AuthContext)
    const nameChangeHandler = (e) => {
        setEnteredName(e.target.value)
    }
    const descriptionChangeHandler = (e) => {
        setEnteredDescription(e.target.value)
    }
    const nameBlurHandler = (e) => {
        setEnteredNameTouched(true)
    }
    const publishChangeHandler = (e) => {
        setEnteredStatus(enteredStatus ? false : true)
    }

    const closeHandler = () => {
        closeHandlerPass()
    }

    const submitHandler = (e) => {
        e.preventDefault()
        const body = {
            boardName: enteredName,
            boardDescription: enteredDescription,
            status: enteredStatus ? "private" : "publish",
            token: authCtx.token,
            boardID: data.id
        }
        console.log(body)
        setShowLoading(true)
        fetch('/home/api/boards/update-board', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
            .then(res => res.json())
            .then(res => {
                setShowLoading(false)
                if (!res.data.code) {
                    router.reload(window.location.pathname)
                }
                else {
                    console.log(res.data.code)
                }
            })
            .catch(err => {
                setShowLoading(false)
                console.log(err)
            })
    }

    const deleteHandler = () => {
        const body = {
            boardID: data.id,
            token: authCtx.token
        }
        setShowLoading(true)
        fetch('/home/api/boards/delete-board', {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
            .then(res => res.json())
            .then(res => {
                setShowLoading(false)
                if (!res.data.code) {
                    router.push("/members/design-boards")

                    if (router.pathname === "/members/design-boards") {
                        router.reload()
                    }
                }
                else {
                    console.log(res.data.code)
                }
            })
            .catch(err => {
                setShowLoading(false)
                console.log(err)
            }
            )
    }
    return (
        <React.Fragment>
            <Container>
                <Top>
                    <MediumTitle align="center">Edit your board</MediumTitle>
                </Top>
                <FormContainer>
                    <InputContainer>
                        <Label htmlFor="name">Name</Label>
                        <Input
                            type="text"
                            placeholder='Like "Bedroom Furniture" or "Design Ideas" '
                            inputChange={nameChangeHandler}
                            blurChange={nameBlurHandler}
                            isInvalid={enteredNameIsInvalid}
                            value={enteredName}
                        />
                        {enteredNameIsInvalid ? <Errors>Please enter a board name.</Errors> : null}
                    </InputContainer>

                    <InputContainer>
                        <Label htmlFor="description">Description</Label>
                        <TextArea
                            placeholder="What's your board about?"
                            value={enteredDescription}
                            onChange={descriptionChangeHandler}
                        />
                    </InputContainer>

                    <InputContainer>
                        <CheckBox
                            type="checkbox"
                            inputChange={publishChangeHandler}
                            value={enteredStatus}
                            defaultChecked={enteredStatus}
                        />
                        <Label>Keep this board secret.</Label>
                    </InputContainer>
                    <InputContainer>
                        <Label>Action</Label>
                        <MediumTitleStyle onClick={deleteHandler}>Delete board</MediumTitleStyle>
                        <Paragraph>
                            Delete this board and all its Pins forever.
                            You can&apos;t undo this!
                        </Paragraph>
                    </InputContainer>

                </FormContainer>
                <Bottom>
                    <ButtonStyle onClick={submitHandler}>Save</ButtonStyle>
                </Bottom>
                <IconStyle icon={faTimes} onClick={closeHandler} />
            </Container>

            <Overlay onClick={closeHandler} />
            <LoadingOverlay show={showLoading} />
        </React.Fragment>

    )
}

export default EditBoard
const Container = styled.section`
display: flex; 
flex-direction: column; 
justify-content: space-between;
position: fixed;
z-index: 10;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
width: 100%;
max-width: 500px;
background: white;
border-radius: var(--cardBorderRadius);
height: 600px;
@media(max-width: 1000px){
    height: 90vh;
}

`
const Top = styled.div`
padding: 5px 5px;
border-bottom: 2px solid var(--beige);

`
const Bottom = styled.div`
/* position: absolute;
bottom: 0; */
width: 100%; 
padding: 15px 5px;
border-top: 2px solid var(--beige);
`
const ButtonStyle = styled(Button)`
    margin: 0 20px 0 auto;
    display: block;
`
const FormContainer = styled.form`
padding: 40px 30px;
overflow-y: scroll;
height: 500px;
@media(max-width: 600px){
    padding: 40px 10px;
}
`
const Label = styled.label`
margin-bottom: -5px;
display: inline-block;
`
const InputContainer = styled.div`
margin-bottom: 30px;
`

const CheckBox = styled(Input)`
    position: relative;
    top: 4px;
    height: 20px;
    display: inline-block;
    width: 20px;
    margin: 30px 10px 0 5px;
    border-radius: 8px;
    border: 1px solid var(--lightGrey);
`
const MediumTitleStyle = styled(MediumTitle)`
margin: 0;
cursor: pointer; 
`
const IconStyle = styled(FontAwesomeIcon)`
position: absolute;
right: 18px;
top: 18px;
font-size: 1.7rem;
color: var(--darkGrey);
cursor: pointer;
`