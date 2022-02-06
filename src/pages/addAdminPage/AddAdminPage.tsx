import { ArrowBackIcon } from '@chakra-ui/icons';
import { Grid, Box, Container, Heading, useToast, IconButton } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import { FormikHelpers } from 'formik';
import * as React from 'react';
import apiClient from '../../api/apiClient';
import Role from '../../api/dtos/role';
import { AddAdminForm, AdminFormValues } from '../../components/form/AddAdminForm';
import { TOAST_POPUP_DURATION } from '../basicConstants';

const AddAdminPage: React.FC = () => {
  const history = useHistory();
  const toast = useToast();
  async function submitUser(
    values: AdminFormValues,
    actions: FormikHelpers<Partial<AdminFormValues>>,
  ): Promise<void> {
    try {
      await apiClient.createUser(values.email, values.firstName, values.lastName, Role.ADMIN);
      toast({
        title: 'Post created.',
        description: `Added the admin with the email ${values.email}.`,
        status: 'success',
        duration: TOAST_POPUP_DURATION,
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: 'Post creation failed.',
        description: `Failed to create the admin with the email ${values.email}.`,
        status: 'error',
        duration: TOAST_POPUP_DURATION,
        isClosable: true,
      });
    } finally {
      actions.setSubmitting(false);
    }
  }
  return (
    <Box>
      <Grid minH="100vh" p={3}>
        <Container maxW="xl">
          <Heading size="lg" textAlign="start">
            <IconButton
              size="xl"
              aria-label="Back Arrow Button"
              color="black"
              colorScheme="white"
              onClick={() => history.goBack()}
              icon={<ArrowBackIcon />}
            />
            Add New Admin
          </Heading>
          <AddAdminForm onSubmit={submitUser} />
        </Container>
      </Grid>
    </Box>
  );
};

export default AddAdminPage;
