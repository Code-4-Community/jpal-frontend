import React, { useRef } from 'react';

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Center,
  HStack,
  Text,
  VStack,
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
        <Center>
          <VStack>
            <AlertDialogHeader>
              <Text>Are You Sure?</Text>
            </AlertDialogHeader>
            <AlertDialogBody>
              <Text align="center">
                By clicking confirm, you are approving this letter to be sent. Are you sure you are
                ready to confirm this letter?
              </Text>
            </AlertDialogBody>

            <AlertDialogFooter>
              <HStack>
                <Button ref={cancelRef} onClick={onClose}>
                  Continue Working
                </Button>

                <Button colorScheme="teal" onClick={onConfirm}>
                  Confirm
                </Button>
              </HStack>
            </AlertDialogFooter>
          </VStack>
        </Center>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmLetterPopup;
