import React, { useState, useRef, useEffect, useMemo } from 'react';
import styled from '@emotion/styled';
import { CircularProgress } from '@mui/material';
import humanSkeletonImage from './assets/human-skeleton.jpg';

export interface MultipleCancerTypesImageProps {
  caption?: string;
  alt?: string;
  cancerTypes?: string[];
  cancerTypeToImageKey?: (_cancerType: string) => string | undefined;
  cancerTypeImages?: Record<
    string,
    { src: string; alt?: string; caption?: string }
  >;
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
  pointer-events: none;
  cursor: default;

  &:hover {
    background-color: #ffffff;
    border-color: #ffffff;
    box-shadow: 0 0 12px rgba(255, 255, 255, 0.8);
    transform: translate(-50%, -50%) scale(1.3);
  }
`;

const BodyGlow = styled.div`
  position: absolute;
  inset: 0;
  z-index: 10;
  pointer-events: none;
  opacity: 0.95;
  background:
    radial-gradient(
      ellipse 16% 10% at 50% 7%,
      hsla(18, 86%, 60%, 0.34),
      transparent 76%
    ),
    radial-gradient(
      ellipse 18% 28% at 35% 25%,
      hsla(18, 86%, 60%, 0.36),
      transparent 74%
    ),
    radial-gradient(
      ellipse 18% 28% at 65% 25%,
      hsla(18, 86%, 60%, 0.36),
      transparent 74%
    ),
    radial-gradient(
      ellipse 16% 34% at 28% 43%,
      hsla(18, 86%, 60%, 0.34),
      transparent 74%
    ),
    radial-gradient(
      ellipse 16% 34% at 72% 43%,
      hsla(18, 86%, 60%, 0.34),
      transparent 74%
    ),
    radial-gradient(
      ellipse 16% 20% at 24% 55%,
      hsla(18, 86%, 60%, 0.3),
      transparent 76%
    ),
    radial-gradient(
      ellipse 16% 20% at 76% 55%,
      hsla(18, 86%, 60%, 0.3),
      transparent 76%
    ),
    radial-gradient(
      ellipse 18% 34% at 39% 76%,
      hsla(18, 86%, 60%, 0.3),
      transparent 76%
    ),
    radial-gradient(
      ellipse 18% 34% at 61% 76%,
      hsla(18, 86%, 60%, 0.3),
      transparent 76%
    ),
    radial-gradient(
      ellipse 28% 46% at 50% 42%,
      hsla(18, 86%, 60%, 0.14),
      transparent 74%
    );
  filter: blur(18px);
`;

const BodyGlowLineAnchor = styled.div<{ top: string; left: string }>`
  position: absolute;
  top: ${props => props.top};
  left: ${props => props.left};
  width: 1px;
  height: 1px;
  pointer-events: none;
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
  padding: 12px 24px;
  background: hsla(213, 86%, 17%, 1);
  border: 2px solid hsla(18, 86%, 60%, 1);
  border-bottom: none;
  border-radius: 12px 12px 0 0;
  font-size: calc((15 / 16) * 1rem);
  font-weight: 700;
  line-height: 1;
  letter-spacing: 0;
  color: #ffffff;
  text-align: center;
  font-family: 'Nunito', sans-serif;
  white-space: nowrap;
  width: fit-content;
`;

const DetailPanelContent = styled.div`
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  background-color: #000000;
  border: 2px solid hsla(18, 86%, 60%, 1);
  border-radius: 0 16px 16px 16px;
  width: 100%;
  overflow: hidden;
  box-shadow:
    0 4px 16px rgba(0, 0, 0, 0.6),
    0 0 20px rgba(255, 107, 53, 0.3);
`;

const DetailImage = styled.img<{ isLoaded: boolean }>`
  width: 100%;
  max-width: none;
  height: auto;
  object-fit: contain;
  display: ${props => (props.isLoaded ? 'block' : 'none')};
`;

const SpinnerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 200px;
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
  color: ${props =>
    props.isActive ? 'hsla(18, 86%, 60%, 1)' : 'hsla(0, 0%, 100%, 1)'};
  font-family: 'Nunito', sans-serif;
  font-size: calc((15 / 16) * 1rem);
  font-weight: ${props => (props.isActive ? 700 : 500)};
  line-height: 1;
  letter-spacing: 0;
  padding: 8px 12px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  border-bottom: 1px solid
    ${props =>
      props.isActive ? 'hsla(18, 86%, 60%, 1)' : 'rgba(255, 255, 255, 0.2)'};
  background: ${props =>
    props.isActive ? 'rgba(255, 107, 53, 0.1)' : 'transparent'};

  &:hover {
    color: hsla(18, 86%, 60%, 1);
    font-weight: 700;
    background: rgba(255, 107, 53, 0.1);
  }
`;

interface CancerTypeDisplay {
  key: string;
  imageKey: string;
  name: string;
  position: { top: string; left: string };
}

type ConnectorLine = { x1: number; y1: number; x2: number; y2: number };

type LineCoordinates = {
  listToPanel: ConnectorLine | null;
  panelToHotspot: ConnectorLine | null;
};

const emptyLineCoordinates: LineCoordinates = {
  listToPanel: null,
  panelToHotspot: null,
};

const BODY_GLOW_LINE_ANCHOR = {
  top: '48%',
  left: '79%',
};

// Placeholder image - will be replaced with actual X-ray images
const placeholderImage =
  'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="140"%3E%3Crect fill="%231a2a3a" width="200" height="140"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="%236495ed" font-family="Open Sans" font-size="12"%3EPlaceholder Image%3C/text%3E%3C/svg%3E';

/**
 * Maps backend cancer type keys to display information
 * These are positioned on the human skeleton image for the interactive visualization
 */
const CANCER_TYPE_DISPLAY_INFO: Record<
  string,
  { name: string; position: { top: string; left: string } }
> = {
  bone: {
    name: 'Osteosarcoma',
    position: { top: '70%', left: '53%' },
  },
  bladder: {
    name: 'Bladder Cancer',
    position: { top: '50%', left: '49%' },
  },
  brain: {
    name: 'Brain Cancer (Glioma)',
    position: { top: '8%', left: '50%' },
  },
  breast: {
    name: 'Breast Cancer (Mammary)',
    position: { top: '26%', left: '44%' },
  },
  soft_tissue_sarcoma: {
    name: 'Soft Tissue Sarcoma',
    position: { top: '20%', left: '60%' },
  },
  thyroid: {
    name: 'Thyroid Cancer',
    position: { top: '17%', left: '49%' },
  },
  lymphoma: {
    name: 'Lymphoma',
    position: { top: '26%', left: '54%' },
  },
  melanoma: {
    name: 'Melanoma',
    position: { top: '26%', left: '54%' },
  },
  lung: {
    name: 'Lung Cancer',
    position: { top: '26%', left: '54%' },
  },
};

export const MultipleCancerTypesImage: React.FC<
  MultipleCancerTypesImageProps
> = ({
  caption: _caption,
  alt,
  cancerTypes = [],
  cancerTypeToImageKey,
  cancerTypeImages = {},
}) => {
  const [activeCancerType, setActiveCancerType] = useState<string | null>(null);
  const [imageLoaded, setImageLoaded] = useState<Record<string, boolean>>({});
  const [lineCoordinates, setLineCoordinates] =
    useState<LineCoordinates>(emptyLineCoordinates);

  const contentWrapperRef = useRef<HTMLDivElement>(null);
  const detailPanelRef = useRef<HTMLDivElement>(null);
  const detailCardRef = useRef<HTMLDivElement>(null);
  const listItemRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const hotspotRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const bodyGlowLineAnchorRef = useRef<HTMLDivElement>(null);

  // Map cancer type names to image keys and filter out unmapped types
  const relevantCancerTypes: CancerTypeDisplay[] = useMemo(
    () =>
      cancerTypes
        .map(cancerName => {
          const imageKey = cancerTypeToImageKey?.(cancerName);
          if (!imageKey || !(imageKey in CANCER_TYPE_DISPLAY_INFO)) {
            return null;
          }
          return {
            key: cancerName,
            imageKey,
            name: cancerName,
            position: CANCER_TYPE_DISPLAY_INFO[imageKey].position,
          };
        })
        .filter((item): item is CancerTypeDisplay => item !== null),
    [cancerTypeToImageKey, cancerTypes]
  );

  const getCancerImage = (imageKey: string) => {
    const imageData = cancerTypeImages[imageKey];
    return imageData?.src || placeholderImage;
  };

  const handleCancerTypeInteraction = (cancerName: string) => {
    setActiveCancerType(cancerName);
  };

  const handleCancerTypeLeave = () => {
    setActiveCancerType(null);
  };

  const activeCancer = relevantCancerTypes.find(
    type => type.key === activeCancerType
  );
  const usesBodyGlow = activeCancer?.imageKey === 'soft_tissue_sarcoma';
  const activeHotspotPosition =
    activeCancer && !usesBodyGlow
      ? CANCER_TYPE_DISPLAY_INFO[activeCancer.imageKey].position
      : null;

  useEffect(() => {
    if (
      !activeCancerType ||
      !contentWrapperRef.current ||
      !detailCardRef.current
    ) {
      setLineCoordinates(prev =>
        prev.listToPanel || prev.panelToHotspot ? emptyLineCoordinates : prev
      );
      return;
    }

    const wrapperRect = contentWrapperRef.current.getBoundingClientRect();
    const cardRect = detailCardRef.current.getBoundingClientRect();
    const listItem = listItemRefs.current[activeCancerType];

    const activeCancerData = relevantCancerTypes.find(
      ct => ct.key === activeCancerType
    );
    const imageKey = activeCancerData?.imageKey;
    const lineTarget = usesBodyGlow
      ? bodyGlowLineAnchorRef.current
      : imageKey
        ? hotspotRefs.current[imageKey]
        : null;

    if (!listItem || !lineTarget) {
      setLineCoordinates(prev =>
        prev.listToPanel || prev.panelToHotspot ? emptyLineCoordinates : prev
      );
      return;
    }

    const listItemRect = listItem.getBoundingClientRect();
    const lineTargetRect = lineTarget.getBoundingClientRect();

    // Calculate line from list item to detail card (left edge of list item to right edge of visual card)
    const listToPanel = {
      x1: listItemRect.left - wrapperRect.left,
      y1: listItemRect.bottom - wrapperRect.top - 1, // Bottom of list item (where red line is)
      x2: cardRect.right - wrapperRect.left,
      y2: cardRect.top + cardRect.height / 2 - wrapperRect.top, // Middle of visual card
    };

    // Calculate line from detail card to the hotspot, or to the soft-glow edge.
    const panelToHotspot = {
      x1: cardRect.left - wrapperRect.left,
      y1: cardRect.top + cardRect.height / 2 - wrapperRect.top, // Middle of visual card
      x2: lineTargetRect.left + lineTargetRect.width / 2 - wrapperRect.left,
      y2: lineTargetRect.top + lineTargetRect.height / 2 - wrapperRect.top,
    };

    setLineCoordinates({ listToPanel, panelToHotspot });
  }, [activeCancerType, relevantCancerTypes, usesBodyGlow]);

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
              alt={alt || 'Human body diagram showing various cancer sites'}
              className="relevance-image"
            />
            {usesBodyGlow && (
              <>
                <BodyGlow
                  aria-hidden="true"
                  data-testid="human-relevance-body-glow"
                />
                <BodyGlowLineAnchor
                  ref={bodyGlowLineAnchorRef}
                  aria-hidden="true"
                  data-testid="human-relevance-body-glow-line-anchor"
                  top={BODY_GLOW_LINE_ANCHOR.top}
                  left={BODY_GLOW_LINE_ANCHOR.left}
                />
              </>
            )}
            <HotspotsOverlay>
              {activeCancer && activeHotspotPosition && (
                <Hotspot
                  key={activeCancer.imageKey}
                  ref={el => {
                    hotspotRefs.current[activeCancer.imageKey] = el;
                  }}
                  data-testid="human-relevance-hotspot"
                  isActive
                  top={activeHotspotPosition.top}
                  left={activeHotspotPosition.left}
                />
              )}
            </HotspotsOverlay>
          </ImageWrapper>
        </ImageContainer>

        <DetailPanel ref={detailPanelRef} show={!!activeCancer}>
          {activeCancer ? (
            <DetailCard ref={detailCardRef}>
              <DetailPanelHeader>{activeCancer.name}</DetailPanelHeader>
              <DetailPanelContent>
                {!imageLoaded[activeCancer.imageKey] && (
                  <SpinnerContainer>
                    <CircularProgress
                      sx={{
                        color: 'hsla(18, 86%, 60%, 1)',
                      }}
                    />
                  </SpinnerContainer>
                )}
                <DetailImage
                  isLoaded={!!imageLoaded[activeCancer.imageKey]}
                  src={getCancerImage(activeCancer.imageKey)}
                  alt={
                    cancerTypeImages[activeCancer.imageKey]?.alt ||
                    `${activeCancer.name} comparison`
                  }
                  onLoad={() =>
                    setImageLoaded(prev => ({
                      ...prev,
                      [activeCancer.imageKey]: true,
                    }))
                  }
                />
              </DetailPanelContent>
            </DetailCard>
          ) : null}
        </DetailPanel>

        <CancerTypesList>
          {relevantCancerTypes.map(cancerType => (
            <CancerTypeItem
              key={cancerType.key}
              ref={el => {
                listItemRefs.current[cancerType.key] = el;
              }}
              isActive={activeCancerType === cancerType.key}
              onMouseEnter={() => handleCancerTypeInteraction(cancerType.key)}
              onMouseLeave={handleCancerTypeLeave}
            >
              {cancerType.name}
            </CancerTypeItem>
          ))}
        </CancerTypesList>
      </ContentWrapper>
    </FigureContainer>
  );
};

export default MultipleCancerTypesImage;
