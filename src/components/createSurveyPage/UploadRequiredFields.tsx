import React, { useCallback, useEffect, useState } from 'react';
import { 
  Tooltip, 
  Text, 
  FormControl, 
  FormLabel, 
  Input, 
  Code, 
  Slider, 
  Stack, 
  useSlider, 
  SliderTrack, 
  SliderFilledTrack, 
  SliderThumb,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button
} 
from '@chakra-ui/react';
import { QuestionIcon, ChevronDownIcon } from '@chakra-ui/icons';
import apiClient from '../../api/apiClient';
import { SurveyTemplateData } from '../../api/dtos/survey-assignment.dto';

export type UploadStatus = { success: true } | { success: false; error: string };

interface UploadRequiredFieldsFormProps {
  setOrganizationName: React.Dispatch<React.SetStateAction<string>>;
  organizationName: string;
  setSplitPercentage: React.Dispatch<React.SetStateAction<number>>;
  splitPercentage: number;
  setImage: React.Dispatch<React.SetStateAction<string>>;
  setUploadStatus: (status: UploadStatus) => void;
  surveyTemplateData: SurveyTemplateData | null;
  setSurveyTemplateData: React.Dispatch<React.SetStateAction<SurveyTemplateData | null>>;
}

const UploadRequiredFields: React.FC<UploadRequiredFieldsFormProps> = ({
  setOrganizationName,
  organizationName,
  setSplitPercentage,
  splitPercentage,
  setImage,
  setUploadStatus,
  surveyTemplateData,
  setSurveyTemplateData

}) => {  
  const [surveyTemplates, setSurveyTemplates] = useState<SurveyTemplateData[]>([]);

  useEffect(() => {
    const fetchSurveyTemplates = async() => {
      try {
        const mySurveyTemplates = await apiClient.getMySurveyTemplates();
        setSurveyTemplates(mySurveyTemplates);
      }
      catch (e) {
        console.log("Failed to load survey templates: ", e.message);
      }
    };

    fetchSurveyTemplates();
  }, []);

  const onFormUpload = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];

      // no image file uploaded
      if (file === null || file === undefined) {
        setUploadStatus({ success: false, error: 'No image given' });
        return;
      }

      // image file does not match extension criteria
      if (!/\.(?:jpe?g|png|gif|svg)$/i.test(file.name)) {
        setUploadStatus({ success: false, error: 'Image must be jpg, jpeg, png, svg, or gif' });
        return;
      }

      const reader = new FileReader();

      // image file succesfully read
      reader.onload = () => {
        const base64Str = reader.result as string;
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
    <div>
      <FormControl style={{ marginBottom: '1rem' }}>
        <FormLabel display="flex">
          <b>Organization Name</b>
             <Tooltip
                label="This is the name of the organization that will be displayed to survey respondents."
                placement="right"
                hasArrow
              >
              <QuestionIcon alignSelf="center" ml={2} />
              </Tooltip>
        </FormLabel>
        <Input placeholder="e.g. Accelerate Academy" onChange={(e) => setOrganizationName(e.target.value)} required />
      </FormControl>
      <FormControl  style={{ marginBottom: '1rem' }}>
        <FormLabel display="flex">
          <b>Upload Header Image</b>
          <Tooltip
            label="This is the logo of the organization that will be displayed to survey respondents."
            placement="right"
            hasArrow
          >
          <QuestionIcon alignSelf="center" ml={2} />
          </Tooltip>
        </FormLabel>
        <Input type="file" accept="image/*" onChange={onFormUpload} required />
      </FormControl>
      <FormControl style={{ marginBottom: '1rem' }}>
        <FormLabel display="flex">
          <b>Input Split Percentage</b>
          <Tooltip
            label="This is the percentage of youth that will receive letters (percentage in treatment group)."
            placement="right"
            hasArrow
          >
          <QuestionIcon alignSelf="center" ml={2} />
          </Tooltip>
        </FormLabel>
            <Stack align="flex-start">
              <div style={{alignItems: "center", display: "flex", flexDirection: 'column'}}>
              <Slider
                aria-label="split-percentage-slider"
                value={splitPercentage}
                onChange={(e) => setSplitPercentage(e)}
                min={0}
                max={100}
                width="300px"
              >
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>
              <Code style={{backgroundColor: 'transparent', fontFamily: 'Inter', fontWeight: 'bold', color: '#4A90E2'}}>
                {splitPercentage}%
                </Code>
              </div>
            </Stack>
      </FormControl>
      <FormControl  style={{ marginBottom: '1rem' }}>
        <FormLabel display="flex">
          <b>Survey Template</b>
          <Tooltip
            label="This is the survey template with the questions that will be given to participants."
            placement="right"
            hasArrow
          >
          <QuestionIcon alignSelf="center" ml={2} />
          </Tooltip>
        </FormLabel>
        <Menu>
          <MenuButton as={Button} width="200px" colorScheme="gray" rightIcon={<ChevronDownIcon  />}>
            {surveyTemplateData ? surveyTemplateData.name : 'Select a template'} 
          </MenuButton>
          <MenuList>
            {surveyTemplates.map((template: SurveyTemplateData) => (
              <MenuItem
                key={template.id}
                onClick={() => setSurveyTemplateData(template)}
              >
                {template.name}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      </FormControl>

    </div>
  );
};

export default UploadRequiredFields;
