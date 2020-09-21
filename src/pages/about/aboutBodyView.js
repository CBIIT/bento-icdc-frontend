import React from 'react';
import { Grid, withStyles, Link } from '@material-ui/core';
import Header from '../../components/About/HeaderView';
import Stats from '../../components/Stats/AllStatsController';
import externalIcon from '../../assets/about/About-ExternalLink.svg';
import tableExternalIcon from '../../assets/about/About-Table-ExternalLink.svg';

const AboutBody = ({ classes, data }) => {
  function boldText(text) {
    if (text !== '') {
      const boldedText = text.split('$$').map((splitedText) => {
        if (splitedText != null && (/\*(.*)\*/.test(splitedText))) {
          const extractedText = splitedText.match(/\*(.*)\*/).pop();
          return extractedText.includes('@') ? (<span className={classes.email}>{extractedText}</span>)
            : (<span className={classes.title}>{extractedText}</span>);
        }
        return splitedText;
      });
      return boldedText;
    }
    return text;
  }
  return (
    <>
      <Stats />
      <div className={classes.paddingTop60}>
        <Header title={data.title} className={classes.container} />
      </div>
      <div className={classes.container}>
        <Grid container spacing={16} direction="row" className={classes.aboutSection}>
          <Grid item lg={3} md={3} sm={12} xs={12} className={classes.leftSection}>
            <img className={classes.img} src={data.img} alt={data.imageAlt} />
          </Grid>
          <Grid item lg={9} md={9} sm={12} xs={12} className={classes.rightSection}>
            <span className={classes.text}>
              {data.content ? data.content.map((contentObj) => (
                <>
                  {/* Ordered List with Numbers logic */}
                  {contentObj.listWithNumbers && (
                    <div className={classes.text}>
                      {/* Numbered ordered list */}
                      <ol>
                        { contentObj.listWithNumbers.map((listObj) => (
                          listObj.listWithAlpahbets ? (
                          // Alphetised sub ordered list
                            <ol type="a">
                              {/* bolding text if necessary */}
                              { listObj.listWithAlpahbets.map((listObj1) => <li>{listObj1.includes('$$') ? boldText(listObj1) : listObj1}</li>)}
                            </ol>
                          ) : <li>{listObj.includes('$$') ? boldText(listObj) : listObj}</li>
                        ))}
                      </ol>
                    </div>
                  )}
                  {/* Ordered List with Alphabets logic */}
                  {contentObj.listWithAlpahbets && (
                    <div className={classes.text}>
                      {/* Alphabetised ordered list */}
                      <ol type="a">
                        { contentObj.listWithAlpahbets.map((listObj) => <li>{listObj.includes('$$') ? boldText(listObj) : listObj}</li>)}
                      </ol>
                    </div>
                  )}

                  {/* Paragraphs */}
                  {contentObj.paragraph && (
                    <div className={classes.text}>
                      { contentObj.paragraph.split('$$').map((splitedParagraph) => {
                        // Checking for regex ()[] pattern
                        if (splitedParagraph != null && ((/\[(.+)\]\((.+)\)/g.test(splitedParagraph)) || (/\((.+)\)\[(.+)\]/g.test(splitedParagraph)))) {
                          const title = splitedParagraph.match(/\[(.*)\]/).pop();
                          const linkAttrs = splitedParagraph.match(/\((.*)\)/).pop().split(' ');
                          const target = linkAttrs.find((link) => link.includes('target:'));
                          const url = linkAttrs.find((link) => link.includes('url:'));
                          const type = linkAttrs.find((link) => link.includes('type:')); // 0 : no img

                          const link = (
                            <Link
                              title={title}
                              target={target ? target.replace('target:', '') : '_blank'}
                              rel="noreferrer"
                              href={url ? url.replace('url:', '') : splitedParagraph.match(/\((.*)\)/).pop()}
                              color="inherit"
                              className={classes.link}
                            >
                              {title}
                            </Link>
                          );

                          return (
                            <>
                              {link}
                              {type ? '' : (
                                <img
                                  src={externalIcon}
                                  alt="outbounnd web site icon"
                                  className={classes.linkIcon}
                                />
                              )}

                            </>
                          );
                        }
                        // For email
                        if (splitedParagraph != null && (/@(.*)@/.test(splitedParagraph))) {
                          return (<span className={classes.email}>{splitedParagraph.match(/@(.*)@/).pop()}</span>);
                        }
                        // For sub headings
                        if (splitedParagraph != null && (/#(.*)#/.test(splitedParagraph))) {
                          return (<div className={classes.title}>{splitedParagraph.match(/#(.*)#/).pop()}</div>);
                        }
                        // For bolding inline words
                        if (splitedParagraph != null && (/\*(.*)\*/.test(splitedParagraph))) {
                          return (<span className={classes.title}>{splitedParagraph.match(/\*(.*)\*/).pop()}</span>);
                        }
                        // For downloading things
                        if (splitedParagraph != null && (/{(.*)}/.test(splitedParagraph))) {
                          const downloadAttrs = splitedParagraph.match(/{(.*)}/).pop().split(',');
                          const downloadLink = downloadAttrs.find((link) => link.includes('link:'));
                          const downloadTitle = downloadAttrs.find((link) => link.includes('title:'));
                          return (
                            <Link
                              target="_blank"
                              className={classes.link}
                              href={downloadLink ? downloadLink.replace('link:', '') : ''}
                            >
                              {downloadTitle ? downloadTitle.replace('title:', '') : ''}
                            </Link>
                          );
                        }
                        return splitedParagraph;
                      })}
                    </div>
                  )}

                  {/* Table logic */}
                  {contentObj.table && (
                    <div className={classes.tableDiv}>
                      <table className={classes.table}>
                        <thead className={classes.tableHeader}>
                          <tr className={classes.tableBodyRow}>
                            <th className={classes.headerCell} aria-label="Index" />
                            { contentObj.table[0].head.map((rowObj) => {
                              let outputHTML = <th className={classes.headerCell}>{rowObj}</th>;
                              if (rowObj != null && (/{(.*)}/.test(rowObj))) {
                                const thAttrs = rowObj.match(/{(.*)}/).pop().split('$$');
                                const inlineStyleStr = thAttrs.find((thAttr) => thAttr.includes('style:')).replace('style:', '').replace(/'/g, '');
                                const inlineStyleMap = {};
                                inlineStyleStr.split(',').forEach((style) => {
                                  // eslint-disable-next-line prefer-destructuring
                                  inlineStyleMap[style.split(':')[0]] = style.split(':')[1];
                                });
                                const text = thAttrs.find((thAttr) => thAttr.includes('text:'));
                                outputHTML = (
                                  <th className={classes.headerCell} style={inlineStyleMap}>
                                    {text.replace('text:', '')}
                                  </th>
                                );
                              }
                              return outputHTML;
                            })}
                          </tr>
                        </thead>
                        <tbody>
                          { contentObj.table[1].body.map((rowObj, index) => (
                            <>
                              <tr className={classes.tableBodyRow}>
                                <td className={classes.tableCell}>{index + 1}</td>
                                {/* eslint-disable-next-line max-len */}
                                { rowObj.row.map((rowValue) => {
                                  let outputHTML = (
                                    <td className={classes.tableCell}>
                                      {rowValue}
                                    </td>
                                  );
                                  // add inline style
                                  if (rowValue != null && (/{(.*)}/.test(rowValue))) {
                                    const thAttrs = rowValue.match(/{(.*)}/).pop().split('$$');
                                    const inlineStyleStr = thAttrs.find((thAttr) => thAttr.includes('style:')).replace('style:', '').replace(/'/g, '');
                                    const inlineStyleMap = {};
                                    inlineStyleStr.split(',').forEach((style) => {
                                      // eslint-disable-next-line prefer-destructuring
                                      inlineStyleMap[style.split(':')[0]] = style.split(':')[1];
                                    });
                                    const text = thAttrs.find((thAttr) => thAttr.includes('text:'));
                                    outputHTML = (
                                      <td className={classes.tableCell} style={inlineStyleMap}>
                                        {text.replace('text:', '')}
                                      </td>
                                    );
                                  }

                                  if (rowValue != null && ((/\[(.+)\]\((.+)\)/g.test(rowValue)) || (/\((.+)\)\[(.+)\]/g.test(rowValue)))) {
                                    const title = rowValue.match(/\[(.*)\]/).pop();
                                    const linkAttrs = rowValue.match(/\((.*)\)/).pop().split(' ');
                                    const target = linkAttrs.find((link) => link.includes('target:'));
                                    const url = linkAttrs.find((link) => link.includes('url:'));
                                    const type = linkAttrs.find((link) => link.includes('type:')); // 0 : no img
                                    const link = (
                                      <Link
                                        title={title}
                                        target={target ? target.replace('target:', '') : '_blank'}
                                        rel="noreferrer"
                                        href={url ? url.replace('url:', '') : rowValue.match(/\((.*)\)/).pop()}
                                        color="inherit"
                                        className={classes.tableLink}
                                      >
                                        {title}
                                      </Link>
                                    );
                                    outputHTML = (
                                      <td className={classes.tableCell}>
                                        {link}
                                        {type ? '' : (
                                          <img
                                            src={tableExternalIcon}
                                            alt="outbounnd web site icon"
                                            className={classes.tablelinkIcon}
                                          />
                                        )}

                                      </td>
                                    );
                                  }
                                  return outputHTML;
                                })}
                              </tr>
                            </>
                          )) }
                        </tbody>
                      </table>
                    </div>
                  )}
                  <br />
                </>
              )) : ''}
            </span>
          </Grid>
        </Grid>
      </div>
    </>

  );
};

const styles = (theme) => ({
  paddingTop60: {
    paddingTop: '60px',
  },
  container: {
    margin: '16px auto 16px auto',
    color: '#000000',
    fontFamily: theme.custom.fontFamilySans,
    fontSize: '15px',
    lineHeight: '22px',
    maxWidth: '1440px',
  },
  text: {
    color: '#000000',
    fontFamily: theme.custom.fontFamilySans,
    fontSize: '15px',
    lineHeight: '22px',
  },
  title: {
    color: '#0B3556',
    fontWeight: 'bolder',
  },
  email: {
    color: '#0296C9',
    fontWeight: 'bold',
  },
  rightSection: {
    padding: '8px 25px !important',
    float: 'left',
  },
  leftSection: {
    float: 'left',
  },
  aboutSection: {
    margin: '60px auto 60px auto',
  },
  img: {
    width: '100%',
  },
  linkIcon: {
    width: '20px',
    verticalAlign: 'sub',
    margin: '0px 0px 0px 2px',
  },
  tablelinkIcon: {
    width: '15px',
    verticalAlign: 'sub',
    margin: '0px 0px 0px 2px',
  },
  link: {
    color: '#0296C9',
    fontWeight: 'bolder',
    '&:hover': {
      color: '#0296C9',
    },
  },
  tableLink: {
    fontWeight: 'bolder',
    textDecoration: 'underline',
  },
  tableDiv: {
    marginTop: '0px',
  },
  table: {
    borderSpacing: '0',
    borderCollapse: 'collapse',
    fontSize: '12px',
    fontWeight: 'bold',
    letterSpacing: '0.025em',
    lineHeight: '30px',
    textAlign: 'left',
    width: '100%',
  },
  tableHeader: {
    fontFamily: theme.custom.fontFamilySans,
    color: '#194563',
    textTransform: 'uppercase',

  },
  tableBodyRow: {
    borderSpacing: '0',
    borderCollapse: 'collapse',
    color: '#3E7AAA',
  },
  tableCell: {
    fontFamily: theme.custom.fontFamilySans,
    fontSize: '14px',
    padding: '8px 15px 8px 0px',
    borderBottom: '0.66px solid #087CA5',
    width: '1px',
  },
  headerCell: {
    borderBottom: '4px solid #087CA5',
    borderSpacing: '0',
    borderCollapse: 'collapse',
    fontWeight: 'bolder',
  },
  MyCasesWizardStep4: {
    width: '600px',
  },
});

AboutBody.defaultProps = {
  classes: {},
  data: {
    content: [],
  },
};

export default withStyles(styles)(AboutBody);
