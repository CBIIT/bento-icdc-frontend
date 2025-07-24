import React, { useState } from 'react';
import styled from '@emotion/styled';

const RightSectionContainer = styled.div`
  width: 100%;
  max-width: 620px;
  display: flex;
  flex-direction: column;
`;

const VideoPlayer = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: 20px;
  overflow: hidden;
  background-color: #000;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);

  iframe {
    width: 100%;
    height: 100%;
    border: none;
  }
`;

const PlaylistContainer = styled.div`
  margin-top: 24px;
  position: relative;
`;

const PlaylistTitle = styled.h3`
  font-family: Lato;
  font-weight: 400;
  font-style: Regular;
  font-size: 13px;
  line-height: 18px;
  letter-spacing: 4%;
  text-transform: uppercase;
  color: #fff;
  margin: 0 0 12px 0;
`;

const Playlist = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  max-height: 220px;
  overflow-y: auto;
  position: relative;
  direction: rtl;
  padding-left: 10px;

  &::-webkit-scrollbar {
    width: 9px;
  }
  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: #c58c2b;
    border-radius: 4px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #e6a94a;
  }
`;

const PlaylistItem = styled.li`
  direction: ltr;
  display: flex;
  align-items: center;
  padding: 16px;
  background-color: #222222;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  color: #ffffff;
  font-family: 'Open Sans', sans-serif;
  font-weight: 600;
  font-size: 15px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  text-align: left; /* Explicitly align content to the left */

  & > span:first-of-type {
    flex-grow: 1;
  }

  &:hover {
    background-color: rgba(45, 48, 52, 0.8);
  }

  &.active {
    background-color: #0f2d6f;
  }

  &:last-child {
    border-bottom: none;
  }
`;

const PlayingNow = styled.span`
  font-size: 10px;
  font-weight: bold;
  color: #cceeff;
  text-transform: uppercase;
  margin-left: 16px;
  flex-shrink: 0;
`;

const VideoTitle = styled.span`
  font-family: Lato;
  font-weight: 700;
  font-style: Bold;
  font-size: 17px;
  line-height: 18px;
  letter-spacing: 0%;
`;

const videoData = [
  {
    id: 1,
    title:
      'NCI Cancer Research Data Commons – Harmonizing Research & Data Science for Better Clinical Outcomes',
    videoId: 'tk1nEX2gnqk',
  },
  {
    id: 2,
    title:
      'Unleashing Comparative Oncology: Cancer Moonshot Progress Video Series',
    videoId: 'Gpy3EWeYy3Y',
  },
  {
    id: 3,
    title: 'Purdue Expert: Cancer in Dogs',
    videoId: 'oVs7kXSzv3U',
  },
  {
    id: 4,
    title:
      'Keynote Presentation: A Comparative Approach to Oncology Drug Development: Integration of canine models',
    videoId: 'tU5N5jCZxcY',
  },
  {
    id: 5,
    title:
      'Molecular Oncology and Functional Genomics Lab - Dr. Dawn Duval Flint Animal Cancer Center',
    videoId: 'sHUvbPM8H7A',
  },
];

const VideoSpotlight = () => {
  const [currentVideo, setCurrentVideo] = useState(videoData[1]);

  return (
    <RightSectionContainer>
      <VideoPlayer>
        <iframe
          src={`https://www.youtube.com/embed/${currentVideo.videoId}?modestbranding=1&rel=0`}
          title={currentVideo.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </VideoPlayer>
      <PlaylistContainer>
        <PlaylistTitle>VIDEO SPOTLIGHTS</PlaylistTitle>
        <Playlist>
          {videoData.map(video => (
            <PlaylistItem
              key={video.id}
              onClick={() => setCurrentVideo(video)}
              className={currentVideo.id === video.id ? 'active' : ''}
            >
              <VideoTitle>{video.title}</VideoTitle>
              {currentVideo.id === video.id && (
                <PlayingNow>PLAYING NOW</PlayingNow>
              )}
            </PlaylistItem>
          ))}
        </Playlist>
      </PlaylistContainer>
    </RightSectionContainer>
  );
};

export default VideoSpotlight;
