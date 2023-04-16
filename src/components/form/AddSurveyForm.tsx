import React, { useState } from 'react';
import { FormikHelpers } from 'formik';
import { Box, Button, Divider, Input, VStack } from '@chakra-ui/react';
import { DownloadIcon } from '@chakra-ui/icons';
import SurveyForm from '../survey/SurveyForm';
import DEFAULT_QUESTIONS from '../survey/defaultQuestions';

export interface AddSurveyValues {
  firstName: string;
  lastName: string;
  email: string;
}

export interface AddSurveyProps {
  onSubmit: (
    values: AddSurveyValues,
    actions: FormikHelpers<Partial<AddSurveyValues>>,
  ) => Promise<void>;
}

export const AddSurveyForm: React.FC = () => {
  const [students, setStudents] = useState<AddSurveyValues[]>([]);

  const handleCsvUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const csv = e.target?.result as string;
      const lines = csv.split('\n');
      const headers = lines[0].split(',');
      const studentData = lines
        .slice(1)
        .map((line) => {
          const values = line.split(',');
          return {
            firstName: values[0],
            lastName: values[1],
            email: values[2],
          };
        })
        .filter((student) => student.firstName && student.lastName && student.email);
      setStudents(studentData);
    };
    reader.readAsText(file);
  };

  return (
    <VStack spacing="6">
      <Box
        backgroundColor="#417671"
        borderRadius="2xl"
        overflow="hidden"
        boxShadow="sm"
        padding="8"
        width="full"
      >
        <Input fontSize="3xl" color="white" placeholder="Survey Name" />
        <Divider marginY="2" />
        <Button colorScheme="gray" as="label" htmlFor="csv-upload">
          <DownloadIcon marginRight="10px" />
          Upload Data
          <input
            id="csv-upload"
            type="file"
            accept=".csv"
            style={{ display: 'none' }}
            onChange={handleCsvUpload}
          />
        </Button>
      </Box>
      <SurveyForm youthName="<Youth name>" questions={DEFAULT_QUESTIONS} mock />
    </VStack>
  );
};
