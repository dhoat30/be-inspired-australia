import React from 'react'
import * as styles from './HomeGallery.module.css';
import Image from 'next/image'
import styled from 'styled-components';
function HomeGallery({ pinsData }) {
  // const secondData = useStaticQuery(querySecond)
  const firstColumn = pinsData.map(item => {
    if (!item.gallery[0]) {
      return null;
    }
    return (
      <ImageStyle
        key={item.id}
        src={item.gallery[0].url}
        width="235px"
        height="350px" layout="fixed"
        alt={item.title}
      />
    )
  })
  function shuffle(array) {
    var currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array.map(item => {
      if (!item.gallery[0]) {
        return null;
      }
      return (
        <ImageStyle
          alt={item.title}
          key={item.id} src={item.gallery[0].url} width="235px" height="350px" layout="fixed" />
      )
    });
  }

  const secondShuffle = shuffle(pinsData)
  const thirdShuffle = shuffle(pinsData)
  const fourthShuffle = shuffle(pinsData)
  const fifthShuffle = shuffle(pinsData)
  const sixthShuffle = shuffle(pinsData)
  const seventhShuffle = shuffle(pinsData)
  const eighthShuffle = shuffle(pinsData)

  return (
    <React.Fragment>
      <Container className={`flex-row justify-center ${styles.galleryContainer}`}>
        <Column>
          {firstColumn}
        </Column>
        <Column>
          {secondShuffle}
        </Column>
        <Column>
          {thirdShuffle}
        </Column>
        <Column>
          {fourthShuffle}
        </Column>
        <Column>
          {fifthShuffle}
        </Column>
        <Column>
          {sixthShuffle}
        </Column>
        <Column>
          {seventhShuffle}
        </Column>


      </Container>
    </React.Fragment>
  )
}

export default HomeGallery
const ImageStyle = styled(Image)`
object-fit: cover;
border-radius: var(--cardBorderRadius);
`
const Container = styled.div`
gap: 15px; 
width: 100%;
`
const Column = styled.div`
display: flex;
flex-direction: column;
gap: 15px; 
`