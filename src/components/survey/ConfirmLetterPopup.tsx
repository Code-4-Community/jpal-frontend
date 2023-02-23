import React, { useRef } from 'react';

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogOverlay,
  Button,
  Text,
} from '@chakra-ui/react';

interface ConfirmLetterPopupProps {
  isOpen: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

const ConfirmLetterPopup = ({
  isOpen,
  onConfirm,
  onClose,
}: ConfirmLetterPopupProps): JSX.Element => {
  const cancelRef = useRef(null);

  return (
    <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
      <AlertDialogOverlay />
      <AlertDialogContent>
        <AlertDialogCloseButton onClick={onClose} />
        <AlertDialogBody fontFamily="roboto" fontSize="1.25rem">
          <Text>
            By clicking confirm, you are approving this letter to be sent. Are you sure you want to
            confirm this letter?
          </Text>
        </AlertDialogBody>

        <AlertDialogFooter>
          <Button ref={cancelRef} onClick={onClose}>
            Continue Working
          </Button>

          <Button colorScheme="green" onClick={onConfirm}>
            Confirm
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmLetterPopup;
