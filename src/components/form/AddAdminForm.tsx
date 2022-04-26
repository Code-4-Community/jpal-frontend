/* eslint-disable react/jsx-props-no-spreading */
import { EditIcon } from '@chakra-ui/icons';
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
} from '@chakra-ui/react';
import { Field, FieldProps, Form, Formik, FormikHelpers } from 'formik';
import React from 'react';

export interface AdminFormValues {
  firstName: string;
  lastName: string;
  email: string;
}

export interface AddAdminFormProps {
  onSubmit: (
    values: AdminFormValues,
    actions: FormikHelpers<Partial<AdminFormValues>>,
  ) => Promise<void>;
}

export const AddAdminForm: React.FC<AddAdminFormProps> = ({ onSubmit }) => (
  <Formik
    initialValues={{}}
    onSubmit={(
      values: Partial<AdminFormValues>,
      actions: FormikHelpers<Partial<AdminFormValues>>,
    ) => onSubmit(values as AdminFormValues, actions)}
  >
    {(props) => (
      <Form>
        <Stack spacing={8}>
          <Field name="firstName">
            {({ field, form }: FieldProps) => (
              <>
                <FormControl isInvalid={Boolean(form.errors.name && form.touched)}>
                  <FormLabel htmlFor="first-name">First Name</FormLabel>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      // eslint-disable-next-line react/no-children-prop
                      children={<EditIcon color="gray.300" />}
                    />
                    <Input {...field} id="first-name" variant="flushed" placeholder="Jane" />
                  </InputGroup>
                  <FormErrorMessage>{form.errors.firstName}</FormErrorMessage>
                </FormControl>
              </>
            )}
          </Field>
          <Field name="lastName">
            {({ field, form }: FieldProps) => (
              <>
                <FormControl isInvalid={Boolean(form.errors.name && form.touched)}>
                  <FormLabel htmlFor="last-name">Last Name</FormLabel>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none" // eslint-disable-next-line react/no-children-prop
                      children={<EditIcon color="gray.300" />}
                    />
                    <Input {...field} id="last-name" variant="flushed" placeholder="Doe" />
                  </InputGroup>
                  <FormErrorMessage>{form.errors.lastName}</FormErrorMessage>
                </FormControl>
              </>
            )}
          </Field>

          <Field name="email">
            {({ field, form }: FieldProps) => (
              <FormControl isInvalid={Boolean(form.errors.email && form.touched)}>
                <FormLabel htmlFor="email">Email Address</FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none" // eslint-disable-next-line react/no-children-prop
                    children={<EditIcon color="gray.300" />}
                  />
                  <Input
                    {...field}
                    id="admin-email"
                    variant="flushed"
                    placeholder="jane.doe@email.edu"
                  />
                </InputGroup>
                <FormErrorMessage>{form.errors.email}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
        </Stack>

        <Button
          mt={4}
          colorScheme="teal"
          id="submit-admin-form-values"
          isLoading={props.isSubmitting}
          type="submit"
          marginTop="30px"
        >
          Save Changes
        </Button>
      </Form>
    )}
  </Formik>
);

export default AddAdminForm;
