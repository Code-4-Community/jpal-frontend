/* eslint-disable react/jsx-props-no-spreading */
import { Button, FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';
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
    ) => {
      console.log(values);
      return onSubmit(values as AdminFormValues, actions);
    }}
  >
    {(props) => (
      <Form>
        <Field name="firstName">
          {({ field, form }: FieldProps) => (
            <>
              <FormControl isInvalid={Boolean(form.errors.name && form.touched)}>
                <FormLabel htmlFor="first-name">First Name</FormLabel>
                <Input {...field} id="first-name" placeholder="First Name" />
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
                <Input {...field} id="last-name" placeholder="Last Name" />
                <FormErrorMessage>{form.errors.lastName}</FormErrorMessage>
              </FormControl>
            </>
          )}
        </Field>

        <Field name="email">
          {({ field, form }: FieldProps) => (
            <FormControl isInvalid={Boolean(form.errors.email && form.touched)}>
              <FormLabel htmlFor="email">New Admin Email</FormLabel>
              <Input {...field} id="admin-email" placeholder="email" />
              <FormErrorMessage>{form.errors.email}</FormErrorMessage>
            </FormControl>
          )}
        </Field>
        <Button
          mt={4}
          colorScheme="teal"
          id="submit-admin-form-values"
          isLoading={props.isSubmitting}
          type="submit"
        >
          Submit
        </Button>
      </Form>
    )}
  </Formik>
);

export default AddAdminForm;
