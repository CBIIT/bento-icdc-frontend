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

const EnhancedTooltip = styled.div<{ show: boolean; top: string; left: string }>`
  position: absolute;
  top: ${props => props.top};
  left: ${props => props.left};
  transform: translate(-50%, calc(-100% - 20px));
  background-color: #000000;
  color: #ffffff;
  border-radius: 8px;
  border: 2px solid #ff6b35;
  font-family: 'Open Sans', sans-serif;
  pointer-events: none;
  opacity: ${props => (props.show ? 1 : 0)};
  visibility: ${props => (props.show ? 'visible' : 'hidden')};
  transition: opacity 0.2s ease-in-out, visibility 0.2s ease-in-out;
  z-index: 1000;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.6), 0 0 20px rgba(255, 107, 53, 0.3);
  min-width: 420px;
  max-width: 500px;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border-width: 10px;
    border-style: solid;
    border-color: #ff6b35 transparent transparent transparent;
  }
`;

const TooltipHeader = styled.div`
  padding: 10px 16px;
  background: linear-gradient(135deg, rgba(0, 100, 180, 0.4) 0%, rgba(0, 60, 120, 0.4) 100%);
  border-bottom: 1px solid rgba(255, 107, 53, 0.5);
  font-size: calc((15 / 16) * 1rem);
  font-weight: 600;
  letter-spacing: 0.02em;
  color: #ffffff;
`;

const TooltipContent = styled.div`
  padding: 12px;
  display: flex;
  gap: 8px;
  align-items: stretch;
  justify-content: space-between;
  background-color: #000000;
`;

const TooltipImageWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TooltipImage = styled.img`
  width: 100%;
  height: 140px;
  object-fit: contain;
  border-radius: 4px;
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
  studyCode: string;
  position: { top: string; left: string };
  images: {
    human: string;
    canine: string;
  };
}

// Placeholder image - will be replaced with actual X-ray images
const placeholderImage = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="140"%3E%3Crect fill="%231a2a3a" width="200" height="140"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="%236495ed" font-family="Open Sans" font-size="12"%3EPlaceholder Image%3C/text%3E%3C/svg%3E';

const CANCER_TYPES: CancerType[] = [
  {
    name: 'B Cell Lymphoma',
    studyCode: 'TCL01',
    position: { top: '14%', left: '52%' },
    images: { human: placeholderImage, canine: placeholderImage },
  },
  {
    name: 'Bladder Cancer',
    studyCode: 'TCL01',
    position: { top: '54%', left: '50%' },
    images: { human: placeholderImage, canine: placeholderImage },
  },
  {
    name: 'Fibrosarcoma',
    studyCode: 'TCL01',
    position: { top: '64%', left: '36%' },
    images: { human: placeholderImage, canine: placeholderImage },
  },
  {
    name: 'Hemangiosarcoma',
    studyCode: 'TCL01',
    position: { top: '48%', left: '40%' },
    images: { human: placeholderImage, canine: placeholderImage },
  },
  {
    name: 'Histiocytic Sarcoma',
    studyCode: 'TCL01',
    position: { top: '40%', left: '58%' },
    images: { human: placeholderImage, canine: placeholderImage },
  },
  {
    name: 'Lipoma',
    studyCode: 'TCL01',
    position: { top: '52%', left: '64%' },
    images: { human: placeholderImage, canine: placeholderImage },
  },
  {
    name: 'Lymphoma',
    studyCode: 'TCL01',
    position: { top: '26%', left: '54%' },
    images: { human: placeholderImage, canine: placeholderImage },
  },
  {
    name: 'Mammary Cancer',
    studyCode: 'TCL01',
    position: { top: '34%', left: '44%' },
    images: { human: placeholderImage, canine: placeholderImage },
  },
  {
    name: 'Mast Cell Tumor',
    studyCode: 'TCL01',
    position: { top: '60%', left: '42%' },
    images: { human: placeholderImage, canine: placeholderImage },
  },
  {
    name: 'Melanoma',
    studyCode: 'TCL01',
    position: { top: '92%', left: '50%' },
    images: { human: placeholderImage, canine: placeholderImage },
  },
  {
    name: 'Osteosarcoma',
    studyCode: 'TCL01',
    position: { top: '80%', left: '54%' },
    images: { human: placeholderImage, canine: placeholderImage },
  },
  {
    name: 'Soft Tissue Sarcoma',
    studyCode: 'TCL01',
    position: { top: '70%', left: '60%' },
    images: { human: placeholderImage, canine: placeholderImage },
  },
  {
    name: 'Splenic Hemosarcoma',
    studyCode: 'TCL01',
    position: { top: '36%', left: '38%' },
    images: { human: placeholderImage, canine: placeholderImage },
  },
  {
    name: 'T Cell Leukemia',
    studyCode: 'TCL01',
    position: { top: '20%', left: '56%' },
    images: { human: placeholderImage, canine: placeholderImage },
  },
  {
    name: 'Thyroid Cancer',
    studyCode: 'TCL01',
    position: { top: '10%', left: '50%' },
    images: { human: placeholderImage, canine: placeholderImage },
  },
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
                  <EnhancedTooltip
                    show={hoveredHotspot === cancerType.name}
                    top={cancerType.position.top}
                    left={cancerType.position.left}
                  >
                    <TooltipHeader>
                      {cancerType.studyCode}: {cancerType.name}
                    </TooltipHeader>
                    <TooltipContent>
                      <TooltipImageWrapper>
                        <TooltipImage
                          src={cancerType.images.human}
                          alt={`Human anatomy - ${cancerType.name}`}
                        />
                      </TooltipImageWrapper>
                      <TooltipImageWrapper>
                        <TooltipImage
                          src={cancerType.images.canine}
                          alt={`Canine model - ${cancerType.name}`}
                        />
                      </TooltipImageWrapper>
                    </TooltipContent>
                  </EnhancedTooltip>
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
