import React, { useCallback, useEffect, useState } from 'react';
import {
  Button,
  Container,
  Heading,
  Input,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useToast,
} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import UploadAssignmentsForm, {
  AssignmentRow,
  UploadStatus,
} from '../../components/createSurveyPage/UploadAssignmentsForm';
import UploadRequiredFields from '../../components/createSurveyPage/UploadRequiredFields';
import { PersonInfo, Survey, SurveyTemplateData } from '../../api/dtos/survey-assignment.dto';
import apiClient from '../../api/apiClient';
import { TOAST_POPUP_DURATION } from '../basicConstants';

export const ASSIGNMENTS_CREATE_STATE_KEY = 'surveyCreateStatus';

export function assignmentRowToDTO(
  assignments: AssignmentRow[],
): { youth: PersonInfo; reviewer: PersonInfo }[] {
  return assignments.map((row) => ({
    youth: {
      email: row.youthEmail,
      firstName: row.youthFirst,
      lastName: row.youthLast,
    },
    reviewer: {
      email: row.reviewerEmail,
      firstName: row.reviewerFirst,
      lastName: row.reviewerLast,
    },
  }));
}

const CreateSurveyPage: React.FC = () => {
  const [uploadStatus, setUploadStatus] = useState<UploadStatus | null>(null);
  const [assignments, setAssignments] = useState<AssignmentRow[]>([]);
  const [image, setImage] = useState<string>('');
  const [organizationName, setOrganizationName] = useState<string>('');
  const [splitPercentage, setSplitPercentage] = useState<number>(0);
  const [surveyTemplateData, setSurveyTemplateData] = useState<SurveyTemplateData | null>(null);
  const [tabIndex, setTabIndex] = useState<number>(0);
  const [disableUploadTab, setDisableUploadTab] = useState<boolean>(true);

  const [uploadImageStatus, setUploadImageStatus] = useState<UploadStatus | null>(null);
  const [surveyName, setSurveyName] = useState<string>('');

  const toast = useToast();
  const navigate = useNavigate();

  const createSurvey = useCallback(async () => {
    let survey: Survey;

    if (!surveyTemplateData) {
      toast({
        status: 'error',
        description: 'No survey template selected',
        duration: TOAST_POPUP_DURATION,
        isClosable: true,
      });
      return;
    }

    try {
      // Create survey with the (only) default template for now
      // TODO: change when custom survey templates are added
      survey = await apiClient.createSurvey(
        surveyName,
        surveyTemplateData?.id,
        organizationName,
        image,
        splitPercentage,
      );
    } catch (e) {
      let errorMessage = 'Failed to create survey';
      if (e instanceof Error) {
        errorMessage += `: ${e.message}`;
      }

      toast({
        status: 'error',
        description: errorMessage,
        duration: TOAST_POPUP_DURATION,
        isClosable: true,
      });
      return;
    }

    // 3-way boolean for assignment creation:
    // - null: no assignments were given
    // - true: assignments given and created
    // - false: assignments given but not ceated
    const createAssignmentsStatus: { success: boolean | null; error: string } = {
      success: null,
      error: '',
    };

    // If user didn't upload any assignments, end here
    // Otherwise, create assignments for the new survey
    if (assignments.length > 0) {
      const assignmentPairs = assignmentRowToDTO(assignments);

      try {
        await apiClient.createBatchAssignments(survey.uuid, assignmentPairs);
        createAssignmentsStatus.success = true;
      } catch (e) {
        createAssignmentsStatus.success = false;
        if (e instanceof Error) createAssignmentsStatus.error = e.message;
      }
    }

    navigate(`/private/survey/${survey.uuid}`, {
      state: { [ASSIGNMENTS_CREATE_STATE_KEY]: createAssignmentsStatus },
    });
  }, [navigate, toast, surveyName, assignments]);

  useEffect(() => {
    if (uploadStatus !== null) {
      toast({
        status: uploadStatus.success ? 'success' : 'error',
        description: uploadStatus.success ? 'CSV successfully uploaded' : uploadStatus.error,
        duration: TOAST_POPUP_DURATION,
        isClosable: true,
      });
    }
  }, [uploadStatus, toast]);

  useEffect(() => {
    if (uploadImageStatus !== null) {
      toast({
        status: uploadImageStatus.success ? 'success' : 'error',
        description: uploadImageStatus.success
          ? 'Image successfully uploaded'
          : uploadImageStatus.error,
        duration: TOAST_POPUP_DURATION,
        isClosable: true,
      });
    }
  }, [uploadImageStatus, toast]);

  return (
    <Container maxW="7xl">
      <Link to="/private">
        <Button marginBottom="10">Back to surveys</Button>
      </Link>
      <Heading size="md" mb={4}>
        Create Survey
      </Heading>
      <Input
        value={surveyName}
        onChange={(e) => setSurveyName(e.target.value)}
        placeholder="Survey Name"
        required
        maxW={300}
        mb={8}
        isInvalid={surveyName.length === 0}
      />
      <Tabs mb={4} index={tabIndex} onChange={setTabIndex}>
        <TabList>
          {/* <Tab>Survey Questions</Tab> */}
          <Tab>Name, Image, Percentage</Tab>
          <Tab
            isDisabled={
              disableUploadTab ||
              surveyName.trim().length === 0 ||
              (uploadImageStatus !== null && !uploadImageStatus.success) ||
              organizationName.trim().length === 0 ||
              splitPercentage === 0 ||
              !surveyTemplateData ||
              !surveyTemplateData.id ||
              !uploadImageStatus
            }
          >
            Upload Assignments
          </Tab>
        </TabList>
        <TabPanels>
          {/* <TabPanel>
            <p>TODO: display survey questions</p>
          </TabPanel> */}
          <TabPanel>
            <UploadRequiredFields
              setOrganizationName={setOrganizationName}
              setSplitPercentage={setSplitPercentage}
              splitPercentage={splitPercentage}
              setImage={setImage}
              setUploadStatus={setUploadImageStatus}
              surveyTemplateData={surveyTemplateData}
              setSurveyTemplateData={setSurveyTemplateData}
            />
          </TabPanel>
          <TabPanel>
            <UploadAssignmentsForm
              assignments={assignments}
              setAssignments={setAssignments}
              setUploadStatus={setUploadStatus}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
      <Button
        type="submit"
        colorScheme="teal"
        onClick={() => {
          setTabIndex(1);
          setDisableUploadTab(false);
        }}
        disabled={
          surveyName.trim().length === 0 ||
          (uploadImageStatus !== null && !uploadImageStatus.success) ||
          organizationName.trim().length === 0 ||
          !surveyTemplateData ||
          !surveyTemplateData.id ||
          !uploadImageStatus
        }
        hidden={tabIndex !== 0}
      >
        Next
      </Button>
      <Button
        type="submit"
        colorScheme="teal"
        onClick={() => createSurvey()}
        disabled={
          !uploadStatus ||
          (uploadStatus !== null && !uploadStatus.success) ||
          surveyName.length === 0 ||
          (uploadImageStatus !== null && !uploadImageStatus.success) ||
          organizationName.length === 0 ||
          splitPercentage === 0 ||
          !surveyTemplateData ||
          !surveyTemplateData.id ||
          !uploadImageStatus
        }
        hidden={tabIndex !== 1}
      >
        Create Survey
      </Button>
    </Container>
  );
};

export default CreateSurveyPage;
