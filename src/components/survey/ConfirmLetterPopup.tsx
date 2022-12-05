import React, { useRef } from 'react';

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react';

const ConfirmLetterPopup = ({ isOpen, onClose, dialogRef }) => {
  const cancelRef = useRef(null);

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay />
      <AlertDialogContent>
        <AlertDialogCloseButton onClick={onClose} />
        <AlertDialogBody fontFamily="roboto" fontSize="1.25rem">
        By clicking confirm, you are approving this letter to be sent. Are you sure you want to confirm this letter?
        </AlertDialogBody>

        <AlertDialogFooter>
          <Button
            ref={cancelRef}
            onClick={onClose}
            colorScheme="green"
          >
            Continue Working
          </Button>

          <Button
            onClick={onClose}
            ml={3}
            fontFamily="cursive"
          >
            Confirm
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmLetterPopup;
