import React, { useCallback } from 'react';
import { FormControl, FormLabel, Input } from '@chakra-ui/react';

export type UploadStatus = { success: true } | { success: false; error: string };

interface UploadRequiredFieldsFormProps {
  setImage: React.Dispatch<React.SetStateAction<string>>;
  setUploadStatus: (status: UploadStatus) => void;
}

const UploadRequiredFields: React.FC<UploadRequiredFieldsFormProps> = ({
  setImage,
  setUploadStatus,
}) => {
  const onFormUpload = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];

      // no image file uploaded
      if (file === null || file === undefined) {
        setUploadStatus({ success: false, error: 'No image given' });
        return;
      }

      // image file does not match extension criteria
      if (!/\.(?:jpe?g|png|gif)$/i.test(file.name)) {
        setUploadStatus({ success: false, error: 'Image must be jpg, jpeg, png, or gif' });
        return;
      }

      const reader = new FileReader();

      // image file succesfully read
      reader.onload = () => {
        const base64Str = reader.result as string;
        setImage(base64Str);
        setUploadStatus({ success: true });
      };

      // handle errors
      reader.onerror = () => {
        setUploadStatus({
          success: false,
          error: 'Error while reading image file, try again with a different image.',
        });
      };

      // read image as base64 string
      reader.readAsDataURL(file);
    },
    [setUploadStatus, setImage],
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

export default UploadRequiredFields;
