import React from 'react';
import {
  Grid,
  withStyles,
} from '@material-ui/core';
import { Anchor } from '@bento-core/util';
import styles from './AboutCardStyle';

const AboutCardView = ({
  searchText, data, classes, index,
}) => {
  const results = data.text.map((result) => result.replaceAll('$', ''));

  function getHighlightedText(text, highlight) {
    // Split on highlight term and include term into parts, ignore case
    const textString = text.reduce((searchResults, currentString, currentIndex) => {
      let newResults = searchResults;
      if (currentString.endsWith('.') || currentIndex >= text.length - 1) {
        newResults = `${`${newResults} ${currentString}`}`;
      } else {
        newResults = `${`${newResults} ${currentString}`} ... `;
      }
      return newResults;
    }, '');
    const parts = textString.split(new RegExp(`(${highlight})`, 'gi'));
    return (
      <span>
        {' '}
        { parts.map((part, i) => (
          <span id={i} style={part.toLowerCase() === highlight.toLowerCase() ? { color: '#0467BD' } : {}}>
            { part }
          </span>
        ))}
        {' '}
      </span>
    );
  }

  return (
    <Grid item container className={classes.card} id={`global_search_card_${index}`}>
      <Grid item xs={1} className={classes.indexContainer}>
        {index + 1 }
      </Grid>
      <Grid item xs={11} className={classes.propertyContainer}>
        <div>
          <span className={classes.detailContainerHeader}>ABOUT</span>
          <span className={classes.cardTitle}>{data.title}</span>
        </div>
        <div className={classes.text}>{getHighlightedText(results, searchText)}</div>
        <div className={classes.linkText}>
          <Anchor link={data.page} text={`${window.location.origin}${data.page}`} classes={classes} />
        </div>
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(AboutCardView);
