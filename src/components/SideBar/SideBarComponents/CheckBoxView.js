/* eslint-disable no-unused-vars */
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  Checkbox,
  ListItem,
  ListItemText,
  Divider,
} from '@material-ui/core';
import {
  CheckBox as CheckBoxIcon, CheckBoxOutlineBlank as CheckBoxBlankIcon,
} from '@material-ui/icons';
import {
  ToolTip as Tooltip,
} from 'bento-components';
import _ from 'lodash';

const styles = {
  listItemGutters: {
    padding: '10px 0px 10px 0px',
    marginLeft: '-5px',
  },
  checkboxRoot: {
    marginLeft: '5px',
    height: 12,
  },
  panelDetailText: {
    color: '#000000',
    fontFamily: 'Nunito',
    fontSize: '14px',
  },
  panelSubjectText: {
    color: '#000000',
    fontFamily: 'Nunito',
    fontSize: '14px',
    marginRight: '0px',
  },
};
const alignment = 'flex-start';

function CheckBoxView(props) {
  const {
    classes, checkboxItem, handleToggle, sideBarItem, facetSectionVariables,
    defaultFacetSectionVariables, backgroundColor, dataDictionary,
  } = props;
  return (
    <>
      <ListItem
        width={1}
        button
        alignItems={alignment}
        selected={checkboxItem.isChecked}
        onClick={handleToggle(`${checkboxItem.name}$$${sideBarItem.groupName}$$${sideBarItem.datafield}$$${checkboxItem.isChecked}$$${sideBarItem.section}`)}
        className={classes.nested}
        style={{
          backgroundColor: checkboxItem.isChecked ? backgroundColor : null,
        }}
        classes={{ selected: classes.selected, gutters: classes.listItemGutters }}
      >
        <Checkbox
          id={`checkbox_${sideBarItem.groupName}_${checkboxItem.name}`}
          icon={<CheckBoxBlankIcon style={{ fontSize: 18 }} />}
          checkedIcon={(
            <CheckBoxIcon
              style={{
                fontSize: 18,
              }}
            />
          )}
          style={{ color: facetSectionVariables[sideBarItem.section].color ? facetSectionVariables[sideBarItem.section].color : '#137fbe' }}
          checked={checkboxItem.isChecked}
          tabIndex={-1}
          disableRipple
          color="secondary"
          classes={{ root: classes.checkboxRoot }}
        />
        { dataDictionary ? (
          (checkboxItem.name) ? (
            <>
              <Tooltip title={_.startCase(checkboxItem.name)}>
                <div className={classes.panelDetailText}>
                  <span>
                    {`${_.startCase(checkboxItem.name)}`}
                  </span>
                </div>
              </Tooltip>
            </>
          ) : (
            <div className={classes.panelDetailText}>
              <span>
                {checkboxItem.name}
              </span>
            </div>
          )
        ) : (
          (checkboxItem.title) ? (
            <>
              <Tooltip title={checkboxItem.title.name}>
                <div className={classes.panelDetailText}>
                  <span>
                    {`${checkboxItem.title.acronym}`}
                  </span>
                </div>
              </Tooltip>
            </>
          ) : (
            <div className={classes.panelDetailText}>
              <span>
                {checkboxItem.name}
              </span>
            </div>
          )
        )}
        {/* {label(checkboxItem)} */}
        <ListItemText />
        <div className={classes.panelSubjectText}>
          <span
            style={{ color: facetSectionVariables[sideBarItem.section] ? facetSectionVariables[sideBarItem.section].color ? facetSectionVariables[sideBarItem.section].color : '' : defaultFacetSectionVariables.color }}
            edge="end"
          >
            &nbsp;
            {checkboxItem.subjects}
          </span>
        </div>
      </ListItem>
      <Divider
        variant="middle"
        style={{
          backgroundColor: checkboxItem.isChecked ? '#FFFFFF' : '#B1B1B1',
          margin: '0px',
          height: checkboxItem.isChecked ? '2px' : '1px',
        }}
      />
    </>
  );
}

export default withStyles(styles)(CheckBoxView);
