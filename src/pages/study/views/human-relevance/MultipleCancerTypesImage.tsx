import React, { useState } from 'react';
import styled from '@emotion/styled';
import humanSkeletonImage from './assets/human-skeleton.jpg';

export interface MultipleCancerTypesImageProps {
  caption?: string;
  alt?: string;
}

const FigureContainer = styled.figure`
  margin: 0;
  padding: 0;
  width: 100%;
`;

const ContentWrapper = styled.div`
  display: flex;
  background: #000000;
  position: relative;
  align-items: center;
  justify-content: space-evenly;
  min-height: 644px;
`;

const ImageContainer = styled.div`
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 583px;
  height: 644px;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    display: block;
  }
`;

const HotspotsOverlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
`;

const Hotspot = styled.div<{ isActive: boolean; top: string; left: string }>`
  position: absolute;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${props =>
    props.isActive ? '#ffffff' : 'rgba(255, 255, 255, 0.6)'};
  border: 2px solid ${props => (props.isActive ? '#ffffff' : 'transparent')};
  box-shadow: ${props =>
    props.isActive
      ? '0 0 12px rgba(255, 255, 255, 0.8)'
      : '0 0 6px rgba(255, 255, 255, 0.4)'};
  top: ${props => props.top};
  left: ${props => props.left};
  transform: translate(-50%, -50%);
  transition: all 0.2s ease-in-out;
  pointer-events: all;
  cursor: pointer;

  &:hover {
    background-color: #ffffff;
    border-color: #ffffff;
    box-shadow: 0 0 12px rgba(255, 255, 255, 0.8);
    transform: translate(-50%, -50%) scale(1.3);
  }
`;

const Tooltip = styled.div<{ show: boolean; top: string; left: string }>`
  position: absolute;
  top: ${props => props.top};
  left: ${props => props.left};
  transform: translate(-50%, calc(-100% - 15px));
  background-color: rgba(0, 0, 0, 0.9);
  color: #ffffff;
  padding: 8px 12px;
  border-radius: 4px;
  font-family: 'Open Sans', sans-serif;
  font-size: calc((14 / 16) * 1rem);
  font-weight: 500;
  white-space: nowrap;
  pointer-events: none;
  opacity: ${props => (props.show ? 1 : 0)};
  visibility: ${props => (props.show ? 'visible' : 'hidden')};
  transition: opacity 0.2s ease-in-out, visibility 0.2s ease-in-out;
  z-index: 1000;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);

  &::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border-width: 6px;
    border-style: solid;
    border-color: rgba(0, 0, 0, 0.9) transparent transparent transparent;
  }
`;

const CancerTypesList = styled.div`
  flex: 0 0 300px;
  background: #000000;
  padding: 40px 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
`;

const CancerTypeItem = styled.div<{ isActive: boolean }>`
  color: ${props => (props.isActive ? '#ffffff' : 'rgba(255, 255, 255, 0.8)')};
  font-family: 'Open Sans', sans-serif;
  font-size: calc((16 / 16) * 1rem);
  font-weight: ${props => (props.isActive ? '600' : '400')};
  line-height: 1.5;
  padding: 8px 12px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  border-left: 3px solid transparent;

  &:hover {
    color: #ffffff;
    font-weight: 600;
    border-left-color: #ffffff;
    background: rgba(255, 255, 255, 0.05);
  }
`;

const Caption = styled.figcaption`
  background: hsla(200, 84%, 23%, 1);
  color: hsla(0, 0%, 100%, 1);
  text-align: center;
  margin-top: -8px;
  font-family: 'Open Sans';
  font-weight: 400;
  font-style: italic;
  font-size: calc((14 / 16) * 1rem);
  line-height: 2;
  padding: 16px;
`;

interface CancerType {
  name: string;
  position: { top: string; left: string };
}

const CANCER_TYPES: CancerType[] = [
  { name: 'B Cell Lymphoma', position: { top: '14%', left: '52%' } },
  { name: 'Bladder Cancer', position: { top: '54%', left: '50%' } },
  { name: 'Fibrosarcoma', position: { top: '64%', left: '36%' } },
  { name: 'Hemangiosarcoma', position: { top: '48%', left: '40%' } },
  { name: 'Histiocytic Sarcoma', position: { top: '40%', left: '58%' } },
  { name: 'Lipoma', position: { top: '52%', left: '64%' } },
  { name: 'Lymphoma', position: { top: '26%', left: '54%' } },
  { name: 'Mammary Cancer', position: { top: '34%', left: '44%' } },
  { name: 'Mast Cell Tumor', position: { top: '60%', left: '42%' } },
  { name: 'Melanoma', position: { top: '92%', left: '50%' } },
  { name: 'Osteosarcoma', position: { top: '80%', left: '54%' } },
  { name: 'Soft Tissue Sarcoma', position: { top: '70%', left: '60%' } },
  { name: 'Splenic Hemosarcoma', position: { top: '36%', left: '38%' } },
  { name: 'T Cell Leukemia', position: { top: '20%', left: '56%' } },
  { name: 'Thyroid Cancer', position: { top: '10%', left: '50%' } },
];

export const MultipleCancerTypesImage: React.FC<
  MultipleCancerTypesImageProps
> = ({ caption, alt }) => {
  const [activeCancerType, setActiveCancerType] = useState<string | null>(null);
  const [hoveredHotspot, setHoveredHotspot] = useState<string | null>(null);

  const handleCancerTypeClick = (cancerType: string) => {
    setActiveCancerType(cancerType === activeCancerType ? null : cancerType);
  };

  const handleHotspotClick = (cancerType: string) => {
    setActiveCancerType(cancerType === activeCancerType ? null : cancerType);
  };

  const handleHotspotMouseEnter = (cancerType: string) => {
    setActiveCancerType(cancerType);
    setHoveredHotspot(cancerType);
  };

  const handleHotspotMouseLeave = () => {
    setActiveCancerType(null);
    setHoveredHotspot(null);
  };

  return (
    <FigureContainer className="relevance-figure multiple-cancer-types">
      <ContentWrapper>
        <ImageContainer>
          <ImageWrapper>
            <img
              src={humanSkeletonImage}
              alt={
                alt ||
                'Human body diagram showing various cancer sites including B Cell Lymphoma, Bladder Cancer, Fibrosarcoma, Hemangiosarcoma, Histiocytic Sarcoma, Lipoma, Lymphoma, Mammary Cancer, Mast Cell Tumor, Melanoma, Osteosarcoma, Soft Tissue Sarcoma, Splenic Hemosarcoma, T Cell Leukemia, and Thyroid Cancer'
              }
              className="relevance-image"
            />
            <HotspotsOverlay>
              {CANCER_TYPES.map(cancerType => (
                <React.Fragment key={cancerType.name}>
                  <Hotspot
                    isActive={activeCancerType === cancerType.name}
                    top={cancerType.position.top}
                    left={cancerType.position.left}
                    onClick={() => handleHotspotClick(cancerType.name)}
                    onMouseEnter={() => handleHotspotMouseEnter(cancerType.name)}
                    onMouseLeave={handleHotspotMouseLeave}
                  />
                  <Tooltip
                    show={hoveredHotspot === cancerType.name}
                    top={cancerType.position.top}
                    left={cancerType.position.left}
                  >
                    {cancerType.name}
                  </Tooltip>
                </React.Fragment>
              ))}
            </HotspotsOverlay>
          </ImageWrapper>
        </ImageContainer>
        <CancerTypesList>
          {CANCER_TYPES.map(cancerType => (
            <CancerTypeItem
              key={cancerType.name}
              isActive={activeCancerType === cancerType.name}
              onClick={() => handleCancerTypeClick(cancerType.name)}
              onMouseEnter={() => {
                setActiveCancerType(cancerType.name);
                setHoveredHotspot(null);
              }}
              onMouseLeave={() => {
                setActiveCancerType(null);
                setHoveredHotspot(null);
              }}
            >
              {cancerType.name}
            </CancerTypeItem>
          ))}
        </CancerTypesList>
      </ContentWrapper>
      {caption && <Caption className="relevance-caption">{caption}</Caption>}
    </FigureContainer>
  );
};

export default MultipleCancerTypesImage;
