import React from 'react';
// import { useQuery } from '@apollo/client';
// import {
//   CircularProgress,
//   Container,
// } from '@material-ui/core';
import {
  // GET_STORE_MANIFEST_DATA_QUERY,
  myFilesPageData,
} from '../../../bento/fileCentricCartWorkflowData';
import CartHeader from './cartHeader';
// import { getManifestData } from '../util/TableService';

const CartHeaderController = ({
  filesId,
}) => {
  // const { data } = getManifestData(GET_STORE_MANIFEST_DATA_QUERY, filesId);
  // if (!data) {
  //   return (
  //     <Container maxWidth="xl">
  //       <CircularProgress />
  //     </Container>
  //   );
  // }

  // const processedStoreManifestPayload = data.filesInList.map((el) => ({
  //   file_name: el.file_name,
  //   file_type: el.file_type,
  //   association: el.association,
  //   file_description: el.file_description,
  //   file_format: el.file_format,
  //   file_size: el.file_size,
  //   case_id: el.case_id,
  //   breed: el.breed,
  //   diagnosis: el.diagnosis,
  //   study_code: el.study_code,
  //   file_uuid: el.file_uuid,
  //   md5sum: el.md5sum,
  //   sample_id: el.sample_id,
  //   individual_id: el.individual_id,
  //   name: el.name,
  //   drs_uri: el.drs_uri,
  // }));
  console.log('header');
  return (
    <>
      <CartHeader
        headerIconSrc={myFilesPageData.headerIconSrc}
        headerIconAlt={myFilesPageData.headerIconAlt}
        mainTitle={myFilesPageData.mainTitle}
        subTitle={myFilesPageData.subTitle}
        filesId={filesId}
      />
    </>
  );
};

export default CartHeaderController;
