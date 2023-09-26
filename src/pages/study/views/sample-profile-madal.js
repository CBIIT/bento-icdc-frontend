/* eslint-disable */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import TabPanel from '../../../components/Tab/TabPanel';
import BarChart from '../../../components/BarCharts';
import {
  Tabs,
  Tab,
} from '@material-ui/core';
import { sampleProfile } from '../../../bento/studyDetailsData';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  expandedViewLink: {
    fontSize: '15px',
    cursor: 'pointer',
    fontFamily: 'Open Sans',
    fontWeight: '600',
    color: '#DC762F',
    textDecoration: 'underline',
  },

}));

export default function SampleProfileModal({
  data, barChartObject, sampleProfiles,
}) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
      const [currentTab, setCurrentTab] = React.useState(0);
  const handleTabChange = (event, value) => {
    setCurrentTab(value);
  };


  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

   const tabItem = (items) => (
    <Tabs
      value={currentTab}
      onChange={handleTabChange}
      className={classes.tabs}
      textColor="primary"
      TabIndicatorProps={{
        style: {
          backgroundColor: '#ffffff',
        },
      }}
    >
      { items.map((item, index) => (
        <Tab
          className={item.value}
          classes={{
            root: (item.value === 'studySamplePathologyCount') ? classes.tab2 : classes.tab,
            labelContainer: classes.labelContainer,
          }}
          label={item.label}
          key={index}
        />
      )) }
    </Tabs>
  );

  const body = (
    <div style={modalStyle} className={classes.paper}>
     <>
        <div style={{ display: 'flex', justifyContent: 'center'}}>
          <div>
           {tabItem(sampleProfiles.tabs)} 
          </div>
        </div>
        {
        sampleProfiles.tabs.map((el, index) => (
          <TabPanel index={el.index} value={currentTab}>
            <BarChart
              data={data[el.value]}
              palette={barChartObject.palette}
              tooltipContent={barChartObject.tooltipContent}
              argument={barChartObject.argument}
              value={barChartObject.value}
            />
          </TabPanel>
        ))
      }
      </> 
    </div>
  );

  return (
    <div>
      <div className={classes.expandedViewLink} onClick={handleOpen}>Open expanded view</div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
