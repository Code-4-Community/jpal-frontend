import { Alert, AlertIcon, Box, Button, Container, HStack, Text } from '@chakra-ui/react';
import React from 'react';
import { Letter } from '../../api/dtos/letter';
import { Response } from '../../api/dtos/survey-assignment.dto';
import ErrorAlert from '../ErrorAlert';
import LoadingSpinner from '../LoadingSpinner';
import ConfirmLetterPopup from './ConfirmLetterPopup';

interface PreviewLetterProps {
  savedSurveyResponses: Response[];
  goBack: () => void;
  confirmAndSaveResponses: () => void;
  getPreviewLetter: () => Promise<Letter>;
}

const PreviewLetter: React.FC<PreviewLetterProps> = ({
  goBack,
  confirmAndSaveResponses,
  getPreviewLetter,
}) => {
  const [letter, setLetter] = React.useState<Letter | Error | undefined>(undefined);
  const [showPopup, setShowPopup] = React.useState(false);

  const popupHandler = () : void => {
    setShowPopup(prevShowPopup => !prevShowPopup);
  }

  React.useEffect(() => {
    getPreviewLetter().then(setLetter).catch(setLetter);
  }, [getPreviewLetter]);

  return (
    <Container>
      <Box mt={12}>
        <Box mb={6}>
          <Text fontSize="lg" fontWeight="bold">
            Please review the letter below.
          </Text>
        </Box>
        {letter === undefined && <LoadingSpinner />}
        {letter && letter instanceof Error && <ErrorAlert />}
        {letter && !(letter instanceof Error) && (
          <Box mb={12}>
            {!letter.shouldBeSent && (
              <Alert status="warning" marginBottom={6}>
                <AlertIcon />
                This letter did not meet the criteria for sending and therefore will not be
                delivered.
              </Alert>
            )}
            <Text marginBottom="1rem" color="gray.600">{`${letter.greeting},`}</Text>
            {letter.paragraphs.map((paragraph) => (
              <Text key={paragraph} marginBottom="1rem" color="gray.600">
                {paragraph}
              </Text>
            ))}
            <Text color="gray.600">{`${letter.closing},`}</Text>
            <Text color="gray.600">{letter.signature.fullName}</Text>
            <Text color="gray.600">{letter.signature.organization}</Text>
          </Box>
        )}

        <HStack spacing={6}>
          <Button colorScheme="gray" variant="link">
            <Text color="gray.500" fontSize="md" as="cite" fontWeight={400} onClick={goBack}>
              Go Back
            </Text>
          </Button>
        </HStack>
      </Box>
      <ConfirmLetterPopup 
      isOpen={showPopup} 
      onConfirm={confirmAndSaveResponses}
      onClose={popupHandler}
      />
    </Container>
  );
};

export default PreviewLetter;
