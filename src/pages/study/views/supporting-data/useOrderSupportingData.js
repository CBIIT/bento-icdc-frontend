import React from 'react';
import { reorderObjectKeys } from '../../utils';

const IDCOrder = {
  collection_id: 1,
  species: 2,
  cancer_type: 3,
  description: 4,
  image_types: 5,
  location: 6,
  subject_count: 7,
  date_updated: 8,
  doi: 9,
  supporting_data: 10,
};

const TCIAOrder = {
  Collection: 1,
  total_patient_IDs: 2,
  total_image_counts: 3,
  unique_modalities: 4,
  unique_bodyparts_examined: 5,
};

export const useOrderSupportingData = (data) => {
  const [IDCMetaData, setIDC] = React.useState({});
  const [TCIAMetaData, setTCIA] = React.useState({});

  React.useEffect(() => {
    const IDCData = data?.CRDCLinks.filter((item) => item.repository === 'IDC');
    const TCIAData = data?.CRDCLinks.filter((item) => item.repository === 'TCIA');

    const IDCObj = reorderObjectKeys(IDCData?.[0]?.metadata, IDCOrder);
    const TCIAObj = reorderObjectKeys(TCIAData?.[0]?.metadata, TCIAOrder);
    setIDC(IDCObj);
    setTCIA(TCIAObj);
  }, [data]);

  return [IDCMetaData, TCIAMetaData];
};

export default useOrderSupportingData;
