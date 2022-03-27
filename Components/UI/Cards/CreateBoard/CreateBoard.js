import React, { useState, useContext } from 'react'
import styled from 'styled-components'
import Button from '../../Button/Button'
import Input from '../../Input/Input'
import Errors from '../../Notifications/Errors/Errors'
import MediumTitle from '../../Titles/Titles/MediumTitle'
import AuthContext from '../../../../store/auth-context'
import { useRouter } from 'next/router'

function CreateBoard({ token }) {
    const [enteredName, setEnteredName] = useState('')
    const [enteredNameTouched, setEnteredNameTouched] = useState(false)
    const [enteredStatus, setEnteredStatus] = useState("publish")
    const enteredNameIsValid = enteredName.length > 1
    const enteredNameIsInvalid = !enteredNameIsValid && enteredNameTouched

    const router = useRouter()
    // auth context 
    const authCtx = useContext(AuthContext)
    const nameChangeHandler = (e) => {
        setEnteredName(e.target.value)
    }

    const nameBlurHandler = (e) => {
        setEnteredNameTouched(true)
    }
    const publishChangeHandler = (e) => {
        setEnteredStatus(enteredStatus === "publish" ? "private" : "publish")
    }


    const submitHandler = (e) => {
        e.preventDefault()
        const body = {
            boardName: enteredName,
            status: enteredStatus,
            token: authCtx.token
        }
        fetch('/home/api/boards/create-board', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
            .then(res => res.json())
            .then(res => {
                if (!res.data.code) {
                    router.reload(window.location.pathname)
                }
                else {
                    console.log(res.data.code)
                }
            })
            .catch(err => console.log(err))
    }
    return (
        <Container>
            <MediumTitle align="center">Create Board </MediumTitle>
            <FormContainer onSubmit={submitHandler}>
                <Label htmlFor="name">Name</Label>
                <Input
                    type="text"
                    placeholder='Like "Bedroom Furniture" or "Design Ideas" '
                    inputChange={nameChangeHandler}
                    blurChange={nameBlurHandler}
                    isInvalid={enteredNameIsInvalid}
                    value={enteredName}
                />
                <CheckBox
                    type="checkbox"
                    inputChange={publishChangeHandler}
                    value={enteredStatus}
                />
                <Label>Keep this board secret.</Label>
                {enteredNameIsInvalid ? <Errors>Please enter the board name.</Errors> : null}

                <ButtonStyle> Save</ButtonStyle>
            </FormContainer>
        </Container>
    )
}

export default CreateBoard
const Container = styled.div`
    position: fixed;
   max-width: 500px;
   width: 95%;
   min-height: 200px;
   margin: 0 auto;
   background: white;
   border-radius: var(--cardBorderRadius);
   box-shadow: var(--boxShadow);
   top: 50%;
   left: 50%;
   transform: translate(-50%, -50%);
    padding: 30px 20px;
    z-index: 10;
`

const FormContainer = styled.form`
    margin: 20px 0 0 0;
`
const Label = styled.label`
margin-bottom: -5px;
display: inline-block;
`
const ButtonStyle = styled(Button)`
margin: 20px 0 0 auto;
display: block;
padding: 10px 30px;
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