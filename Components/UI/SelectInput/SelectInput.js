import React, { useState } from 'react'
import styled from 'styled-components'
function SelectInput(props) {
    const options = props.options.map(item => {
        return (
            <option key={item.title} value={item.title}>{item.title}</option>
        )
    })

    return (
        <React.Fragment>
            {props.defaultValue ?
                <Select defaultValue={props.defaultValue} name={props.name} onChange={props.onChange} >
                    {options}
                </Select>

                :
                null
            }
        </React.Fragment>

    )
}

export default SelectInput
const Select = styled.select`
width: 100%;
display: block;
height: 45px;
border: 2px solid #ddd;
outline: none;
color: var(--darkGrey);
margin: 10px 0 0 0;
  padding: 0 5px 0 5px;
  border-radius:10px;
  background: var(--offWhite);
`
