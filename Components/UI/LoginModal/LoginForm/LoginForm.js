import React, { useState, useContext, useEffect } from 'react'
import Input from '../../Input/Input';
import Errors from '../../Notifications/Errors/Errors';
import Button from '../../Button/Button'
import axios from 'axios'
import styled from 'styled-components';
import ModalContext from '../../../../store/modal-context';
import { useRouter } from 'next/router';
import LoadingOverlay from '../../LoadingOverlay/LoadingOverlay';
import GoogleButton from '../../Button/SocialButtons/GoogleButton';
import MediumTitle from '../../Titles/Titles/MediumTitle';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import FacebookButton from '../../Button/SocialButtons/FacebookButton';
import cookie from 'cookie'

function RegisterForm(props) {
    const router = useRouter()
    const modalCtx = useContext(ModalContext)

    // submission error
    const [submissionError, setSubmissionError] = useState('')
    const [loading, setLoading] = useState(false)
    // email states
    const [email, setEmail] = useState('')
    const [enteredEmailTouched, setEnteredEmailTouched] = useState(false)

    // password states 
    const [enteredPassword, setEnteredPassword] = useState('')
    const [enteredPasswordTouched, setEnteredPasswordTouched] = useState(false)

    // validate email
    var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    let enteredEmailIsValid = pattern.test(email)
    const emailInputIsInvalid = !enteredEmailIsValid && enteredEmailTouched

    // validate password 
    let enteredPasswordIsValid = enteredPassword.length >= 8; //reg.test(enteredPasswordTouched)
    const passwordInputIsInvalid = !enteredPasswordIsValid && enteredPasswordTouched


    const emailChangeHandler = (event) => {
        setEmail(event.target.value)
    }
    const passwordChangeHandler = (event) => {
        setEnteredPassword(event.target.value)
    }

    const emailBlurHandler = (event) => {
        setEnteredEmailTouched(true)
    }
    const passwordBlurHandler = (event) => {
        setEnteredPasswordTouched(true)
    }

    // form submission
    async function formSubmissionHandler(event) {
        event.preventDefault()
        setEnteredEmailTouched(true)
        setEnteredPasswordTouched(true)
        if (!enteredEmailIsValid || !enteredPasswordIsValid) {
            return
        }
        setLoading(true)
        setSubmissionError("")
        console.log("sending the login request")


        axios.post("/home/api/login",
            {
                username: email,
                password: enteredPassword
            }).then(response => {
                if (response.data.status === 401) {
                    setSubmissionError("Username or password is invalid. Please try again.")
                }
                else {
                    console.log(response)
                    router.reload()
                }
                setLoading(false)
            }).catch(err => {
                console.log(err)
                setLoading(false)
            })
    }

    // hide modal 
    const cancelHandler = () => {
        modalCtx.hideLoginModal()
    }

    const responseGoogle = (response) => {
        console.log(response)
        axios.post("/home/api/socialLogin",
            {
                userLogin: response.profileObj.googleId,
                email: response.profileObj.email,
                givenName: response.profileObj.givenName,
                familyName: response.profileObj.familyName,
                imageUrl: response.profileObj.imageUrl
            }).then(response => {
                console.log(response.data.data)
                setLoading(true)
                if (response.status === 201) {
                    console.log("sending log in request")
                    loginApiHandler(response.data.data.email, response.data.data.password)

                }
                // router.push('/pins')

            }).catch(err => {
                setSubmissionError(err.response.data.message)
                setLoading(false)
            })
    }
    // facebook login 
    const responseFacebook = (response) => {
        console.log(response)
        axios.post("/home/api/socialLogin",
            {
                userLogin: response.id,
                email: response.email,
                name: response.name
            }).then(response => {
                console.log(response.data.data)
                setLoading(true)
                if (response.status === 201) {
                    console.log("sending log in request")
                    loginApiHandler(response.data.data.email, response.data.data.password)

                }
                // router.push('/pins')

            }).catch(err => {
                setSubmissionError(err.response.data.message)
                setLoading(false)
            })
    }


    const loginApiHandler = (email, password) => {

        axios.post("/home/api/login",
            {
                username: email,
                password: password
            }).then(response => {
                if (response.data.status === 401) {
                    setSubmissionError("Username or password is invalid. Please try again.")
                }
                else {
                    console.log(response)
                    router.reload()
                }
                setLoading(false)
            }).catch(err => {
                console.log(err)
                setLoading(false)
            })

    }
    return (
        <Container className={props.className}>
            <LoadingOverlay show={loading} />
            <Form onSubmit={formSubmissionHandler}>
                <Input
                    type="email"
                    placeholder="Email"
                    name="email"
                    blurChange={emailBlurHandler}
                    inputChange={emailChangeHandler}
                    isInvalid={emailInputIsInvalid}
                    value={email} />
                {emailInputIsInvalid ? <Errors>Entered email address is not valid</Errors> : null}

                <Input
                    type="password"
                    placeholder="Enter your password"
                    name="password"
                    inputChange={passwordChangeHandler}
                    blurChange={passwordBlurHandler}
                    isInvalid={passwordInputIsInvalid}
                    value={enteredPassword}
                />
                {passwordInputIsInvalid ? <Errors>Your password must be at least 8 characters long. </Errors> : null}
                {submissionError ? <Errors>{submissionError} </Errors> : null}
                <ButtonStyle>Log in</ButtonStyle>

                <MediumTitle align="center">Or</MediumTitle>
                {/* google login  */}

            </Form>

            <GoogleLogin
                clientId={process.env.googleClientId}
                buttonText="Log in with Google"
                render={renderProps => (
                    <GoogleButton onClick={renderProps.onClick} disabled={renderProps.disabled}>This is my custom Google button</GoogleButton>
                )}
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
            />

            <FacebookLogin
                appId={process.env.facebookAppID}
                autoLoad={false}
                fields="name,email,picture"
                callback={responseFacebook}
                render={renderProps => (
                    <FacebookButton onClick={renderProps.onClick} />
                )}
            />
            <a rel="noreferrer" href="https://inspiry.co.nz/account-profile/lost-password" target="_blank">Forgot your password?</a>
            {!props.hideCancelButton && <Cancel onClick={cancelHandler}>Cancel</Cancel>}

        </Container>
    )
}


export default RegisterForm
const Container = styled.div`
width: 95%;
  max-width: 270px;
`
const Form = styled.form`
 
`

const ButtonStyle = styled(Button)`
width: 100%;
margin-top: 20px;
`

const Cancel = styled.div`
text-align: center;
margin-top: 10px;
cursor: pointer;
&:hover{
    text-decoration: underline; 
}
`
