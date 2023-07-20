import React from 'react';
// import { useQuery } from '@apollo/client';
import {
  CircularProgress,
} from '@material-ui/core';
import {
  GET_STORE_MANIFEST_DATA_QUERY,
  myFilesPageData,
} from '../../../bento/fileCentricCartWorkflowData';
import CartHeader from './cartHeader';
import { getManifestData } from '../util/TableService';

const CartHeaderController = ({
  filesId,
}) => {
  const { data } = getManifestData(GET_STORE_MANIFEST_DATA_QUERY, filesId);
  console.log(data);
  if (!data) {
    return (
      <CircularProgress />
    );
  }

  const processedStoreManifestPayload = data.filesInList.map((el) => ({
    file_name: el.file_name,
    file_type: el.file_type,
    association: el.association,
    file_description: el.file_description,
    file_format: el.file_format,
    file_size: el.file_size,
    case_id: el.case_id,
    breed: el.breed,
    diagnosis: el.diagnosis,
    study_code: el.study_code,
    file_uuid: el.file_uuid,
    md5sum: el.md5sum,
    sample_id: el.sample_id,
    individual_id: el.individual_id,
    name: el.name,
    drs_uri: el.drs_uri,
  }));

  // const fetchData = () => {
  //   const fetchResult = await client
  //     .query({
  //       query: GET_MY_CART_DATA_QUERY,
  //       variables: {
  //         first: filesId.length, ...{ uuids: filesId },
  //       },
  //     })
  //     .then((result) => result.data.filesInList);
  //   return fetchResult;
  // }

  // const prepareDownload = () => {
  //  console.log('test');
  //  const userComments = 'commentRef.current.getValue()';
  //  const data1 = getManifestDate(GET_MY_CART_DATA_QUERY, filesId);
  //  console.log(data1);
  //  GA.sendEvent('Manifest', 'Download', 'cart');
  //  return downloadJson(
  //    [],
  //    userComments,
  //    myFilesPageData.manifestFileName,
  //    manifestData,
  //  );
  // };

  return (
    <>
      <CartHeader
        headerIconSrc={myFilesPageData.headerIconSrc}
        headerIconAlt={myFilesPageData.headerIconAlt}
        mainTitle={myFilesPageData.mainTitle}
        subTitle={myFilesPageData.subTitle}
        manifestPayload={processedStoreManifestPayload}
        filesId={filesId}
      />
    </>
  );
};

export default CartHeaderController;
