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
  Aggregate_PatientID: 2,
  Aggregate_ImageCount: 3,
  Aggregate_Modality: 4,
  Aggregate_BodyPartExamined: 5,
};

const repoOrder = {
  IDC: IDCOrder,
  TCIA: TCIAOrder,
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

export const useOrderSupportingDataByRepo = (data, repo, rows) => {
  const keyVal = data?.CRDCLinks.filter((item) => item.repository === repo);
  const tblData = reorderObjectKeys(keyVal?.[0]?.metadata, repoOrder[repo]);
  /**
  * prepare table data
  */
  if (Object.keys(tblData).length === 0) {
    return [];
  }
  const tblRows = rows?.map((row) => ({
    property: row.title,
    dataValue: tblData[row.key],
  }));
  return tblRows;
};
