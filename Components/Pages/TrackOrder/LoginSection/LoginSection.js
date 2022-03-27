import React from 'react'
import LoginForm from '../../../UI/LoginModal/LoginForm/LoginForm'
import MediumTitle from '../../../UI/Titles/Titles/MediumTitle'
import styled from 'styled-components'
function LoginSection() {
    return (
        <Container>
            <MediumTitle>Sign in to view order history</MediumTitle>
            <LoginFormStyle hideCancelButton={true} />
        </Container>
    )
}

export default LoginSection
const Container = styled.div`
width: 100%;
max-width: 320px;
`
const LoginFormStyle = styled(LoginForm)`
    max-width: 100% !important;
    margin-top: 20px;
`