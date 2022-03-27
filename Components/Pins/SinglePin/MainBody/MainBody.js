import React from 'react'
import styled from 'styled-components'
import Anchor from '../../../UI/Anchor/Anchor'
import AuthorMeta from '../../../UI/AuthorMeta/AuthorMeta'
import Paragraph from '../../../UI/Titles/Paragraph/Paragraph'
import SectionTitle from '../../../UI/Titles/Titles/SectionTitle'
function MainBody(props) {
    const lower = props.pinData.title.toLowerCase();
    let pinTitle = lower.charAt(0).toUpperCase() + lower.slice(1);

    return (
        <Container>
            {props.pinData.website ? <Anchor href={props.pinData.website}>{props.pinData.website.replace(/(^\w+:|^)\/\//, '')}</Anchor>
                : null}
            <SectionTitle dangerouslySetInnerHTML={{ __html: pinTitle }}></SectionTitle>
            <Paragraph>{props.pinData.description}</Paragraph>
            <AuthorMeta
                authorUserName={props.pinData.authorMeta.username}
                authorFirstName={props.pinData.authorMeta.firstName}
                profileImage={props.pinData.authorMeta.profileImage}
                company={props.pinData.authorMeta.company}
                userRole={props.pinData.authorMeta.userRole[0]}
                tradeID={props.pinData.tradeProfessionalID}
                slug={props.pinData.authorMeta.slug}
            />
        </Container>
    )
}

export default MainBody

const Container = styled.div`
margin: 20px 0;
`