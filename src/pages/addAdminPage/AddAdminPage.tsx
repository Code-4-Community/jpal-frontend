import { ArrowBackIcon } from '@chakra-ui/icons';
import { Grid, Box, Container, Heading, useToast, IconButton, GridItem } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { FormikHelpers } from 'formik';
import * as React from 'react';
import apiClient from '../../api/apiClient';
import Role from '../../api/dtos/role';
import { AddAdminForm, AdminFormValues } from '../../components/form/AddAdminForm';
import { TOAST_POPUP_DURATION } from '../basicConstants';

const AddAdminPage: React.FC = () => {
  const navigate = useNavigate();
  const toast = useToast();
  async function submitUser(
    values: AdminFormValues,
    actions: FormikHelpers<Partial<AdminFormValues>>,
  ): Promise<void> {
    try {
      await apiClient.createUser(values.firstName, values.lastName, values.email, Role.ADMIN, new Date());
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
      <Container maxW="xl">
        <Grid h="100vh" templateRows="repeat(5, 1fr)" templateColumns="repeat(8, 1fr)" gap={1}>
          <GridItem rowSpan={2} colSpan={1}>
            <IconButton
              size="xl"
              aria-label="Back Arrow Button"
              color="black"
              colorScheme="white"
              onClick={() => navigate(-1)}
              icon={<ArrowBackIcon w={10} h={10} />}
            />
          </GridItem>
          <GridItem colSpan={7}>
            <Heading size="lg" textAlign="start">
              Admin Profile
            </Heading>
          </GridItem>
          <GridItem colSpan={7}>
            <AddAdminForm onSubmit={submitUser} />
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
};

export default AddAdminPage;
