import React, { useState } from 'react';
import { Button, Modal, Tabs } from 'antd';
import { BarChartV2 } from '../../../components/BarChartV2';

const onChange = (key) => {
  console.log(key);
};

const generateLabel = (key) => {
  switch (key) {
    case 0:
      return 'Site';
    case 1:
      return 'Type';
    case 2:
      return 'Pathology';
    default:
      return undefined;
  }
};

const palette = ['#62beeb', '#1651ea', '#a1df71', '#72d1d5', '#d98548'];

const SampleProfileModal = ({ sampleProfile, data, studyCode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const items = sampleProfile?.tabs?.map((item, index) => ({
    key: index,
    label: generateLabel(index),
    children: (
      <div>
        <BarChartV2 chartData={data[item.value]} palette={palette} />
      </div>
    ),
  }));

  console.log('items', items);

  return (
    <>
      <div
        style={{
          color: '#DC762F',
          textDecoration: 'underline',
          cursor: 'pointer',
        }}
        onClick={showModal}
      >
        Open Expanded View
      </div>
      <Modal
        title={`Sample Profiles for the ${studyCode} study`}
        open={isModalOpen}
        width={1000}
        onOk={handleOk}
        zIndex={2000}
        onCancel={handleCancel}
      >
        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
      </Modal>
    </>
  );
};

export default SampleProfileModal;
