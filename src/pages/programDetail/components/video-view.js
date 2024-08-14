import React from "react";
import ReactPlayer from 'react-player'
import {
    Container,
    DescriptionContainer,
    DescriptionTitle,
    Description,
    VideoContainer
} from './video-view.styled';

export const VideoView = ({programDetail, programVideo}) => {
    return (
        <Container>
                <DescriptionContainer>
                    <DescriptionTitle>OVERVIEW</DescriptionTitle>
                    <Description>{programDetail.program_full_description}</Description>
                </DescriptionContainer>
                <VideoContainer>
                    {programVideo ? <ReactPlayer url={programVideo} width="506.33px" height="287px"/> : <span>No video available</span>}
                </VideoContainer>
        </Container>
    )
};

export default VideoView;