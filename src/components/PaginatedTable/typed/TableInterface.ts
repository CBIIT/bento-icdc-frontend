import { btnTypes } from '../../../bento-core';

interface ButtonType {
  ADD_ALL_FILES: string;
  ADD_SELECTED_FILES: string;
  DOWNLOAD_MANIFEST: string;
}

export const PgTableButton = btnTypes as ButtonType;
