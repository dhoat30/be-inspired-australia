import React from 'react'
import styled from 'styled-components'

function BackdropSection(props) {
    return (
        <React.Fragment>
            {props.show ? <Container onClick={props.clicked}>
            </Container> : null}
        </React.Fragment>
    )
}

export default BackdropSection

const Container = styled.div`

  width: 100%;
  position: fixed;
  background: rgba(0, 0, 0, 0.5);
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 1;

`
