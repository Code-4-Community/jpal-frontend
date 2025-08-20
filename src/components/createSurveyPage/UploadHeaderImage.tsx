import React, { useCallback } from 'react';
import Papa from 'papaparse';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tooltip,
  Tr,
} from '@chakra-ui/react';
import { QuestionIcon } from '@chakra-ui/icons';

export type UploadStatus = { success: true } | { success: false; error: string };

interface UploadHeaderImageFormProps {
  image: string;
  setImage: React.Dispatch<React.SetStateAction<string>>;
  setUploadStatus: (status: UploadStatus) => void;
}

const UploadHeaderImage: React.FC<UploadHeaderImageFormProps> = ({
  image,
  setImage,
  setUploadStatus,
}) => {
  const validateImage = useCallback((parsedData: Papa.ParseResult<unknown>): UploadStatus => {
    // could not process image
    if (!parsedData.meta.fields) {
      return { success: false, error: 'Could not process image' };
    }

    return { success: true };
  }, []);

  const onFormUpload = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files === null) {
        setUploadStatus({ success: false, error: 'No image given' });
        return;
      }

      const file = event.target.files[0];

      // file does not match extension criteria
      /*
      if (!/\.(?:jpe?g|png|gif)$/i.test(file.name)) {
        setUploadStatus({ success: false, error: 'Image must be jpg, jpeg, png, or gif' });
        return;
      }*/

      const reader = new FileReader();
      reader.readAsDataURL(file);
    },
    [setUploadStatus, validateCsv, setAssignments],
  );

  return (
    <FormControl>
      <FormLabel display="flex">
        <b>Upload Header Image</b>
      </FormLabel>
      <Input type="file" accept="image/*" onChange={onFormUpload} required />
    </FormControl>
  );
};

export default UploadHeaderImage;
