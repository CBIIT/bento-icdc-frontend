import React, { useState, useRef, useEffect } from 'react';
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
  align-items: stretch;
  justify-content: space-between;
  min-height: 644px;
  overflow: visible;
`;

const ImageContainer = styled.div`
  flex: 0 0 583px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  position: relative;
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
  z-index: 20;
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

const DetailPanel = styled.div<{ show: boolean }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  background-color: #000000;
  opacity: ${props => (props.show ? 1 : 0.3)};
  transition: opacity 0.3s ease-in-out;
  position: relative;
`;

const ConnectorLinesContainer = styled.svg<{ show: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  opacity: ${props => (props.show ? 1 : 0)};
  transition: opacity 0.3s ease-in-out;
  z-index: 10;
`;

const DetailCard = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
  position: relative;
  z-index: 15;
`;

const DetailPanelHeader = styled.div`
  padding: 16px 24px;
  background: linear-gradient(
    135deg,
    rgba(0, 100, 180, 0.4) 0%,
    rgba(0, 60, 120, 0.4) 100%
  );
  border: 2px solid #ff6b35;
  border-radius: 8px 8px 0 0;
  font-size: calc((16 / 16) * 1rem);
  font-weight: 600;
  letter-spacing: 0.02em;
  color: #ffffff;
  text-align: center;
  font-family: 'Open Sans', sans-serif;
  width: 100%;
`;

const DetailPanelContent = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  background-color: #000000;
  border: 2px solid #ff6b35;
  border-top: none;
  border-radius: 0 0 8px 8px;
  width: 100%;
  box-shadow:
    0 4px 16px rgba(0, 0, 0, 0.6),
    0 0 20px rgba(255, 107, 53, 0.3);
`;

const DetailImageRow = styled.div`
  display: flex;
  gap: 12px;
  width: 100%;
  justify-content: center;
`;

const DetailImageWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

const DetailImageLabel = styled.div`
  font-family: 'Open Sans', sans-serif;
  font-size: calc((12 / 16) * 1rem);
  font-weight: 600;
  color: rgba(255, 255, 255, 0.8);
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const DetailImage = styled.img`
  width: 100%;
  max-width: 180px;
  height: 140px;
  object-fit: contain;
  border-radius: 4px;
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const EmptyState = styled.div`
  color: rgba(255, 255, 255, 0.5);
  font-family: 'Open Sans', sans-serif;
  font-size: calc((14 / 16) * 1rem);
  font-style: italic;
  text-align: center;
  padding: 40px 20px;
`;

const CancerTypesList = styled.div`
  flex: 0 0 280px;
  background: #000000;
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
  position: relative;
  z-index: 5;
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
  border-bottom: 1px solid
    ${props => (props.isActive ? '#ff0000' : 'rgba(255, 255, 255, 0.2)')};
  background: ${props =>
    props.isActive ? 'rgba(255, 107, 53, 0.1)' : 'transparent'};

  &:hover {
    color: #ffffff;
    font-weight: 600;
    background: rgba(255, 107, 53, 0.1);
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
const placeholderImage =
  'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="140"%3E%3Crect fill="%231a2a3a" width="200" height="140"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="%236495ed" font-family="Open Sans" font-size="12"%3EPlaceholder Image%3C/text%3E%3C/svg%3E';

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
  const [lineCoordinates, setLineCoordinates] = useState<{
    listToPanel: { x1: number; y1: number; x2: number; y2: number } | null;
    panelToHotspot: { x1: number; y1: number; x2: number; y2: number } | null;
  }>({ listToPanel: null, panelToHotspot: null });

  const contentWrapperRef = useRef<HTMLDivElement>(null);
  const detailPanelRef = useRef<HTMLDivElement>(null);
  const detailCardRef = useRef<HTMLDivElement>(null);
  const listItemRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const hotspotRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const handleCancerTypeInteraction = (cancerType: string) => {
    setActiveCancerType(cancerType);
  };

  const handleCancerTypeLeave = () => {
    setActiveCancerType(null);
  };

  const activeCancer = CANCER_TYPES.find(
    type => type.name === activeCancerType
  );

  useEffect(() => {
    if (
      !activeCancerType ||
      !contentWrapperRef.current ||
      !detailCardRef.current
    ) {
      setLineCoordinates({ listToPanel: null, panelToHotspot: null });
      return;
    }

    const wrapperRect = contentWrapperRef.current.getBoundingClientRect();
    const cardRect = detailCardRef.current.getBoundingClientRect();
    const listItem = listItemRefs.current[activeCancerType];
    const hotspot = hotspotRefs.current[activeCancerType];

    if (!listItem || !hotspot) {
      return;
    }

    const listItemRect = listItem.getBoundingClientRect();
    const hotspotRect = hotspot.getBoundingClientRect();

    // Calculate line from list item to detail card (left edge of list item to right edge of visual card)
    const listToPanel = {
      x1: listItemRect.left - wrapperRect.left,
      y1: listItemRect.bottom - wrapperRect.top - 1, // Bottom of list item (where red line is)
      x2: cardRect.right - wrapperRect.left,
      y2: cardRect.top + cardRect.height / 2 - wrapperRect.top, // Middle of visual card
    };

    // Calculate line from detail card to hotspot (left edge of visual card to center of hotspot)
    const panelToHotspot = {
      x1: cardRect.left - wrapperRect.left,
      y1: cardRect.top + cardRect.height / 2 - wrapperRect.top, // Middle of visual card
      x2: hotspotRect.left + hotspotRect.width / 2 - wrapperRect.left, // Center of hotspot
      y2: hotspotRect.top + hotspotRect.height / 2 - wrapperRect.top, // Center of hotspot
    };

    setLineCoordinates({ listToPanel, panelToHotspot });
  }, [activeCancerType]);

  return (
    <FigureContainer className="relevance-figure multiple-cancer-types">
      <ContentWrapper ref={contentWrapperRef}>
        <ConnectorLinesContainer
          show={!!activeCancer && !!lineCoordinates.listToPanel}
        >
          {lineCoordinates.listToPanel && (
            <line
              x1={lineCoordinates.listToPanel.x1}
              y1={lineCoordinates.listToPanel.y1}
              x2={lineCoordinates.listToPanel.x2}
              y2={lineCoordinates.listToPanel.y2}
              stroke="#ff0000"
              strokeWidth="2"
            />
          )}
          {lineCoordinates.panelToHotspot && (
            <line
              x1={lineCoordinates.panelToHotspot.x1}
              y1={lineCoordinates.panelToHotspot.y1}
              x2={lineCoordinates.panelToHotspot.x2}
              y2={lineCoordinates.panelToHotspot.y2}
              stroke="#ff0000"
              strokeWidth="2"
            />
          )}
        </ConnectorLinesContainer>

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
                <Hotspot
                  key={cancerType.name}
                  ref={el => (hotspotRefs.current[cancerType.name] = el)}
                  isActive={activeCancerType === cancerType.name}
                  top={cancerType.position.top}
                  left={cancerType.position.left}
                  onMouseEnter={() =>
                    handleCancerTypeInteraction(cancerType.name)
                  }
                  onMouseLeave={handleCancerTypeLeave}
                />
              ))}
            </HotspotsOverlay>
          </ImageWrapper>
        </ImageContainer>

        <DetailPanel ref={detailPanelRef} show={!!activeCancer}>
          {activeCancer ? (
            <DetailCard ref={detailCardRef}>
              <DetailPanelHeader>
                {activeCancer.studyCode}: {activeCancer.name}
              </DetailPanelHeader>
              <DetailPanelContent>
                <DetailImageRow>
                  <DetailImageWrapper>
                    <DetailImageLabel>Human</DetailImageLabel>
                    <DetailImage
                      src={activeCancer.images.human}
                      alt={`Human anatomy - ${activeCancer.name}`}
                    />
                  </DetailImageWrapper>
                  <DetailImageWrapper>
                    <DetailImageLabel>Canine</DetailImageLabel>
                    <DetailImage
                      src={activeCancer.images.canine}
                      alt={`Canine model - ${activeCancer.name}`}
                    />
                  </DetailImageWrapper>
                </DetailImageRow>
              </DetailPanelContent>
            </DetailCard>
          ) : (
            <EmptyState>
              Hover over a cancer type or hotspot to view details
            </EmptyState>
          )}
        </DetailPanel>

        <CancerTypesList>
          {CANCER_TYPES.map(cancerType => (
            <CancerTypeItem
              key={cancerType.name}
              ref={el => (listItemRefs.current[cancerType.name] = el)}
              isActive={activeCancerType === cancerType.name}
              onMouseEnter={() => handleCancerTypeInteraction(cancerType.name)}
              onMouseLeave={handleCancerTypeLeave}
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
