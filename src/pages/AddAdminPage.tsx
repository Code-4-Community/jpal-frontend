import { Grid, Box, Container, Heading, useToast } from '@chakra-ui/react';
import { FormikHelpers } from 'formik';
import * as React from 'react';
import apiClient from '../api/apiClient';
import Role from '../api/dtos/role';
import { AddAdminForm, AdminFormValues } from '../components/form/AddAdminForm';

const TOAST_POPUP_DURATION = 4000;

const AddAdminPage: React.FC = () => {
  const toast = useToast();
  async function submitUser(
    values: AdminFormValues,
    actions: FormikHelpers<Partial<AdminFormValues>>,
  ): Promise<void> {
    try {
      await apiClient.createUser(values.email, Role.ADMIN);
      toast({
        title: 'Post created.',
        description: `Added the admin with the email ${values.email}.`,
        status: 'success',
        duration: TOAST_POPUP_DURATION,
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: 'Post created.',
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
            Add New Admin
          </Heading>
          <AddAdminForm onSubmit={submitUser} />
        </Container>
      </Grid>
    </Box>
  );
};

export default AddAdminPage;
