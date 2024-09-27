import React, { useState } from 'react';
import { Modal, Tabs } from 'antd';
import { Link } from 'react-router-dom';
import { withStyles } from "@mui/styles";
import { noop } from 'antd/es/_util/warning';
import { BarChartV2 } from '../../../components/BarChartV2';
import useDashboardTabs from '../../dashboard/components/dashboard-tabs-store';
import { navigatedToDashboard } from '../../../utils/utils';
import { palette } from '../../../bento/studyDetailsData';
import { useSampleProfileModal } from './sample-profile-modal-store'

const onChange = (key) => {
  noop(key);
};

const generateLabel = (key, classes) => {
  switch (key) {
    case 0:
      return <div className={classes.tabText}>Site</div>;
    case 1:
      return <div className={classes.tabText}>Type</div>;
    case 2:
      return <div className={classes.tabText}>Pathology</div>;
    default:
      return undefined;
  }
};

const modalWidth = 1000;

const SampleProfileModal = ({
  sampleProfile,
  data,
  studyCode,
  classes,
  accessionId,
}) => {
  const [{ isModalOpen }, { setIsModalOpen }] = useSampleProfileModal();
  const [, actions] = useDashboardTabs();
  const filterStudy = `${studyCode} (${accessionId})`;

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const linkToDashboard = () => {
    navigatedToDashboard(filterStudy, 'Samples');
    setIsModalOpen(false);
    actions.changeCurrentTab(1);
  };

  const items = sampleProfile?.tabs?.map((item, index) => ({
    key: index,
    label: generateLabel(index, classes),
    children: (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div className={classes.headerButton}>
          <span className={classes.headerButtonLinkSpan}>
            <Link
              className={classes.headerButtonLink}
              to={(location) => ({ ...location, pathname: '/explore' })}
              onClick={() => linkToDashboard()}
            >
              <div className={classes.headerButtonLinkNumber}>
                {data.sampleCountOfStudy}
              </div>
              <span className={classes.headerButtonLinkText}>
                Associated Samples
              </span>
            </Link>
          </span>
        </div>

        <BarChartV2
          chartData={data[item.value]}
          palette={palette}
          yAxisLabel="Sample count"
          xAxisLabel="Sample site"
        />
      </div>
    ),
  }));

  return (
    <>
      <div className={classes.triggerButton} onClick={showModal}>
        Open Expanded View
      </div>
      <Modal
        title={(
          <div className={classes.titleWrapper}>
            <div className={classes.titleText}>
              {`Sample Profiles for the ${studyCode} study`}
            </div>
            <div className={classes.modalTitleDivider} />
          </div>
        )}
        open={isModalOpen}
        width={modalWidth}
        onOk={handleOk}
        zIndex={2000}
        onCancel={handleCancel}
        footer={[]}
      >
        <div className={classes.spacer} />
        <div>
          <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
        </div>
      </Modal>
    </>
  );
};

export default withStyles(
  (theme) => ({
    headerButton: {
      fontFamily: theme.custom.fontFamilySans,
      border: '3px solid #81a6b9',
      marginTop: '15px',
      // float: 'right',
      width: '220px',
      height: '35px',
      textAlign: 'center',
      background: '#f6f4f4',
      padding: '4px 10px 4px 5px',
      alignSelf: 'end',
      position: 'relative',
      bottom: '90px',
    },
    spacer: {
      height: '30px',
    },
    triggerButton: {
      color: '#DC762F',
      textDecoration: 'underline',
      cursor: 'pointer',
      marginLeft: '45px',
      fontFamily: 'Open Sans',
      fontWeight: '600',
      fontSize: '16px',
    },
    titleWrapper: {
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
    },
    titleText: {
      fontFamily: 'Lato',
      fontWeight: '700',
      fontSize: '17px',
      color: '#4D6787',
    },
    modalTitleDivider: {
      borderTop: '1px solid #d1dbe0',
      position: 'relative',
      width: `${modalWidth}px`,
      right: '24px',
    },
    headerButtonLinkSpan: {
      fontFamily: theme.custom.fontFamilySans,
      width: '200px',
      fontSize: '13px',
      display: 'inherit',
      height: '15px',
      marginTop: '-2px',
    },
    headerButtonLink: {
      textDecoration: 'none',
      lineHeight: '14px',
      fontWeight: 'bold',
      position: 'relative',
      top: '2px',
      color: '#dc762f',
      '&:hover': {
        textDecoration: 'none',
      },
    },
    headerButtonLinkNumber: {
      fontFamily: 'Roboto',
      fontSize: '13px',
      paddingBottom: '3px',
      margin: '0',
      display: 'inherit',
      fontWeight: '900',
      marginRight: '4px',
    },
    tabText: {
      fontFamily: 'Roboto',
      fontWeight: 500,
      fontSize: '14px',
      color: '#000',
    },
    headerButtonLinkText: {
      fontFamily: 'Roboto',
      color: '#0B3556',
      fontSize: '13px',
      fontStyle: 'normal',
      fontWeight: '900',
      lineHeight: '14px',
      letterSpacing: '0.15px',
    },
  }),
  { withTheme: true },
)(SampleProfileModal);
