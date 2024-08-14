import React from "react";
import { Container, DescriptionAndPhotoContainer, DescriptionContainer, DescriptionTitle, PhotoContainer, Photo, VideoContainer, Description, VideoTitle } from "./photo-view.styled";

export const PhotoAndVideoView = ({programDetail, programImage, programVideo}) => {

    return (
        <Container>
            <DescriptionAndPhotoContainer>
              <DescriptionContainer>
                <DescriptionTitle>OVERVIEW</DescriptionTitle>
                <Description>{programDetail.program_full_description}</Description>
              </DescriptionContainer>
                <PhotoContainer><Photo src={programImage} alt="program image"/></PhotoContainer>
            </DescriptionAndPhotoContainer>
          </Container>
    )
}

export default PhotoAndVideoView;