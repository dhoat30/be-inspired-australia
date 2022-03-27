import React, { useState } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShareAlt, faTrashAlt } from '@fortawesome/pro-solid-svg-icons'

export default function EditModal({ onClickShare, onClickDelete, image }) {
    return (
        <EditContainer>
            <ListContainer>
                {!image &&
                    <ListItem onClick={onClickShare}> <IconStyle icon={faShareAlt} />Share</ListItem>
                }

                <ListItem onClick={onClickDelete}> <IconStyle icon={faTrashAlt} />Delete</ListItem>
            </ListContainer>
        </EditContainer>
    )
}

const EditContainer = styled.section`
    width: 200px; 
    height: auto;
    background: var(--offWhite);
    position: absolute;
    top: 5px;
    right: 5px;
    z-index: 10;

`
const ListContainer = styled.ul`
list-style:none; 
margin: 0;
padding :0 ;
`

const ListItem = styled.li`
padding: 10px 15px;
color: var(--darkGrey);
cursor: pointer;
&:hover{ 
    background: var(--beige);
}
`
const IconStyle = styled(FontAwesomeIcon)`
margin-right: 10px;
`