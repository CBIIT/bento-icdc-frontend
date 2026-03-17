import React from 'react';
import styled from '@emotion/styled';
import { MultipleCancerTypesImage } from './MultipleCancerTypesImage';

type NciLink = {
  href: string;
  label?: string;
};

type FigureProps = {
  src: string;
  alt?: string;
  caption?: string;
};

export interface HumanRelevancePanelProps
  extends React.HTMLAttributes<HTMLDivElement> {
  idPrefix?: string;
  title?: string;
  overview?: string | string[];
  nciLink?: NciLink;
  figure?: FigureProps;
  genes?: string[];
  pathways?: string[];
  therapies?: string[];
  isMultipleCancerTypes?: boolean;
  cancerTypes?: string[];
  cancerTypeToImageKey?: (_cancerType: string) => string | undefined;
  cancerTypeImages?: Record<
    string,
    { src: string; alt?: string; caption?: string }
  >;
}

const Wrapper = styled.div`
  p,
  figure,
  ul {
    padding: 0;
    margin: 0;
  }

  display: flex;
  padding: 24px 83px 50px;
  flex-direction: column;
  gap: 24px;
`;

const TitleContainer = styled.div`
  --font-size: 19px;
  --gap: 8px;

  display: flex;
  gap: var(--gap);

  img {
    height: 54px;
    width: 54px;
  }

  h2 {
    font-family: 'Open Sans';
    font-weight: 700;
    font-size: calc((var(--font-size) / 16) * 1rem);
    line-height: 1.5;
    letter-spacing: calc((0.29 / 16) * 1em);
    text-transform: uppercase;
    color: hsla(195, 99%, 31%, 1);
  }
`;

const ContentContainer = styled.div`
  padding: 0 62px;
  --font-family: 'Open Sans';

  display: flex;
  flex-direction: column;
  gap: 8px;

  .overview-section {
    font-family: var(--font-family);
    font-weight: 400;
    font-size: calc((18 / 16) * 1rem);
    line-height: 1.5;
    letter-spacing: calc((0.2 / 16) * 1em);
    color: hsla(0, 0%, 0%, 1);
  }

  .key-value-wrapper {
    display: flex;
    gap: 120px;
    align-items: baseline;
  }

  .key-value-wrapper h3 {
    font-family: var(--font-family);
    font-weight: 400;
    font-size: calc((17 / 16) * 1rem);
    line-height: 2;
    letter-spacing: calc((0.2 / 16) * 1em);
    color: hsla(195, 99%, 31%, 1);
    min-width: 250px;
    text-transform: uppercase;
  }

  .key-value-wrapper .nci-link {
    color: hsla(195, 100%, 24%, 1);
    font-family: var(--font-family);
    font-weight: 600;
    font-size: calc((16 / 16) * 1rem);
    line-height: 2.5;
    word-break: break-word;
  }

  .empty-state {
    font-family: var(--font-family);
    font-style: italic;
    color: hsla(0, 0%, 40%, 1);
    font-size: calc((16 / 16) * 1rem);
    line-height: 2;
  }

  .key-value-wrapper ul {
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    gap: 0 12px;
    flex: 1 1 0%;
    min-width: 0;
    color: hsla(0, 0%, 0%, 1);
    font-family: var(--font-family);
    font-weight: 400;
    font-size: calc((18 / 16) * 1rem);
    line-height: 2;
    letter-spacing: calc((0.2 / 16) * 1em);
  }

  .key-value-wrapper li {
    word-break: break-word;
    overflow-wrap: break-word;
  }

  .key-value-wrapper li:not(:last-child) {
    &::after {
      content: ',';
      margin-right: 1px;
    }
  }

  figure.single-cancer-type {
    display: flex;
    justify-content: center;
    align-items: center;
    background: #000000;
    padding: 24px;
    max-height: 450px;
  }

  figure.single-cancer-type img {
    width: 100%;
    height: 100%;
    max-height: 400px;
    object-fit: contain;
  }
`;

export const HumanRelevancePanel: React.FC<HumanRelevancePanelProps> = ({
  idPrefix = 'human-relevance',
  title,
  overview,
  nciLink,
  figure,
  genes = [],
  pathways = [],
  therapies = [],
  isMultipleCancerTypes = false,
  cancerTypes = [],
  cancerTypeToImageKey,
  cancerTypeImages = {},
  className,
  style,
  ...divProps
}) => {
  const titleId = `${idPrefix}-title`;
  const nciId = `${idPrefix}-nci-link`;
  const genesId = `${idPrefix}-genes`;
  const pathwaysId = `${idPrefix}-pathways`;
  const therapiesId = `${idPrefix}-therapies`;

  const normalizeOverview: string[] =
    typeof overview === 'string'
      ? [overview]
      : Array.isArray(overview)
        ? overview
        : [];

  const renderList = (items?: string[]) => {
    if (!items || items.length === 0) {
      return <p className="empty-state">No data available.</p>;
    }
    return (
      <ul>
        {items.map((item, i) => (
          <li key={`${item}-${i}`}>{item}</li>
        ))}
      </ul>
    );
  };

  return (
    <Wrapper className={className} style={style} {...divProps}>
      <TitleContainer>
        <img
          src="https://raw.githubusercontent.com/CBIIT/datacommons-assets/refs/heads/main/icdc/images/svgs/study-details-human-rel-icon.svg"
          alt="Human relevance icon"
        />
        {title ? <h2 id={titleId}>{title}</h2> : null}
      </TitleContainer>

      <ContentContainer>
        {normalizeOverview.length > 0 && (
          <section aria-labelledby={titleId} className="overview-section">
            {normalizeOverview.map((p, i) => (
              <p key={`ov-${i}`}>{p}</p>
            ))}
          </section>
        )}

        <section
          className="key-value-wrapper nci-link-section"
          aria-labelledby={nciId}
        >
          <h3 id={nciId}>NCI disease link:</h3>
          {nciLink?.href ? (
            <a
              href={nciLink.href}
              target="_blank"
              rel="noopener noreferrer"
              className="nci-link"
            >
              {nciLink.label ?? nciLink.href}
            </a>
          ) : (
            <p className="empty-state">No data available.</p>
          )}
        </section>

        {figure?.src &&
          (isMultipleCancerTypes ? (
            <MultipleCancerTypesImage
              caption={figure.caption}
              alt={figure.alt}
              cancerTypes={cancerTypes}
              cancerTypeToImageKey={cancerTypeToImageKey}
              cancerTypeImages={cancerTypeImages}
            />
          ) : (
            <figure className="relevance-figure single-cancer-type">
              <img
                src={figure.src}
                alt={figure.alt ?? ''}
                className="relevance-image"
              />
            </figure>
          ))}

        <section
          className="key-value-wrapper genes-section"
          aria-labelledby={genesId}
        >
          <h3 id={genesId}>Relevant Genes</h3>
          {renderList(genes)}
        </section>

        <section
          className="key-value-wrapper pathways-section"
          aria-labelledby={pathwaysId}
        >
          <h3 id={pathwaysId}>Relevant Pathways</h3>
          {renderList(pathways)}
        </section>

        <section
          className="key-value-wrapper therapies-section"
          aria-labelledby={therapiesId}
        >
          <h3 id={therapiesId}>Experimental Therapies</h3>
          {renderList(therapies)}
        </section>
      </ContentContainer>
    </Wrapper>
  );
};

export default HumanRelevancePanel;
