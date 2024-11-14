import React from 'react';
import {
  Container,
  DescriptionAndPhotoContainer,
  DescriptionContainer,
  DescriptionTitle,
  PhotoContainer,
  Photo,
  Description,
} from './photo-view.styled';
import { Program } from '../../../generated-types/types';

interface PhotoAndVideoViewProps {
  programDetail: Program;
  programImage: string;
}

export const PhotoAndVideoView: React.FC<PhotoAndVideoViewProps> = ({
  programDetail,
  programImage,
}) => {
  return (
    <Container>
      <DescriptionAndPhotoContainer>
        <DescriptionContainer>
          <DescriptionTitle>OVERVIEW</DescriptionTitle>
          <Description>{programDetail.program_full_description}</Description>
        </DescriptionContainer>
        <PhotoContainer>
          <Photo src={programImage} alt="program image" />
        </PhotoContainer>
      </DescriptionAndPhotoContainer>
    </Container>
  );
};

export default PhotoAndVideoView;
