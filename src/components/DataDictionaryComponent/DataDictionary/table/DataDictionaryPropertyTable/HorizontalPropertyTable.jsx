/* eslint-disable no-unused-vars */
import * as React from 'react';
import {
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  Paper,
  withStyles,
} from '@material-ui/core';
import styled from 'styled-components';
import ListComponent from './component/ListComponent';
import ButtonComponent from './component/ButtonComponent';
import { controlVocabConfig as config } from '../../../../../bento/dataDictionaryData';
import {
  getMatchesSummaryForProperties,
  getPropertyNameFragment,
  getPropertyDescriptionFragment,
  getPropertyTypeFragment,
} from '../../highlightHelper';

function createData(name, calories, fat, carbs, protein) {
  return {
    name, calories, fat, carbs, protein,
  };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const tableStyles = {
  padding: '0 0 0 2em',
  '$ th': {
    padding: '5em',
  },
};

const DataSpan = styled.span`
    padding-left: 1em;
    display: flex;
`;
const PropertySpan = styled(DataSpan)`
    border-bottom: 1px solid lightgrey;
    gap: 4.5em;
`;

const DescriptionSpan = styled(DataSpan)`
    gap: 3.2em;
`;

const TypeSpan = styled(DataSpan)`
    gap: 6.2em;
`;

const RequiredSpan = styled(DataSpan)`
    gap: 4.3em;
`;

const SourceSpan = styled(DataSpan)`
    gap: 4.2em;
`;

const HeaderSpan = styled.span`
`;

const rowStyles = {
  border: '1px solid lightgrey',
  '&:last-child td, &:last-child th': { border: 0 },
};

// eslint-disable-next-line no-unused-vars
function HorizontalPropertyTable({
  classes, propertyKeysList, isRequired, displayKeyProperty,
  properties, matchedPropertiesSummary, onlyShowMatchedProperties,
  requiredProperties, preferredProperties, openBoxHandler,
  needHighlightSearchResult, displayKeyPropsDescription,
}) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table" style={tableStyles}>
        <TableHead>
          <TableRow style={{ height: '3rem' }}>
            <TableCell><HeaderSpan>Lorem ipsuim....</HeaderSpan></TableCell>
          </TableRow>
        </TableHead>
        <TableBody style={{ padding: '0.5rem 0.5em 0.5em 2em' }}>
          {
          propertyKeysList.map((propertyKey) => {
            const property = properties[propertyKey];
            let nameMatch = null;
            let descriptionMatch = null;
            let typeMatchList = null;
            if (needHighlightSearchResult) {
              const matchedSummaryItem = matchedPropertiesSummary
                .find((item) => item.propertyKey === propertyKey);
              if (matchedSummaryItem) {
                nameMatch = matchedSummaryItem.nameMatch;
                descriptionMatch = matchedSummaryItem.descriptionMatch;
                typeMatchList = matchedSummaryItem.typeMatchList;
              } else if (onlyShowMatchedProperties) {
                return null;
              }
            }
            let termID = '';
            let termLink = '';
            let type = '';
            let enums = '';
            let key = false;
            if ('src' in property) {
              try {
                termID = property.src;
                termLink = property.term.termDef && property.term.termDef.term_url;
              // eslint-disable-next-line no-empty
              } catch (err) {}
            }
            const propertyNameFragment = getPropertyNameFragment(
              propertyKey,
              nameMatch,
              'data-dictionary-property-table__span',
            );
            if ('type' in property) {
              try {
                type = property.type;
              // eslint-disable-next-line no-empty
              } catch (err) {}
            }
            if ('enum' in property) {
              enums = property.enum;
            }
            if ('key' in property) {
              key = property.key;
            }

            const propertyDescriptionFragment = getPropertyDescriptionFragment(
              property,
              descriptionMatch,
              'data-dictionary-property-table__span',
            );
            // eslint-disable-next-line no-shadow
            const isRequired = requiredProperties.includes(propertyKey);
            const isPreferred = preferredProperties.includes(propertyKey);
            return (
              <>
                <TableRow
                  style={rowStyles}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row" sx={{ display: 'flex', flexDirection: 'column' }}>
                    <PropertySpan>
                      Property:
                      <span>
                        { (key)
                          ? displayKeyProperty(propertyKey)
                          : propertyNameFragment }
                      </span>
                    </PropertySpan>
                    <DescriptionSpan>
                      Description:
                      <span>
                        { (key)
                          ? (
                            <div className="data-dictionary-property-table_key_description">
                              {displayKeyPropsDescription(property.description)}
                            </div>
                          )
                          : propertyDescriptionFragment }
                      </span>
                    </DescriptionSpan>
                    <TypeSpan>
                      Type:
                      <span>
                        { (enums) ? (
                          <>
                            <span>
                              <p style={{ margin: '0', minWidth: '130px' }}>Acceptable Values:</p>
                              {' '}
                              {enums.length > config.maxNoOfItems
                                ? (<ListComponent items={enums.slice(0, config.maxNoOfItems)} />)
                                : (<ListComponent items={enums} />)}
                            </span>
                            {enums.length > config.maxNoOfItems
                              && (
                                <ButtonComponent
                                  label="...show more"
                                  openHandler={() => openBoxHandler(enums)}
                                />
                              )}
                          </>
                        ) : (
                          <p>{JSON.stringify(type)}</p>
                        )}
                      </span>
                    </TypeSpan>
                    <RequiredSpan>
                      Required:
                      <span>lorem ipsuim</span>
                      {' '}
                      <SourceSpan style={{ display: 'flex', gap: '4.2em' }}>
                        Source:
                        <span>lorem ipsuim</span>
                      </SourceSpan>
                    </RequiredSpan>
                  </TableCell>
                </TableRow>
              </>

            );
          })
}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default HorizontalPropertyTable;
