import React, { useCallback, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useParams, Link, useLocation } from 'react-router-dom';
import {
  Button,
  Container,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  IconButton,
  Input,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { EditIcon, CheckIcon } from '@chakra-ui/icons';
import apiClient from '../../api/apiClient';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorAlert from '../../components/ErrorAlert';
import {
  assignmentRowToDTO,
  ASSIGNMENTS_CREATE_STATE_KEY,
} from '../createSurveyPage/CreateSurveyPage';
import { TOAST_POPUP_DURATION } from '../basicConstants';
import UploadAssignmentsForm, {
  AssignmentRow,
  UploadStatus,
} from '../../components/createSurveyPage/UploadAssignmentsForm';
import SurveyDetailsTable from '../../components/survey/SurveyDetailsTable';
import UploadRequiredFields from '../../components/createSurveyPage/UploadRequiredFields';
import { Survey, SurveyEditData } from '../../api/dtos/survey-assignment.dto';

interface AddAssignmentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  createAssignments: (assignments: AssignmentRow[]) => void;
}

const AddAssignmentsModal: React.FC<AddAssignmentsModalProps> = ({
  isOpen,
  onClose,
  createAssignments,
}: AddAssignmentsModalProps) => {
  const [uploadStatus, setUploadStatus] = useState<UploadStatus | null>(null);
  const [assignments, setAssignments] = useState<AssignmentRow[]>([]);

  const toast = useToast();

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

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Assignments</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <UploadAssignmentsForm
            assignments={assignments}
            setAssignments={setAssignments}
            setUploadStatus={setUploadStatus}
          />
        </ModalBody>
        <ModalFooter>
          <Button type="submit" colorScheme="teal" onClick={() => createAssignments(assignments)}>
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

interface EditSurveyProps {
  isOpen: boolean;
  onClose: () => void;
  surveyUUID: string;
  currentName: string;
  currentOrgName: string;
  currentHeaderImage: string;
  currentPercentage: number;
}

const EditSurveyModal: React.FC<EditSurveyProps> = ({
  isOpen,
  onClose,
  surveyUUID,
  currentName,
  currentOrgName,
  currentHeaderImage,
  currentPercentage,
}: EditSurveyProps) => {
  const [image, setImage] = useState<string>(currentHeaderImage);
  const [organizationName, setOrganizationName] = useState<string>(currentOrgName);
  const [splitPercentage, setSplitPercentage] = useState<number>(currentPercentage);
  const [uploadImageStatus, setUploadImageStatus] = useState<UploadStatus | null>(null);
  const [surveyName, setSurveyName] = useState<string>(currentName);
  const toast = useToast();

  const surveyDetails: SurveyEditData = {
    name: currentName,
    organizationName: currentOrgName,
    treatmentPercentage: currentPercentage,
    imageURL: currentHeaderImage,
  };

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

  const editSurvey = async () => {
    // set to original values if empty or failed input
    const finalName = surveyName.trim().length === 0 ? currentName : surveyName;
    const finalOrgName = organizationName.trim().length === 0 ? currentOrgName : organizationName;
    const finalImage = uploadImageStatus === null ? currentHeaderImage : image;

    try {
      if (finalImage === currentHeaderImage) {
        // do not pass current header image since it is not base64 string
        await apiClient.editSurvey(surveyUUID, finalName, finalOrgName, undefined, splitPercentage);
      } else {
        await apiClient.editSurvey(
          surveyUUID,
          finalName,
          finalOrgName,
          finalImage,
          splitPercentage,
        );
      }
    } catch (e) {
      let errorMessage = 'Failed to edit survey';
      if (e instanceof Error) {
        errorMessage += `: ${e.message}`;
      }

      toast({
        status: 'error',
        description: errorMessage,
        duration: TOAST_POPUP_DURATION,
        isClosable: true,
      });

      onClose();

      return;
    }

    toast({
      status: 'success',
      description: 'Successfully updated survey!',
      duration: TOAST_POPUP_DURATION,
      isClosable: true,
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Update Survey</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <UploadRequiredFields
            setSurveyName={setSurveyName}
            setOrganizationName={setOrganizationName}
            setSplitPercentage={setSplitPercentage}
            splitPercentage={splitPercentage}
            setImage={setImage}
            setUploadStatus={setUploadImageStatus}
            surveyDetails={surveyDetails}
          />
        </ModalBody>
        <ModalFooter>
          <Button type="submit" colorScheme="teal" onClick={() => editSurvey()}>
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const SurveyDetailsPage: React.FC = () => {
  console.log('survey details page reload');

  const { survey_uuid: surveyUuid } = useParams<{ survey_uuid: string }>();
  const {
    isLoading,
    error,
    data,
    refetch: refetchDetails,
  } = useQuery<Survey, Error>('survey', async () => {
    const { assignments } = await apiClient.getSurveyAssignments(surveyUuid);
    const survey = { ...(await apiClient.getSurvey(surveyUuid)), assignments };
    return survey;
  });
  const [name, setName] = useState('');
  const [orgName, setOrgName] = useState('');
  const [headerImage, setHeaderImage] = useState('');
  const [percentage, setPercentage] = useState(0);
  const toast = useToast();
  const location = useLocation();
  const { isOpen: isModalOpen, onOpen: openModal, onClose: closeModal } = useDisclosure();
  const {
    isOpen: isEditModalOpen,
    onOpen: openEditModal,
    onClose: closeEditModal,
  } = useDisclosure();
  const [isEditingName, setIsEditingName] = useState(false);
  const [surveyName, setSurveyName] = useState(data?.name || '');
  const [surveyNameLength, setSurveyNameLength] = useState(data?.name.length || 0);

  useEffect(() => {
    data?.assignments.sort((a1, a2) => a1.id - a2.id); // sort in ascending order
    setSurveyName(data?.name || '');
    setSurveyNameLength(data?.name.length || 0);
    setHeaderImage(data?.imageURL || '');
    setName(data?.name || '');
    setPercentage(data?.treatmentPercentage || 0);
    setOrgName(data?.organizationName || '');
  }, [data]);

  useEffect(() => {
    interface LocationState {
      [ASSIGNMENTS_CREATE_STATE_KEY]?: {
        success: boolean | null;
        error: string;
      };
    }

    const locationState = location.state as LocationState | null;

    if (!locationState || !locationState[ASSIGNMENTS_CREATE_STATE_KEY]) return;

    const assignmentsCreateStatus = locationState![ASSIGNMENTS_CREATE_STATE_KEY]!;

    let toastMessage: string;

    if (assignmentsCreateStatus.success) {
      toastMessage = 'Survey and assignments created!';
    } else if (assignmentsCreateStatus.success === null) {
      toastMessage = 'Survey created!';
    } else {
      toastMessage = `Warning: Survey created but failed to create assignments: ${assignmentsCreateStatus.error}`;
    }

    toast({
      status: assignmentsCreateStatus.success === false ? 'warning' : 'success',
      description: toastMessage,
      duration: TOAST_POPUP_DURATION,
      isClosable: true,
    });
  }, [location.state, toast]);

  useEffect(() => {
    refetchDetails();
  }, [isModalOpen, isEditModalOpen]);

  const createAssignments = useCallback(
    async (assignments: AssignmentRow[]) => {
      const assignmentPairs = assignmentRowToDTO(assignments);

      try {
        await apiClient.createBatchAssignments(surveyUuid as string, assignmentPairs);
        toast({
          status: 'success',
          description: 'Successfully added assignments!',
          duration: TOAST_POPUP_DURATION,
          isClosable: true,
        });
        closeModal();
        refetchDetails();
      } catch (e) {
        let message = 'Failed to add assignemnts';
        if (e instanceof Error) message += `: ${e.message}`;
        toast({
          status: 'error',
          description: message,
          duration: TOAST_POPUP_DURATION,
          isClosable: true,
        });
      }
    },
    [surveyUuid, toast, closeModal, refetchDetails],
  );

  const handleSaveName = () => {
    setIsEditingName(false);
    apiClient.editSurveyName(surveyUuid, surveyName);
  };

  const handleKeyDown = (e: any) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSaveName();
    }
  };

  return (
    <Container maxW="8xl">
      <Link to="/private">
        <Button marginBottom="10">Back to surveys</Button>
      </Link>
      <Button
        display="inline"
        colorScheme="teal"
        marginLeft={5}
        marginBottom={10}
        onClick={openModal}
      >
        Add Assignments
      </Button>
      {isLoading && <LoadingSpinner />}
      {error && <ErrorAlert />}
      {data && (
        <>
          <Heading size="lg" mb={6}>
            Survey Details for{' '}
            {isEditingName ? (
              <span>
                <Input
                  value={surveyName}
                  fontSize="inherit"
                  fontWeight="bold"
                  color="blue.500"
                  variant="unstyled"
                  display="inline"
                  outline="1px solid gray"
                  width={`${surveyNameLength}ch`}
                  onBlur={handleSaveName}
                  onKeyDown={handleKeyDown}
                  onChange={(e) => setSurveyName(e.target.value)}
                />
                <IconButton
                  aria-label="Edit survey"
                  style={{ marginLeft: '8px' }}
                  icon={<CheckIcon />}
                  onClick={handleSaveName}
                />
              </span>
            ) : (
              <span>
                <Text as="span" fontWeight="bold" color="blue.500">
                  {surveyName}
                </Text>
                <IconButton
                  aria-label="Edit survey"
                  style={{ marginLeft: '8px' }}
                  icon={<EditIcon />}
                  onClick={() => openEditModal()}
                />
              </span>
            )}
          </Heading>
          <SurveyDetailsTable assignments={data?.assignments || []} />
        </>
      )}
      <AddAssignmentsModal
        isOpen={isModalOpen}
        onClose={closeModal}
        createAssignments={createAssignments}
      />
      <EditSurveyModal
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        surveyUUID={surveyUuid || ''}
        currentName={name}
        currentOrgName={orgName}
        currentHeaderImage={headerImage}
        currentPercentage={percentage}
      />
    </Container>
  );
};

export default SurveyDetailsPage;
